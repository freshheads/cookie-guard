# Upgrading from 4.x to 5.x

### React 18 or 19 required

React 17 is no longer supported: the `react` and `react-dom` peer dependencies are now `>=18`, because `@headlessui/react` 2.x requires React 18 or newer.

React 19 is now supported. 4.x bundled the React 18 JSX runtime, which crashes on load in a React 19 app (`Cannot read properties of undefined (reading 'ReactCurrentDispatcher')`). 5.x imports `react/jsx-runtime`, `@headlessui/react` and `js-cookie` from your app instead of bundling them.

### Initial focus of the cookie banner

`@headlessui/react` 2.x focuses the dialog itself when the banner opens, instead of the first enabled checkbox. Screen readers now announce the title and description first; the first <kbd>Tab</kbd> moves to the first enabled checkbox.

### Screen reader fix

The banner content is no longer wrapped in an element with `aria-hidden="true"`, so screen readers can read the title, checkboxes and buttons. If your CSS targets `.cookiebanner__scroll-container[aria-hidden]`, drop the attribute selector.

### Consent cookie and server-side rendering

`CookieGuardProvider` now reads the consent cookie with `useSyncExternalStore`. This fixes a hydration error in server-rendered apps (Next.js) when the cookie was already set.

- Server-rendered apps: during server rendering and hydration `cookieSettings` is `undefined` and the banner is closed; React re-renders with the stored settings right after hydration. Client-only apps get the stored settings on the first render, as before.
- `onCookieSettingsChange` is called once on mount with the stored settings (or `undefined` without a cookie), never with `undefined` during hydration.
- `onCookieSettingsChange` is only called when the stored value actually changes. Saving the same settings again no longer calls it (`onCookieSettingsSet` still is).

### `clearCookieSettings` removes domain cookies

`clearCookieSettings` now also removes a consent cookie that was set with a `domain` (via `setCookieSettings(settings, domain, subdomains)`), including one from an earlier session. 4.x only removed the host-only cookie, so the consent came back after a reload.

### `description` accepts any `ReactNode`

`CookieBannerProps['description']` changed from `JSX.Element | string` to `ReactNode`. Existing values keep working.

### Browser support

The JS and `dist/style.css` are now built for Baseline Widely available browsers (the Vite 8 default). The CSS uses, for example, `inset` and media query range syntax (`@media (width <= 600px)`), so browsers older than that (such as Safari before 16.4) no longer get the narrow-screen button layout.

### `'use client'`

The bundle now starts with `'use client'` (4.0.1 lost it during bundling), so `CookieGuardProvider` and `CookieBanner` can be rendered from Next.js App Router server components without a wrapper file of your own.
