# FHCookieGuard

A set of hooks to use to save a user's cookie preferences in a cookie(🥲).

The cookie settings are stored as follows:

`'["functional","analytics","marketing"]'`

## Requirements

-   React 18 or 19 (`react` and `react-dom` are peer dependencies)
-   Upgrading from 4.x? See [UPGRADE-5.0.md](UPGRADE-5.0.md)

## Setup with @freshheads/analytics-essentials

-   [Gtag & analytics-essentials setup](doc/gtag_setup.md)
-   [Tag Manager & analytics-essentials setup](doc/tagmanager_setup.md)

## Usage

You can use the build in cookieguard to get up and running quickly or use the provided hooks to make your own.

The cookiebanner makes use of Context to share the cookie state throughout the app.

-   Wrap your app with the Provider:

```jsx
import { CookieGuardProvider } from '@freshheads/cookie-guard';

<CookieGuardProvider>
    <App />
</CookieGuardProvider>;
```

-   The provider optionally accepts:

    -   onCookieSettingsChange
    -   onCookieSettingsSet
    -   onCookieSettingsClear
    -   reloadOnRetractCookies

    e.g. If you want to change the Google consent options based on the cookie settings

-   Add the premade Cookie Banner to your app

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

-   To style look at the source code `/src/popupstyles.css` and import your own css.

-   You can also use the hooks to make your own custom cookiebanner

## Development

The project `.npmrc` only installs versions that are at least 7 days old and fails on unreviewed install scripts. Review new ones with `npm install-scripts approve <pkg>` or `npm install-scripts deny <pkg>` (recorded in `allowScripts` in `package.json`).

## Examples

-   [Chakra-UI](examples/ChakraUI) custom cookie banner
