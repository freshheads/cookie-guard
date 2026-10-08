# FHCookieGuard

A set of hooks to use to save a user's cookie preferences in a cookie(🥲).

The cookie settings are stored as follows:

`'["functional","analytics","marketing"]'`

## Requirements

- React 18 or 19 (`react` and `react-dom` are peer dependencies)
- Upgrading from 4.x? See [UPGRADE-5.0.md](UPGRADE-5.0.md)

## Setup with @freshheads/analytics-essentials

- [Gtag & analytics-essentials setup](doc/gtag_setup.md)
- [Tag Manager & analytics-essentials setup](doc/tagmanager_setup.md)

## Usage

You can use the build in cookieguard to get up and running quickly or use the provided hooks to make your own.

The cookiebanner makes use of Context to share the cookie state throughout the app.

- Wrap your app with the Provider:

```jsx
import { CookieGuardProvider } from '@freshheads/cookie-guard';

<CookieGuardProvider>
    <App />
</CookieGuardProvider>;
```

- The provider optionally accepts:

    - onCookieSettingsChange
    - onCookieSettingsSet
    - onCookieSettingsClear
    - reloadOnRetractCookies

    e.g. If you want to change the Google consent options based on the cookie settings

- Add the premade Cookie Banner to your app

```jsx
import {
    CookieBanner,
    CookieCategorySettings,
    CookieGuardProvider,
} from '@freshheads/cookie-guard';
import '@freshheads/cookie-guard/dist/style.css';

const CookieGuardProps = {
    title: 'Onze site maakt gebruik van cookies.',
    description:
        'Wij gebruiken cookies voor de werking van de website, analyse en verbetering en marketingdoeleinden.',
    acceptAllLabel: 'Alle cookies accepteren',
    saveLabel: 'Opslaan',
    requiredLabel: 'Noodzakelijke cookies',
    functionalLabel: 'Functionele cookies',
    analyticsLabel: 'Analytische cookies',
    marketingLabel: 'Marketing cookies',
};

return (
    <CookieGuardProvider>
        {/** your app components **/}
        <CookieBanner {...CookieGuardProps} />
    </CookieGuardProvider>
);
```

- To style look at the source code `/src/css/popup-styles.css` and import your own css.

- You can also use the hooks to make your own custom cookiebanner

## Server-side rendering (Next.js)

- The components are marked `'use client'`, so `CookieGuardProvider` and `CookieBanner` can be rendered from a server component, e.g. in `app/layout.tsx`.
- During server rendering and hydration `cookieSettings` is `undefined` and the banner is closed, so the client matches the server HTML; right after hydration the stored settings are used. `onCookieSettingsChange` is not called during hydration.
- Render the banner inside the same element as your page content. The banner only makes the top-level `<body>` child that contains it inert, so content in a sibling element stays reachable for screen readers while the banner is open:

```jsx
<body>
    <CookieGuardProvider>
        <div>
            {children}
            <CookieBanner {...CookieGuardProps} />
        </div>
    </CookieGuardProvider>
</body>
```

## Known gaps

- **Removing cookies after consent is withdrawn.** When a category is switched off or the settings are cleared, all other cookies readable on the page are removed, except the consent cookie. This is a blunt approach:

    - Only host-only cookies are removed. Tracking cookies that tags set on a parent domain (e.g. `_ga` on `.example.com`) stay.
    - It can't tell tracking cookies from other first-party cookies, so the site's own host-only cookies are removed as well.
    - Third-party cookies (e.g. on `.google.com`) and httpOnly cookies can't be removed from JavaScript at all.

    Enforcement relies on tags not running without consent (Consent Mode, consent triggers in Tag Manager) and on `reloadOnRetractCookies`; removing cookies is best-effort cleanup. A more precise approach is planned.

## Development

Requires Node.js 22.12 or newer (Vite 8), enforced through `devEngines` in `package.json` (npm 10.9 and newer; older npm versions ignore it).

The project `.npmrc` only installs versions that are at least 7 days old and fails on unreviewed install scripts. Review new ones with `npm install-scripts approve <pkg>` or `npm install-scripts deny <pkg>` (recorded in `allowScripts` in `package.json`).

## Examples

- [Chakra UI v3](examples/ChakraUI) custom cookie banner
