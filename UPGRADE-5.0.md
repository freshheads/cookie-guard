# Upgrading from 4.x to 5.x

### React 18 or 19 required

React 17 is no longer supported: the `react` and `react-dom` peer dependencies are now `>=18`, because `@headlessui/react` 2.x requires React 18 or newer.

React 19 is now supported. 4.x bundled the React 18 JSX runtime, which crashes on load in a React 19 app (`Cannot read properties of undefined (reading 'ReactCurrentDispatcher')`). 5.x imports `react/jsx-runtime`, `@headlessui/react` and `js-cookie` from your app instead of bundling them.

### Initial focus of the cookie banner

`@headlessui/react` 2.x focuses the dialog itself when the banner opens, instead of the first checkbox. Screen readers now announce the title and description first; the first <kbd>Tab</kbd> moves to the first checkbox.

### Screen reader fix

The banner content is no longer wrapped in an element with `aria-hidden="true"`, so screen readers can read the title, checkboxes and buttons. If your CSS targets `.cookiebanner__scroll-container[aria-hidden]`, drop the attribute selector.

### `description` accepts any `ReactNode`

`CookieBannerProps['description']` changed from `JSX.Element | string` to `ReactNode`. Existing values keep working.

### `'use client'`

The bundle now starts with `'use client'` (4.0.1 lost it during bundling), so `CookieGuardProvider` and `CookieBanner` can be rendered from Next.js App Router server components without a wrapper file of your own.
