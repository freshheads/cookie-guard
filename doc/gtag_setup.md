# Gtag setup

Setup with use of Gtag & [@freshheads/analytics-essentials](https://github.com/freshheads/analytics-essentials)

#### **`components/GA4Loader.tsx`**

Add a component to load GA4 within the `<CookieGuardProvider />` so we have access to the analytics cookies.

```jsx
import {
    CookieConsentOptions,
    CookieConsentValues,
    LoadGA4,
} from '@freshheads/analytics-essentials';
import { CookieCategorySettings, useCookies } from '@freshheads/cookie-guard';

export const formatCookiesForGA = (
    cookieSettings: CookieCategorySettings
): CookieConsentOptions | undefined => {
    // formats cookies from Cookie Guard
    if (!cookieSettings) return undefined;

    return {
        ad_storage:
            cookieSettings.marketing === true
                ? CookieConsentValues.GRANTED
                : CookieConsentValues.DENIED,
        analytics_storage:
            cookieSettings.analytics === true
                ? CookieConsentValues.GRANTED
                : CookieConsentValues.DENIED,
        functionality_storage:
            cookieSettings.functional === true
                ? CookieConsentValues.GRANTED
                : CookieConsentValues.DENIED,
        personalization_storage:
            cookieSettings.marketing === true
                ? CookieConsentValues.GRANTED
                : CookieConsentValues.DENIED,
    };
};

const GA4Loader = () => {
    const { cookieSettings } = useCookies();

    return (
        <>
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <LoadGA4
                    measurementID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
                    defaultConsent={formatCookiesForGA(cookieSettings)} // set default consent based on cookies that are already set
                />
            )}
        </>
    );
};
```

#### **`app.tsx`**

```jsx
import { pushGaConsent } from '@freshheads/analytics-essentials';
import {
    CookieBanner,
    CookieCategorySettings,
    CookieGuardProvider,
} from '@freshheads/cookie-guard';
import GA4Loader, { formatCookiesForGA } from '@/components/GA4Loader';

const App = () => {
    const onCookiesChanged = (cookieSettings: CookieCategorySettings) => {
        if (!cookieSettings) return;
        const formattedCookies = formatCookiesForGA(cookieSettings);
        if (!formattedCookies) return;
        pushGaConsent(formattedCookies);
    };

    return (
        <CookieGuardProvider onCookieSettingsChange={onCookiesChanged}>
            <GA4Loader />
            {/** your app components **/}
            <CookieBanner
                title="Onze site maakt gebruik van cookies."
                description="Wij gebruiken cookies voor de werking van de website, analyse en verbetering en marketingdoeleinden."
                acceptAllLabel="Alle cookies accepteren"
                saveLabel="Opslaan"
                requiredLabel="Noodzakelijke cookies"
                functionalLabel="Functionele cookies"
                analyticsLabel="Analytische cookies"
                marketingLabel="Marketing cookies"
            />
        </CookieGuardProvider>
    );
};
```
