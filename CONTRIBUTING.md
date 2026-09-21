# Contributing

Thanks for helping improve Coursera Video Accelerator + Auto Advance.

## Before you start

- Search existing Issues and Pull Requests before opening a new one.
- Keep changes focused.
- Do not add telemetry, advertising, tracking, or external data transmission without an explicit privacy/security discussion and maintainer approval.
- Avoid adding permissions unless the feature genuinely requires them.

## Local development

1. Fork the repository.
2. Clone your fork.
3. Make your changes under `extension/`.
4. Open `chrome://extensions` in Chrome.
5. Enable **Developer mode**.
6. Load the `extension` folder.
7. Test on a Coursera course page.
8. Inspect the DevTools Console for errors and `[Coursera Auto]` logs.

There is currently no build system, so the source in `extension/` is the loadable extension.

## Pull requests

Please include:

- a concise description of the change;
- the problem it solves;
- testing steps;
- screenshots or console output when useful;
- any manifest/permission changes;
- any privacy or security implications.

Keep commits understandable and avoid unrelated formatting changes.

## Privacy and security

A contribution must not silently introduce:

- remote analytics or telemetry;
- tracking or advertising;
- collection of Coursera/user data;
- unnecessary host permissions;
- credential handling;
- external network calls that are not documented and reviewed.

If your change needs one of these, explain why in the PR before implementation.
