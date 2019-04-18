# Usage

## 1. Import FHCookieGuard

```javascript
import FHCookieGuard from '@freshheads/cookie-guard';
```

## 2. Initialize

```javascript
new FHCookieGuard('.js-cookie-alert', {
   // Optional config options
});
```

## 3. Set notification template near end of body tag

```twig
{% if not cookie_settings_submitted() %}
    {% set excludedPages = [ path('cookies') ] %}

    {% if app.request.requestUri not in excludedPages %}
        <div class="cookie-alert js-cookie-alert" role="alertdialog" aria-labelledby="cookie-alert-title" aria-describedby="cookie-alert-description" aria-hidden="true">
            <div class="cookie-alert__content">
                <div class="cookie-alert__header">
                    <h2 class="cookie-alert__title" id="cookie-alert-title">Cookie usage</h2>
                </div>
                <p class="cookie-alert__description" id="cookie-alert-description">
                    We use cookies to analyse the website, so we can further improve the user experience. Can we use cookies?
                    <a href="{{ path('cookies'}) }}" class="cookie-alert__link" target="_blank">Read more information</a> about how we use cookies.
                </p>
                <div class="cookie-alert__actions">
                    <button class="button button--secondary js-cookie-alert-accept">Yes, continue</button>
                    <button class="button button--link js-cookie-alert-refuse">No, continue without cookies</button>
                </div>
            </div>
        </div>
    {% endif %}
{% endif %}
```

## 4. Guard your scripts

This can be done by using the FHCookieGuardBundle or create your own elements with script content in an data-content attribute.

### Use together with FHCookieGuardBundle

This plugin can be used standalone, but we advice to use it together with `FHCookieGuardBundle` which provides a twig extension to guard the scripts.

See [FHCookieGuardBundle](https://github.com/freshheads/FHCookieGuardBundle)

### Standalone

Set your script as a meta tag like this:

```html
<meta class="js-cookie-guarded" data-content="[escaped script tag]" />
```

Now it's guarded and the scripts will only be injected when the user accepts the use of cookies in the alert.

## 5. Set styling

You can use one of the predefined styles or create your own.

```scss
@import "~@freshheads/cookie-guard/styles/popup";
@import "~@freshheads/cookie-guard/styles/notification";
```

## 6. Handle cookie revocation

The cookie set by `cookie-guard` can be revoked by clicking on an element with the class provided in the `selectors.revoke` option. Clicking an element with this class will remove the cookie and essentially reset the setup. It's advised to reload or redirect the page when a user revokes the cookies so the notification will show up again, which can be done using the `onRevoke` callback.

```js
{
    // ...
    onRevoke: (revokeButtonElement) => {
        window.location.reload();
    }
}
```

## 7. Automatically accept cookies after x requests

When option `autoAcceptCookieConsentAfterRequestCount` is set, cookies will be accepted automatically after x requests.
