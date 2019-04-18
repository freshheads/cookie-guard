import Cookie from 'js-cookie';

class CookieConsentStore {
    private cookieName: string;
    private expireDays: number;
    private domain: string;
    private path: string;

    constructor(cookieName: string, expireDays: number, domain: string, path: string) {
        this.cookieName = cookieName;
        this.expireDays = expireDays;
        this.domain = domain;
        this.path = path;
    }

    public accept() {
        this.setValue('1');
    }

    public refuse() {
        this.setValue('0');
    }

    public revoke() {
        Cookie.remove(this.cookieName, {
            domain: this.domain,
            path: this.path,
        });
    }

    public hasBeenSet() {
        return typeof Cookie.get(this.cookieName) !== 'undefined';
    }

    public isAccepted() {
        return Cookie.get(this.cookieName) === '1';
    }

    private setValue(value: string) {
        Cookie.set(this.cookieName, value, {
            expires: this.expireDays,
            domain: this.domain,
            path: this.path
        });
    }
}

export default CookieConsentStore;
