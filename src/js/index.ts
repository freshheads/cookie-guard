import merge from 'deepmerge';
import CookieConsentStore from './CookieConsentStore';
import CookieConsentNotification from './CookieConsentNotification';
import AutoAcceptRequestWatcher from './AutoAcceptRequestWatcher';
import { isCurrentPageExcluded } from './helpers';
import { OptionsType, UserOptionsType } from './types';

class FHCookieGuard {
    public cookieConsentNotificationElement: HTMLElement | null;
    public cookieConsentNotification ?: CookieConsentNotification;
    public cookieConsentStore: CookieConsentStore;
    private options: OptionsType;

    constructor(notificationElementSelector = '.js-cookie-alert', options: UserOptionsType = {}) {
        this.cookieConsentNotificationElement = document.querySelector(notificationElementSelector);

        const defaultOptions: OptionsType = {
            selectors: {
                accept: '.js-cookie-alert-accept',
                refuse: '.js-cookie-alert-refuse',
                cookieGuard: '.js-cookie-guarded',
                parentContainer: 'body'
            },
            cookieName: 'cookies-accepted',
            autoAcceptCookieConsentAfterRequestCount: null,
            expireDays: 90,
            domain: window.location.hostname,
            path: '/',
            activeClass: 'cookie-alert-is-active',
            excludedPageUrls: [],
            callbacks: {
                onOpenCookieAlert: null,
                onCloseCookieAlert: null,
            }
        };

        // merge default options with user options coming from initialisation and data attributes on notification element
        this.options = merge.all<OptionsType>([
            defaultOptions,
            options,
            this.cookieConsentNotificationElement ? this.cookieConsentNotificationElement.dataset : {}
        ]);

        this.cookieConsentStore = new CookieConsentStore(
            this.options.cookieName,
            this.options.expireDays,
            this.options.domain,
            this.options.path
        );

        this.init();
    }

    public init() {
        this.initCookieConsentNotificationIfNeeded();
        this.initAutoAcceptCookieConsentIfNeeded();
    }

    private initCookieConsentNotificationIfNeeded() {
        // @todo make it more clear that excluxedPages is only for the notification and request watcher
        if (!this.cookieConsentNotificationElement || this.cookieConsentStore.hasBeenSet() || isCurrentPageExcluded(this.options.excludedPageUrls)) {
            return;
        }

        this.cookieConsentNotification = new CookieConsentNotification(
            this.cookieConsentNotificationElement,
            this.cookieConsentStore,
            this.options,
            this.enableCookieGuardedContent
        );

        if (this.cookieConsentNotification) {
            this.cookieConsentNotification.show();
        }
    }

    private initAutoAcceptCookieConsentIfNeeded() {
        const { autoAcceptCookieConsentAfterRequestCount, domain, path } = this.options;

        if (autoAcceptCookieConsentAfterRequestCount === null || this.cookieConsentStore.hasBeenSet() || isCurrentPageExcluded(this.options.excludedPageUrls)) {
            return;
        }

        const cookieAttributes = {
            domain: domain,
            path: path
        };

        new AutoAcceptRequestWatcher(
            this.cookieConsentStore,
            autoAcceptCookieConsentAfterRequestCount,
            cookieAttributes,
            () => {
                this.enableCookieGuardedContent();

                if (this.cookieConsentNotification) {
                    this.cookieConsentNotification.close();
                }
            }
        );
    }

    public enableCookieGuardedContent() {
        const { selectors } = this.options;

        const cookieGuardedElements: NodeList = document.querySelectorAll(selectors.cookieGuard);
        const parser = new DOMParser();

        if (!cookieGuardedElements.length) {
            return;
        }

        Array.prototype.forEach.call(cookieGuardedElements, (element: HTMLElement) => {
            // element must have a content data attribute
            if (!element.dataset.content) {
                return;
            }

            // Get script from content attribute
            let content = parser.parseFromString(element.dataset.content, 'text/html');
            let guardedScript = content.querySelector('script');

            if (!guardedScript) {
                return;
            }

            // Create a new script element so DOM can execute
            let newScriptElement = document.createElement('script');

            // Check if the new script tag has a external src
            if (guardedScript.src) {
                newScriptElement.src = guardedScript.src;
            } else {
                newScriptElement.innerHTML = guardedScript.innerHTML;
            }

            // Replace the meta tag with the new script element
            let parentNode = element.parentNode;

            if (parentNode) {
                parentNode.replaceChild(newScriptElement, element);
            }
        });
    }
}

export default FHCookieGuard;
