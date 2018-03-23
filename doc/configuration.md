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
    expireDays: 90,
    path: '/',
    activeClass: 'cookie-alert-is-active',
    excludedPageUrls: {}, // array with urls where cookie should not be shown (relative paths)
    callbacks: {
        onCloseCookieAlert: null // add function that will be triggered after closeAlert
    }
};
```
