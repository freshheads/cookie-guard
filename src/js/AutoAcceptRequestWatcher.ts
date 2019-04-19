import Cookie from 'js-cookie';
import CookieConsentStore from './CookieConsentStore';
import { CookieAttributesType } from './types';

const REQUEST_COUNT_COOKIE_NAME = 'fh-cookie-guard-request-count';

class AutoAcceptRequestWatcher {
    private cookieConsentStore: CookieConsentStore;
    private autoAcceptCookieConsentAfterRequestCount: number;
    private cookieAttributes: CookieAttributesType;
    private onAutoAcceptCallback: Function | null;
    public currentRequestCount: number = 0;

    constructor(
        cookieConsentStore: CookieConsentStore,
        autoAcceptCookieConsentAfterRequestCount: number,
        cookieAttributes: CookieAttributesType,
        onAutoAcceptCallback: Function | null = null
    ) {
        this.cookieConsentStore = cookieConsentStore;
        this.autoAcceptCookieConsentAfterRequestCount = autoAcceptCookieConsentAfterRequestCount;
        this.cookieAttributes = cookieAttributes;
        this.onAutoAcceptCallback = onAutoAcceptCallback;

        this.setCurrentRequestCount();
        this.watchCurrentRequestCount();
    }

    private setCurrentRequestCount() {
        const requestCountFromSession = Cookie.get(REQUEST_COUNT_COOKIE_NAME);

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
        const { domain, path } = this.cookieAttributes;

        Cookie.set(REQUEST_COUNT_COOKIE_NAME, value.toString(), {
            domain,
            path
        });
    }
}

export default AutoAcceptRequestWatcher;
