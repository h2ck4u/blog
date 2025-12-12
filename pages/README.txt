# Root Pages Directory

This directory exists to resolve a conflict between Feature-Sliced Design (FSD) and Next.js.

- **FSD** uses `src/pages` as a layer for UI comp onents of pages.
- **Next.js** by default treats `src/pages` as the Pages Router directory if `pages` does not exist at the root.

By creating this empty `pages` directory at the root, we force Next.js to ignore `src/pages` for routing purposes, allowing us to use `src/pages` strictly for FSD structure while using `app` (App Router) for actual routing.
