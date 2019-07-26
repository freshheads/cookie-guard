# Upgrading from 2.x to 3.x

### Change styles path
Styles are moved outside of the src directory so these can be excluded.

`@import '~@freshheads/cookie-guard/src/scss/popup';`

becomes:

`@import '~@freshheads/cookie-guard/styles/popup';`

### No longer use src directory
The src is now typescript, which is no longer published. Use the build by importing `@freshheads/cookie-guard` 
This is an ES5 build, but we will soon publish an ES2015 build as well.

### Removed onRevoke callback and selector
The same can be accomplished by making your own selector and calling the cookieConsentStore.

```
revokeButton.addEventListener('click', () => {
    cookieGuard.cookieConsentStore.revoke();
    window.location.reload();
});
```

But we recommend no longer using revoke but offer users the ability to change their choice by calling accept or refuse on the cookie consent store. 
 
`cookieGuard.cookieConsentStore.accept();`

`cookieGuard.cookieConsentStore.refuse();`


### Renames of some config parameters

Check the new config for the correct naming
