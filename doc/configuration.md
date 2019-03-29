# Configuration

The library has the following options that can be set as the second parameter when initializing.

```javascript
{
    selectors: {
        accept: '.js-cookie-alert-accept', // accept button/link selector
        refuse: '.js-cookie-alert-refuse', // refuse button/link selector
        revoke: '.js-cookie-alert-revoke', // revoke button/link selector
        cookieGuard: '.js-cookie-guarded', // class that is set on guarded elements
        parentContainer: 'body'
    },
    cookieName: 'cookies-accepted',
    autoAcceptCookieConsentAfterRefreshCount: null, // after this number cookieName will be set automatically
    autoAcceptCookieConsentName: 'cookies-refresh-count',
    expireDays: 90,
    path: '/',
    domain: window.location.hostname,
    activeClass: 'cookie-alert-is-active',
    excludedPageUrls: [], // array with urls where cookie should not be shown (relative paths), this can also be a JSON encoded string
    callbacks: {
        onOpenCookieAlert: null, // add function that will be triggered after alert opens
        onCloseCookieAlert: null, // add function that will be triggered after alert closes
        onRevoke: null // add function that will be triggered after the cookies have been revoked
    }
};
```
