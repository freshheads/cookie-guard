import Cookie from 'js-cookie';
import CookieConsentStore from './CookieConsentStore';
import { CookieSettingsType } from './types';

class AutoAcceptRequestWatcher {
    private cookieConsentStore: CookieConsentStore;
    private autoAcceptCookieConsentAfterRequestCount: number;
    private cookieSettings: CookieSettingsType;
    private onAutoAcceptCallback: Function | null;
    public currentRequestCount: number = 0;

    constructor(
        cookieConsentStore: CookieConsentStore,
        autoAcceptCookieConsentAfterRequestCount: number,
        cookieSettings: CookieSettingsType,
        onAutoAcceptCallback: Function | null = null
    ) {
        this.cookieConsentStore = cookieConsentStore;
        this.autoAcceptCookieConsentAfterRequestCount = autoAcceptCookieConsentAfterRequestCount;
        this.cookieSettings = cookieSettings;
        this.onAutoAcceptCallback = onAutoAcceptCallback;

        this.setCurrentRequestCount();
        this.watchCurrentRequestCount();
    }

    private setCurrentRequestCount() {
        const requestCountFromSession = Cookie.get(this.cookieSettings.name);

        this.currentRequestCount = requestCountFromSession ? parseInt(requestCountFromSession) : 0;
    }

    private watchCurrentRequestCount() {
        if (this.currentRequestCount < this.autoAcceptCookieConsentAfterRequestCount) {
            let newRequestCount = this.currentRequestCount + 1;
            this.setRequestCounterSessionCookie(newRequestCount);

            return;
        }

        this.cookieConsentStore.accept();

        if (typeof this.onAutoAcceptCallback === 'function') {
            this.onAutoAcceptCallback();
        }
    }

    private setRequestCounterSessionCookie(value: number) {
        const { name, domain, path } = this.cookieSettings;

        Cookie.set(name, value.toString(), {
            domain,
            path
        });
    }
}

export default AutoAcceptRequestWatcher;
