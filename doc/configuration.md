# Configuration

The library has the following options that can be set as the second parameter when initializing.

```javascript
{
    selectors: {
        accept: '.js-cookie-alert-accept', // accept button/link selector
        refuse: '.js-cookie-alert-refuse', // refuse button/link selector
        cookieGuard: '.js-cookie-guarded', // class that is set on guarded elements
        parentContainer: 'body'
    },
    cookieName: 'cookies-accepted',
    cookieAttributes: {
        expires: 90, // number of days or Date
        path: '/',
        domain: window.location.hostname,
    },
    autoAcceptCookieConsentAfterRequestCount: null,
    activeClass: 'cookie-alert-is-active',
    excludedPageUrls: [], // array with urls where cookie notification should not be shown and watcher will not count (relative paths), this can also be a JSON encoded string
    callbacks: {
        onOpenCookieAlert: null, // add function that will be triggered after alert opens
        onCloseCookieAlert: null, // add function that will be triggered after alert closes
    }
};
```
