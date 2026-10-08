# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`@freshheads/cookie-guard`: a small React library (provider, hook and a prebuilt Headless UI banner) that stores cookie-consent categories in the `cookies_consent` cookie. Supports React 18 and 19 (peer deps), including Next.js App Router / SSR.

## Commands

Development needs Node.js ≥ 22.12 (`devEngines`). npm 10.9+ enforces it; 10.8 and older ignore it.

- `npm run build`: `tsc` (typecheck only, `noEmit`) followed by `vite build` in library mode. Writes `dist/` (`index.js`, `index.cjs`, `style.css`, `.d.ts` files via `vite-plugin-dts`). Also runs on `npm ci`/`npm install` through `prepare`. The visualizer plugin opens `analyse.html` in the browser on every build.
- `npm run dev`: Vite dev server for the playground (`index.html` → `src/js/main.tsx` → `components/App.tsx`). This is the only way to try the library in this repo.
- `npm run prettier`: formats `src/**/*.{ts,tsx}` in place. Config is `.prettierrc` (4 spaces, single quotes, es5 trailing commas). Docs, examples and config files aren't covered; check them with `node_modules/.bin/prettier --check <files>`.
- `npm run preview`: serves `dist/`. There is no `index.html` in a library build, so `/` returns 404.

There are no tests and no ESLint setup. To verify consumer-facing behaviour, `npm pack` the library and install the tarball into a throwaway app outside the repo (React 18, React 19, Next.js).

## npm policy

The project `.npmrc` sets `min-release-age=7`, `engine-strict`, `allow-remote=root` and `strict-allow-scripts`. A dependency with an unreviewed install script fails the install. Review it with `npm install-scripts approve|deny <pkg>`, which records the decision in `allowScripts` in `package.json` (fsevents is denied; dev and build work without it).

## Architecture

- **Public API** (`src/js/index.ts`): `CookieGuardProvider`, `useCookies`, `CookieGuardContext`, `CookieBanner` and the types `CookieBannerProps`/`CookieCategorySettings`. `CookieCategory` (the enum the settings are keyed on) is not exported, so consumers write string keys.
- **`CookieGuardProvider`** (`src/js/context/CookieGuardProvider.tsx`) owns all state:
    - The consent cookie is read through a module-level external store with `useSyncExternalStore`. The server snapshot is `null`; `consentCookie === null` is how the code detects server render and hydration, so the first client render matches the SSR HTML.
    - js-cookie has no change events. The provider's writes go through `setSessionConsentCookie`, which also notifies subscribers. A value written in the session takes precedence over the cookie, so a blocked cookie write still applies.
    - `parseCookieSettings` validates the cookie JSON per category instead of casting. A malformed cookie means "no consent".
    - Banner open state: `undefined` follows "no valid consent"; an explicit `true`/`false` comes from `setCookieBannerIsOpen`. Writing or clearing consent freezes the current value, so saving never toggles the banner by itself.
    - `onCookieSettingsChange` is called through a ref, so an inline callback prop doesn't re-fire it. It fires once after hydration and then only when the stored value changes. `onCookieSettingsSet` fires on every save.
    - Retract: switching a category from true to false (or clearing) removes all other host-only cookies, optionally followed by a reload (`reloadOnRetractCookies`), because loaded tags cannot be unloaded. Parent-domain tracking cookies stay; this is a known gap (see README) that's still open on purpose.
- **Cookie I/O** (`src/js/util/cookieFunctions.ts`): `setCookies` optionally writes a domain cookie (when the current host is `mainDomain` or one of its `subdomains`). It first calls `removeCookies`, which deletes the host-only cookie and the variant on every parent domain of the hostname. A domain cookie can only be removed with its domain, and that domain may come from an earlier session.
- **`CookieBanner`** (`src/js/components/CookieBanner.tsx`): built on `@headlessui/react` v2 `Dialog`. Keep the `cookiebanner__*` class names stable: consumers style them (`src/css/popup-styles.css` → `dist/style.css`). Don't put `aria-hidden` on wrappers around focusable content; Headless UI v2 focuses the dialog itself.
- **Build** (`vite.config.ts`):
    - All `dependencies` and `peerDependencies`, subpaths included, are externalized. Bundling `react/jsx-runtime` crashes React 19 consumers.
    - `rolldownOptions.output.banner` adds `'use client'` to both bundles, because bundling drops the directive from the source. Under Vite 4 the banner was stripped too; it survives since Vite 8 (Rolldown).
    - `src/js/index.ts` imports `src/css/popup-styles.css`. In lib mode Vite extracts it into `dist/style.css` (`cssFileName: 'style'`, exported as `@freshheads/cookie-guard/dist/style.css`) instead of injecting it into the JS. A CSS file can't be a lib entry in Vite 8.
    - `vite-plugin-dts` excludes the playground files (`main.tsx`, `App.tsx`, `NeedsCookies.tsx`); otherwise their `.d.ts` files end up in `dist/`.
    - Vite 8 targets Baseline Widely available browsers, including lightningcss minification of the CSS.

## Docs to keep in sync

- `README.md` covers usage, SSR/Next.js notes and the wrapper tip for `inert`.
- `UPGRADE-<major>.md` lists every consumer-visible behaviour change per major.
- `doc/` covers analytics-essentials setup for gtag and Tag Manager.
- `examples/ChakraUI/` holds a Chakra UI v3 custom banner built on `useCookies`.
