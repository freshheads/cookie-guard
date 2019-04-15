import merge from 'deepmerge';
import CookieConsentStore from './CookieConsentStore';
import CookieConsentNotification from './CookieConsentNotification';
import AutoAcceptRequestWatcher from './AutoAcceptRequestWatcher';
import { isCurrentPageExcluded } from './helpers';

class FHCookieGuard {
    constructor(notificationElementSelector = '.js-cookie-alert', options = {}) {

        this.cookieConsentNotificationElement = document.querySelector(notificationElementSelector);

        const defaultOptions = {
            selectors: {
                accept: '.js-cookie-alert-accept',
                refuse: '.js-cookie-alert-refuse',
                revoke: '.js-cookie-alert-revoke',
                cookieGuard: '.js-cookie-guarded',
                parentContainer: 'body'
            },
            cookieName: 'cookies-accepted',
            autoAcceptCookieConsentAfterRequestCount: null,
            autoAcceptCookieConsentName: 'current-request-count',
            expireDays: 90,
            domain: window.location.hostname,
            path: '/',
            activeClass: 'cookie-alert-is-active',
            excludedPageUrls: [],
            callbacks: {
                onOpenCookieAlert: null,
                onCloseCookieAlert: null,
                onRevoke: null
            }
        };

        // merge default options with user options coming from initialisation and data attributes on notification element
        this.options = merge.all([defaultOptions, options, this.cookieConsentNotificationElement ? this.cookieConsentNotificationElement.dataset : {}]);

        this._onRevokeCookiesClick = this._onRevokeCookiesClick.bind(this);

        this.cookieConsentStore = new CookieConsentStore(
            this.options.cookieName,
            this.options.expireDays,
            this.options.domain,
            this.options.path
        );

        this.init();
    }

    init() {
        this._initCookieConsentNotificationIfNeeded();
        this._initAutoAcceptCookieConsentIfNeeded();
        this._initRevoke();

        // @todo add event listeners to accept or refuse cookies without notification, usefull for settings block
    }

    _initCookieConsentNotificationIfNeeded() {
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

        this.cookieConsentNotification.show();
    }

    _initAutoAcceptCookieConsentIfNeeded() {
        // @todo make a separate settings key for auto accept watcher
        const { autoAcceptCookieConsentAfterRequestCount, autoAcceptCookieConsentName, domain, path } = this.options;

        if (this.autoAcceptCookieConsentAfterRequestCount === 0 || this.cookieConsentStore.hasBeenSet() || isCurrentPageExcluded(this.options.excludedPageUrls)) {
            return;
        }

        const autoAcceptSettings = {
            name: autoAcceptCookieConsentName,
            domain: domain,
            path: path
        };

        new AutoAcceptRequestWatcher(
            this.cookieConsentStore,
            autoAcceptCookieConsentAfterRequestCount,
            autoAcceptSettings,
            () => {
                this.enableCookieGuardedContent();

                if (this.cookieConsentNotification) {
                    this.cookieConsentNotification.close();
                }
            }
        );
    }

    _initRevoke() {
        var { selectors } = this.options;

        this._revokeElements = document.querySelectorAll(selectors.revoke);

        Array.prototype.forEach.call(this._revokeElements, (element) => {
            element.addEventListener('click', this._onRevokeCookiesClick);
        });
    }

    /**
     * @param {Event} event
     */
    _onRevokeCookiesClick(event) {
        event.preventDefault();

        const { callbacks } = this.options;

        this.cookieConsentStore.revoke();

        if (typeof callbacks.onRevoke === 'function') {
            callbacks.onRevoke(event.target);
        }
    }

    enableCookieGuardedContent() {
        var { selectors } = this.options;

        var cookieGuardedElements = document.querySelectorAll(selectors.cookieGuard);
        var parser = new DOMParser();

        if (!cookieGuardedElements.length) {
            return;
        }

        Array.prototype.forEach.call(cookieGuardedElements, (element) => {
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
            element.parentNode.replaceChild(newScriptElement, element);
        });
    }
}

export default FHCookieGuard;
