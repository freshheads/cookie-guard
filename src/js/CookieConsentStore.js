import Cookie from 'js-cookie';

class CookieConsentStore {
    constructor(cookieName, expireDays, domain, path) {
        this.cookieName = cookieName;
        this.expireDays = parseInt(expireDays);
        this.domain = domain;
        this.path = path;
    }

    accept() {
        this._setValue(1);
    }

    refuse() {
        this._setValue(0);
    }

    revoke() {
        Cookie.remove(this.cookieName, {
            domain: this.domain,
            path: this.path,
        });
    }

    hasBeenSet() {
        return typeof Cookie.get(this.cookieName) !== 'undefined';
    }

    isAccepted() {
        return Cookie.get(this.cookieName) === 1;
    }

    _setValue(value) {
        Cookie.set(this.cookieName, value, {
            expires: this.expireDays,
            domain: this.domain,
            path: this.path
        });
    }
}

export default CookieConsentStore;
