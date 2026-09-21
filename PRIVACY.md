# Privacy Policy

**Coursera Video Accelerator + Auto Advance** is an independent open-source Chrome extension. It is not affiliated with Coursera.

## Data collection

The extension is designed not to intentionally collect personal information, course content, account credentials, or browsing history for transmission to a project-controlled service.

## Data transmission

The current source code contains no project-owned backend, analytics endpoint, advertising network, or telemetry service. The extension does not intentionally transmit user data to a server operated by this project.

## Storage

The extension uses Chrome's `chrome.storage.sync` API to store preferences such as playback speed and whether auto-advance is enabled. Because this is Chrome's synchronized storage API, Chrome may synchronize those settings according to the user's browser/account configuration. The extension does not operate its own storage server for these settings.

## Permissions and access

The extension requests:

- `storage` — to save extension preferences.
- `https://www.coursera.org/*` host access — to run the extension's content script on Coursera pages where its features are needed.

It does not request permissions for cookies, history, downloads, tabs, bookmarks, camera, microphone, or location.

## Third parties

The project does not intentionally include third-party analytics, advertising, tracking, or data-broker services.

Coursera itself is a third-party website. This extension interacts with the Coursera page in the browser to provide its features. Coursera's own privacy practices are outside this project's control and are governed by Coursera's policies.

## How to verify

Because the project is open source, users can inspect:

- `extension/manifest.json` for permissions;
- `extension/content.js` for page behavior;
- `extension/popup.js` for settings storage;
- GitHub history and pull requests for changes over time.

Users can also inspect network activity with Chrome DevTools while the extension is enabled.

## Changes to this policy

If a future version introduces analytics, external network requests, new permissions, or another material privacy change, the project should update this document and clearly describe the change before or alongside that release.

Last reviewed: 2026-09-21.
