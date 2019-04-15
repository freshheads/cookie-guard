import Cookie from 'js-cookie';

class AutoAcceptRequestWatcher {
    constructor(
        cookieConsentStore,
        autoAcceptCookieConsentAfterRequestCount,
        cookieSettings,
        onAutoAcceptCallback = null
    ) {
        this.cookieConsentStore = cookieConsentStore;
        this.autoAcceptCookieConsentAfterRequestCount = autoAcceptCookieConsentAfterRequestCount;
        this.settings = cookieSettings;
        this.onAutoAcceptCallback = onAutoAcceptCallback;

        this.currentRequestCount = parseInt(Cookie.get(this.settings.name)) || 0;

        this._watchCurrentRequestCount();
    }

    _watchCurrentRequestCount() {
        if (this.currentRequestCount < this.autoAcceptCookieConsentAfterRequestCount) {
            this._setRequestCounterSessionCookie(this.currentRequestCount + 1);

            return;
        }

        this.cookieConsentStore.accept();

        if (typeof this.onAutoAcceptCallback === 'function') {
            this.onAutoAcceptCallback();
        }
    }

    /**
     * @param {number} value
     */
    _setRequestCounterSessionCookie(value) {
        var { name, domain, path } = this.settings;

        Cookie.set(name, value, {
            domain,
            path
        });
    }
}

export default AutoAcceptRequestWatcher;
