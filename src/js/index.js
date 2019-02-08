import Cookie from 'js-cookie';
import merge from 'deepmerge';

class FHCookieGuard {
    constructor(selector = '.js-cookie-alert', options = {}) {
        this.cookieAlert = document.querySelector(selector);
        this.options = merge.all([{
            selectors: {
                accept: '.js-cookie-alert-accept',
                refuse: '.js-cookie-alert-refuse',
                revoke: '.js-cookie-alert-revoke',
                cookieGuard: '.js-cookie-guarded',
                parentContainer: 'body'
            },
            cookieName: 'cookies-accepted',
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
        }, options, this.cookieAlert ? this.cookieAlert.dataset : {}]);

        this._onRevokeCookiesClick = this._onRevokeCookiesClick.bind(this);
        this.initRevoke();

        if (this.cookieAlert === null) {
            return;
        }

        this._onAcceptCookiesClick = this._onAcceptCookiesClick.bind(this);
        this._onRefuseCookiesClick = this._onRefuseCookiesClick.bind(this);
        this.init();
    }

    /**
     * @public
     */
    init() {
        var { cookieName, selectors } = this.options;

        if (typeof Cookie.get(cookieName) !== 'undefined' || this._isCurrentPageExcluded()) {
            this.cookieAlert.parentElement.removeChild(this.cookieAlert);
            return;
        }

        this._parentContainer = document.querySelector(selectors.parentContainer);
        this._acceptButton = document.querySelector(selectors.accept);
        this._refuseButton = document.querySelector(selectors.refuse);

        if (this._acceptButton) {
            this._acceptButton.addEventListener('click', this._onAcceptCookiesClick);
        }

        if (this._refuseButton) {
            this._refuseButton.addEventListener('click', this._onRefuseCookiesClick);
        }

        this._openCookieAlert();
    }

    /**
     * @public
     */
    initRevoke() {
        var { selectors } = this.options;

        this._revokeElements = document.querySelectorAll(selectors.revoke);

        Array.prototype.forEach.call(this._revokeElements, (element) => {
            element.addEventListener('click', this._onRevokeCookiesClick);
        });
    }

    /**
     * @private
     */
    _onAcceptCookiesClick() {
        this._setCookie(1);
        this._enableCookieGuardedContent();
        this._closeCookieAlert();
    }

    /**
     * @private
     */
    _onRefuseCookiesClick() {
        this._setCookie(0);
        this._closeCookieAlert();
    }

    /**
     * @private
     * @param {string} value
     */
    _setCookie(value) {
        var { cookieName, expireDays, domain, path } = this.options;

        Cookie.set(cookieName, value, {
            expires: parseInt(expireDays),
            domain,
            path
        });
    }


    /**
     * @param {Event} event
     * @private
     */
    _onRevokeCookiesClick(event) {
        event.preventDefault();

        var { cookieName, domain, path, callbacks } = this.options;

        Cookie.remove(cookieName, { domain, path });

        if (typeof callbacks.onRevoke === 'function') {
            callbacks.onRevoke(event.target);
        }
    }

    /**
     * @private
     */
    _openCookieAlert() {
        var { callbacks, activeClass } = this.options;

        this._parentContainer.classList.add(activeClass);
        this.cookieAlert.setAttribute('aria-hidden', 'false');

        if (this._acceptButton) {
            this._acceptButton.focus();
        }

        if (typeof callbacks.onOpenCookieAlert === 'function') {
            callbacks.onOpenCookieAlert(this.cookieAlert);
        }
    }

    /**
     * @private
     */
    _closeCookieAlert() {
        var { activeClass, callbacks } = this.options;

        this._parentContainer.classList.remove(activeClass);
        this.cookieAlert.setAttribute('aria-hidden', 'true');

        if (typeof callbacks.onCloseCookieAlert === 'function') {
            callbacks.onCloseCookieAlert(this.cookieAlert);
        }
    }

    /**
     * @return {boolean}
     * @private
     */
    _isCurrentPageExcluded() {
        var { excludedPageUrls } = this.options;

        if (Array.isArray(excludedPageUrls) === false ) {
            excludedPageUrls = JSON.parse(excludedPageUrls);
        }

        return excludedPageUrls.indexOf(window.location.pathname) >= 0;
    }

    /**
     * @private
     */
    _enableCookieGuardedContent() {
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
