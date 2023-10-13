# Tag Manager setup

Setup with use of Tag Manager & [@freshheads/analytics-essentials](https://github.com/freshheads/analytics-essentials)

#### **`app.tsx`**

```jsx
import {
    CookieBanner,
    CookieCategorySettings,
    CookieGuardProvider,
} from '@freshheads/cookie-guard';
import {
    EventTypes,
    LoadTagManager,
    pushDataLayerEvent,
} from '@freshheads/analytics-essentials';

const App = () => {
    const onCookiesChanged = (cookieSettings: CookieCategorySettings) => {
        if (!cookieSettings) return;

        pushDataLayerEvent({
            type: EventTypes.CUSTOM,
            name: 'cookie_settings_changed',
        });
    };

    return (
        <>
            {process.env.NEXT_PUBLIC_GTM_ID && (
                <LoadTagManager
                    measurementID={process.env.NEXT_PUBLIC_GTM_ID}
                />
            )}
            <CookieGuardProvider onCookieSettingsChange={onCookiesChanged}>
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
        </>
    );
};
```
