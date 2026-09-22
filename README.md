# Coursera Video Accelerator + Auto Advance

[![Validate extension](https://github.com/anuragguptaaa/coursera-video-accelerator/actions/workflows/validate.yml/badge.svg)](../../actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/anuragguptaaa/coursera-video-accelerator)](../../releases/latest)

A privacy-focused, open-source Chrome extension for controlling Coursera video playback and automating repetitive course navigation.

**Learn faster. Save time. Stay in control.**

---

## ✨ Features

### ⚡ Custom Video Speed

Choose your preferred playback speeds directly from the extension popup.

The default configuration is:

- **0–75% of the video:** 16×
- **Final 25%:** 2.5×

Both speeds can be changed from the popup.

### ▶️ Automatic Playback

Automatically starts newly loaded Coursera videos without requiring manual interaction.

### ⏭️ Automatic Next Item

When a course item is completed, the extension automatically activates Coursera's **"Go to next item"** control.

### ⏩ Automatic In-Video Skip

Automatically clicks supported **"Skip"** controls that appear during Coursera videos.

### 🛡️ Speed Watchdog

Coursera may reset the playback rate while a video is playing.

The extension continuously checks the playback rate and restores your selected speed when necessary.

### ⚙️ Customizable

Configure:

- Main video speed
- Final 25% video speed
- Auto Play
- Auto Skip
- Auto Next

---

## 🔒 Privacy First

Privacy is one of the main goals of this project.

This extension:

- Does **not** use a project-owned backend server
- Does **not** use analytics or telemetry
- Does **not** display advertisements
- Does **not** require an account
- Does **not** request unnecessary permissions
- Is fully open source and publicly auditable

The extension uses Chrome's storage functionality to save your settings. Chrome may synchronize extension settings depending on your browser/account configuration.

### Don't take our word for it — verify it.

You can inspect the complete source code, manifest, permissions and privacy documentation yourself.

See:

- [Privacy Policy](PRIVACY.md)
- [Security Policy](SECURITY.md)
- [Extension Manifest](extension/manifest.json)

---

## 🚀 Installation

### 1. Download the latest release

Go to the [Releases](../../releases) page and download the latest `.zip` file.

### 2. Extract the ZIP

Extract the downloaded ZIP file to a folder on your computer.

### 3. Open Chrome Extensions

Open:

`chrome://extensions`

### 4. Enable Developer Mode

Turn on **Developer mode** in the top-right corner.

### 5. Load the extension

Click:

**Load unpacked**

Then select the extracted extension folder.

### 6. Open Coursera

Open Coursera and start a course video.

The extension will apply your configured settings automatically.

---

## 🎯 Why this project?

Online courses often contain repetitive interactions:

**Video → Question → Skip → Completion → Next Item → New Video**

This project focuses on reducing repetitive manual interactions while keeping the implementation lightweight, transparent and open source.

The goal is simple:

> Spend less time waiting and clicking, and more time learning.

---

## 🧩 How it works

The extension runs directly in the browser and interacts with the Coursera page.

It:

1. Detects the Coursera video player.
2. Applies the configured playback speed.
3. Watches for playback-rate changes.
4. Automatically restores the selected speed when necessary.
5. Detects supported in-video Skip controls.
6. Detects the completed course-item state.
7. Activates the main "Go to next item" control.
8. Automatically plays the newly loaded video.

No project-owned server is required.

---

## 🛠️ Technology

- JavaScript
- HTML
- CSS
- Chrome Extensions
- Manifest V3
- Chrome Storage API
- GitHub Actions

---

## 📁 Project Structure

    coursera-video-accelerator/
    │
    ├── extension/
    │   ├── manifest.json
    │   ├── content.js
    │   ├── popup.html
    │   ├── popup.js
    │   └── popup.css
    │
    ├── .github/
    │   ├── ISSUE_TEMPLATE/
    │   ├── pull_request_template.md
    │   └── workflows/
    │       └── validate.yml
    │
    ├── README.md
    ├── PRIVACY.md
    ├── SECURITY.md
    ├── CONTRIBUTING.md
    ├── CODE_OF_CONDUCT.md
    ├── CHANGELOG.md
    ├── LICENSE
    └── .gitignore

---

## 🤝 Contributing

Contributions are welcome.

You can help by:

- Reporting bugs
- Suggesting features
- Improving the code
- Improving documentation
- Testing new versions
- Opening pull requests

Before contributing, please read:

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

### 🐛 Found a bug?

Please use the [Bug Report](../../issues/new?template=bug_report.md) template.

### 💡 Have an idea?

Please use the [Feature Request](../../issues/new?template=feature_request.md) template.

---

## 📋 Roadmap

Possible future improvements include:

- Better compatibility with Coursera UI changes
- Additional playback controls
- Improved settings UI
- More robust navigation detection
- Better testing across different course layouts
- Community-requested features

The roadmap may evolve as the project grows.

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## 📦 Latest Release

The latest stable release is available on the [Releases](../../releases/latest) page.

---

## ⚠️ Disclaimer

Coursera Video Accelerator + Auto Advance is an independent open-source browser extension.

It is **not affiliated with, endorsed by, or sponsored by Coursera**.

Coursera is a registered trademark of Coursera, Inc.

This project is intended to provide browser-side productivity and navigation features for users of Coursera.

---

## 📄 License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) for the full license text.

---

## ⭐ Support the Project

If this project is useful to you:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest improvements
- 🔧 Contribute code
- 📢 Share the project with other learners

Every contribution helps improve the project.

---

**Built with ❤️ for learners.**