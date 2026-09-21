(() => {
  "use strict";

  const DEFAULT_SPEED = 16;
  const DEFAULT_LAST_SECTION_SPEED = 2.5;
  const SWITCH_POINT = 0.75;
  const SPEED_ENFORCE_INTERVAL = 100;

  let normalSpeed = DEFAULT_SPEED;
  let lastSectionSpeed = DEFAULT_LAST_SECTION_SPEED;
  let autoAdvance = true;
  let lastClickedItemKey = "";

  function log(...args) {
    console.log("[Coursera Auto]", ...args);
  }

  function getVideos() {
    return Array.from(document.querySelectorAll("video"));
  }

  function getTargetSpeed(video) {
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return null;
    }

    const progress = video.currentTime / video.duration;
    return progress >= SWITCH_POINT ? lastSectionSpeed : normalSpeed;
  }

  function applySpeed(video, force = false) {
    const targetSpeed = getTargetSpeed(video);
    if (targetSpeed == null) return;

    // Coursera can reset the native video playbackRate back to its own UI
    // value (often 2x). Keep the native <video> rate enforced independently
    // of Coursera's speed control.
    if (force || video.playbackRate !== targetSpeed || video.defaultPlaybackRate !== targetSpeed) {
      try {
        video.defaultPlaybackRate = targetSpeed;
        video.playbackRate = targetSpeed;
        log(`Playback speed → ${targetSpeed}x (${Math.round((video.currentTime / video.duration) * 100)}%)`);
      } catch (err) {
        log("Could not set playback speed:", err?.message || err);
      }
    }
  }

  function getItemKey() {
    const video = document.querySelector("video");
    const source = video?.currentSrc || video?.src || "";
    const title =
      document.querySelector("h1.video-name")?.textContent?.trim() ||
      document.title ||
      "";
    return `${location.href}|${source}|${title}`;
  }

  function findReadyNextButton() {
    // Coursera's completed/ready main button uses cds-button-primary.
    // The floating icon button is cds-iconButton-primary, so this selector
    // intentionally targets the main "Go to next item" button.
    return document.querySelector(
      'button[aria-label="Go to next item"].cds-button-primary'
    );
  }

  function isVisible(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== "hidden" &&
      style.display !== "none"
    );
  }

  function tryAutoAdvance() {
    if (!autoAdvance) return;

    const button = findReadyNextButton();
    if (!button || !isVisible(button)) return;

    const itemKey = getItemKey();
    if (!itemKey || itemKey === lastClickedItemKey) return;

    lastClickedItemKey = itemKey;

    log("Completed state detected → clicking Go to next item.");
    button.click();

    // Give the SPA time to replace the current item.
    setTimeout(() => {
      const newKey = getItemKey();
      if (newKey !== itemKey) {
        lastClickedItemKey = "";
        log("Next item loaded.");
      }
    }, 1500);
  }

  function tryAutoSkipQuestion() {
    // Coursera's in-video question popup uses a button containing:
    // <span class="cds-button-label">Skip</span>
    // Find an enabled, visible button with that exact label.
    const labels = document.querySelectorAll("button span.cds-button-label");

    for (const label of labels) {
      if (label.textContent?.trim() !== "Skip") continue;

      const button = label.closest("button");
      if (!button || !isVisible(button)) continue;
      if (button.disabled || button.getAttribute("aria-disabled") === "true") continue;

      log("Question popup detected → clicking Skip.");
      button.click();
      return;
    }
  }

  function tick() {
    getVideos().forEach(applySpeed);
    tryAutoSkipQuestion();
    tryAutoAdvance();
  }

  function tryPlayVideo(video) {
    if (!video || !video.paused) return;

    // Wait until the video has enough data to start.
    const playNow = () => {
      if (!video.paused) return;

      video.play()
        .then(() => {
          log("New video detected → started playback automatically.");
          applySpeed(video);
        })
        .catch(err => {
          // Browser autoplay policies may reject playback in some situations.
          // Coursera pages with a prior user gesture normally allow this.
          log("Could not autoplay video:", err?.message || err);
        });
    };

    if (video.readyState >= 2) {
      playNow();
    } else {
      video.addEventListener("canplay", playNow, { once: true });
    }
  }

  function attachVideoListeners() {
    getVideos().forEach(video => {
      if (video.dataset.courseraAcceleratorAttached === "1") return;

      video.dataset.courseraAcceleratorAttached = "1";

      video.addEventListener("loadedmetadata", () => {
        applySpeed(video);
        tryPlayVideo(video);
      });

      video.addEventListener("canplay", () => {
        applySpeed(video);
        tryPlayVideo(video);
      });

      video.addEventListener("timeupdate", () => applySpeed(video));
      video.addEventListener("play", () => applySpeed(video, true));
      video.addEventListener("ratechange", () => applySpeed(video, true));

      // Handle a video that is already loaded when we attach.
      tryPlayVideo(video);
    });
  }

  // Handle Coursera's SPA navigation and dynamically inserted video elements.
  const observer = new MutationObserver(() => {
    attachVideoListeners();
    tryAutoSkipQuestion();
    tryAutoAdvance();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  chrome.storage.sync.get(
    {
      normalSpeed: DEFAULT_SPEED,
      lastSectionSpeed: DEFAULT_LAST_SECTION_SPEED,
      autoAdvance: true
    },
    settings => {
      normalSpeed = Number(settings.normalSpeed) || DEFAULT_SPEED;
      lastSectionSpeed = Number(settings.lastSectionSpeed) || DEFAULT_LAST_SECTION_SPEED;
      autoAdvance = Boolean(settings.autoAdvance);

      attachVideoListeners();
      tick();

      // Speed watchdog: Coursera sometimes overwrites playbackRate after
      // changing internal player state. Re-apply the intended rate frequently
      // enough that the video remains at the configured speeds before/after 75%.
      setInterval(() => {
        attachVideoListeners();
        getVideos().forEach(video => applySpeed(video));
        tryAutoSkipQuestion();
        tryAutoAdvance();
      }, SPEED_ENFORCE_INTERVAL);
    }
  );

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;

    if (changes.normalSpeed) {
      normalSpeed = Number(changes.normalSpeed.newValue) || DEFAULT_SPEED;
      getVideos().forEach(applySpeed);
      log(`Normal speed changed → ${normalSpeed}x`);
    }

    if (changes.lastSectionSpeed) {
      lastSectionSpeed = Number(changes.lastSectionSpeed.newValue) || DEFAULT_LAST_SECTION_SPEED;
      getVideos().forEach(applySpeed);
      log(`Last 25% speed changed → ${lastSectionSpeed}x`);
    }

    if (changes.autoAdvance) {
      autoAdvance = Boolean(changes.autoAdvance.newValue);
      log(`Auto advance → ${autoAdvance ? "ON" : "OFF"}`);
    }
  });
})();