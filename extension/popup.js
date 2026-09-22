const speedInput = document.getElementById("speed");
const lastSpeedInput = document.getElementById("lastSpeed");
const autoAdvanceInput = document.getElementById("autoAdvance");
const backgroundPlaybackInput = document.getElementById("backgroundPlayback");
const saveButton = document.getElementById("save");
const status = document.getElementById("status");

function showStatus(message) {
  status.textContent = message;
  setTimeout(() => {
    status.textContent = "";
  }, 1200);
}

chrome.storage.sync.get(
  { normalSpeed: 16, lastSectionSpeed: 2.5, autoAdvance: true, backgroundPlayback: true },
  settings => {
    speedInput.value = settings.normalSpeed;
    lastSpeedInput.value = settings.lastSectionSpeed;
    autoAdvanceInput.checked = settings.autoAdvance;
    backgroundPlaybackInput.checked = settings.backgroundPlayback;
  }
);

saveButton.addEventListener("click", () => {
  let speed = Number(speedInput.value);
  let lastSpeed = Number(lastSpeedInput.value);

  if (!Number.isFinite(speed)) speed = 16;
  if (!Number.isFinite(lastSpeed)) lastSpeed = 2.5;

  speed = Math.max(0.25, Math.min(64, Math.round(speed * 4) / 4));
  lastSpeed = Math.max(0.25, Math.min(64, Math.round(lastSpeed * 4) / 4));

  speedInput.value = speed;
  lastSpeedInput.value = lastSpeed;

  chrome.storage.sync.set(
    {
      normalSpeed: speed,
      lastSectionSpeed: lastSpeed,
      autoAdvance: autoAdvanceInput.checked,
      backgroundPlayback: backgroundPlaybackInput.checked
    },
    () => showStatus("Saved")
  );
});
