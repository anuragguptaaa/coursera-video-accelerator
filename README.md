# Coursera Video Accelerator + Auto Advance

An independent, open-source Chrome extension that adds configurable playback-speed controls and automates repetitive navigation on Coursera course pages.

> **Not affiliated with, endorsed by, or sponsored by Coursera.**

## Features

- Configurable playback speed for the first 75% of a video (default: **16×**)
- Configurable playback speed for the final 25% (default: **2.5×**)
- Speed watchdog that re-applies the configured native video rate when the Coursera player changes it
- Automatically starts a newly loaded video when it is paused
- Automatically clicks a visible, enabled in-video **Skip** button when a question popup appears
- Automatically clicks Coursera's main **Go to next item** button when it becomes ready
- Settings for both speeds and auto-advance
- Manifest V3
- Minimal extension permissions

## Privacy

### Privacy by design

This project is designed to operate locally in the browser and does **not intentionally collect, sell, or transmit personal information to a server controlled by this project**.

The extension currently:

- does not include an analytics or telemetry SDK;
- does not include advertising or tracking code;
- does not use cookies, browsing-history APIs, microphone, camera, or location APIs;
- does not contain a backend or external API endpoint;
- uses Chrome's `storage` permission for extension settings;
- runs its content script only on `https://www.coursera.org/*`.

### Verify it yourself

This is an open-source project. You do not have to rely on the README alone:

1. Inspect [`extension/manifest.json`](extension/manifest.json) to see the permissions and host access.
2. Inspect [`extension/content.js`](extension/content.js) to see what the page script does.
3. Inspect [`extension/popup.js`](extension/popup.js) to see how settings are stored.
4. Search the repository for network APIs such as `fetch`, `XMLHttpRequest`, `WebSocket`, and analytics SDKs.
5. Inspect the extension's network activity in Chrome DevTools if you want an independent runtime check.

**Important:** the extension uses Chrome's `chrome.storage.sync` API for settings. Chrome may synchronize those settings according to the user's browser/account settings. The extension itself does not send those settings to a project-owned server.

See [`PRIVACY.md`](PRIVACY.md) for the detailed privacy statement.

## Installation

### Install from source

1. Download or clone this repository.
2. Open Chrome and visit `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository's `extension` folder.
6. Open or reload a Coursera course page.

### Install a release ZIP

Download the ZIP attached to a GitHub Release, extract it, and load the extracted `extension` folder through **Load unpacked**.

## Configuration

Open the extension popup to configure:

| Setting | Default | Range |
|---|---:|---:|
| Main speed (0–75%) | 16× | 0.25×–64× |
| Last 25% speed | 2.5× | 0.25×–64× |
| Auto-advance | On | On/Off |

## How it works

The extension operates on the page's native `<video>` element. It calculates the current video progress and applies the configured speed:

- **0–75%:** main speed
- **75–100%:** last-25% speed

It also watches for Coursera's dynamically inserted DOM elements because Coursera is a single-page application and can replace the video/player without a full page reload.

For auto-advance, the extension deliberately targets the main ready button:

```text
button[aria-label="Go to next item"].cds-button-primary
```

The floating next-item icon is intentionally not used.

For in-video questions, it looks for a visible, enabled button whose label is exactly `Skip`.

## Development

The extension is intentionally small and has no build step at the moment.

```text
extension/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
└── popup.css
```

After changing the source:

1. Go to `chrome://extensions`.
2. Click **Reload** on the extension.
3. Reload the Coursera page.
4. Test the changed behavior.
5. Check the DevTools Console for `[Coursera Auto]` messages.

## Contributing

Pull requests are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

Before opening a PR, please test your change on Coursera and describe:

- what changed;
- why it was needed;
- how you tested it;
- whether it changes permissions or privacy behavior.

## Reporting bugs

Please use the GitHub issue templates. Include the Chrome version, extension version, course/player context, steps to reproduce, and relevant console output. Do not include account credentials, personal information, or private course data.

## Roadmap

Ideas can be proposed through GitHub Issues and Pull Requests. Features that increase permissions, collect data, or introduce external services should include an explicit privacy/security discussion in the PR.

## License

This project is released under the [MIT License](LICENSE).
