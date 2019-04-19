import Cookie, { CookieAttributes } from 'js-cookie';

class CookieConsentStore {
    private cookieName: string;
    private cookieAttributes: CookieAttributes;

    constructor(cookieName: string, cookieAttributes: CookieAttributes) {
        this.cookieName = cookieName;
        this.cookieAttributes = cookieAttributes;
    }

    public accept() {
        this.setValue('1');
    }

    public refuse() {
        this.setValue('0');
    }

    public revoke() {
        Cookie.remove(this.cookieName, this.cookieAttributes);
    }

    public hasBeenSet() {
        return typeof Cookie.get(this.cookieName) !== 'undefined';
    }

    public isAccepted() {
        return Cookie.get(this.cookieName) === '1';
    }

    private setValue(value: string) {
        Cookie.set(this.cookieName, value, this.cookieAttributes);
    }
}

export default CookieConsentStore;
