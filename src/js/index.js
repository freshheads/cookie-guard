import Cookie from 'js-cookie';
import merge from 'deepmerge';

class FHCookieGuard {
    constructor(selector = '.js-cookie-alert', options = {}) {
        this.cookieAlert = document.querySelector(selector);

        if (this.cookieAlert === null) {
            return;
        }

        this.options = {
            selectors: {
                accept: '.js-cookie-alert-accept',
                refuse: '.js-cookie-alert-refuse',
                cookieGuard: '.js-cookie-guarded',
                parentContainer: 'body'
            },
            cookieName: 'cookies-accepted',
            expireDays: 90,
            path: '/',
            activeClass: 'cookie-alert-is-active',
            excludedPageUrls: {},
            callbacks: {
                onOpenCookieAlert: null,
                onCloseCookieAlert: null
            }
        };

        this.options = merge.all([this.options, options, this.cookieAlert.dataset]);

        this._onAcceptCookiesClick = this._onAcceptCookiesClick.bind(this);
        this._onRefuseCookiesClick = this._onRefuseCookiesClick.bind(this);

        this.init();
    }

    /**
     * @public
     */
    init() {
        var { cookieName } = this.options;

        if (typeof Cookie.get(cookieName) !== 'undefined' || this._isCurrentPageExcluded()) {
            this.cookieAlert.parentElement.removeChild(this.cookieAlert);
            return;
        }

        this._parentContainer = document.querySelector(this.options.selectors.parentContainer);
        this._acceptButton = document.querySelector(this.options.selectors.accept);
        this._refuseButton = document.querySelector(this.options.selectors.refuse);

        this._acceptButton.addEventListener('click', this._onAcceptCookiesClick);
        this._refuseButton.addEventListener('click', this._onRefuseCookiesClick);

        this._openCookieAlert();
    }

    /**
     * @private
     */
    _onAcceptCookiesClick() {
        var { cookieName, expireDays, path } = this.options;

        Cookie.set(cookieName, 1, { expires: parseInt(expireDays), path: path });

        this._enableCookieGuardedContent();
        this._closeCookieAlert();
    }

    /**
     * @private
     */
    _onRefuseCookiesClick() {
        var { cookieName, expireDays, path } = this.options;

        Cookie.set(cookieName, 0, { expires: parseInt(expireDays), path: path });

        this._closeCookieAlert();
    }

    /**
     * @private
     */
    _openCookieAlert() {
        var { callbacks } = this.options;

        this._parentContainer.classList.add(this.options.activeClass);
        this.cookieAlert.setAttribute('aria-hidden', 'false');

        this._acceptButton.focus();

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
        var excludedPageUrls = JSON.parse(this.cookieAlert.dataset.excludedPageUrls);

        return excludedPageUrls.indexOf(window.location.pathname) >= 0;
    }

    /**
     * @private
     */
    _enableCookieGuardedContent() {
        var cookieGuardedElements = document.querySelectorAll(this.options.selectors.cookieGuard);
        var parser = new DOMParser();

        if (!cookieGuardedElements.length) {
            return;

        }

        Array.prototype.forEach.call(cookieGuardedElements, function(element) {

            // get script from content attribute
            let content = parser.parseFromString(element.dataset.content, 'text/html');
            let guardedScript = content.querySelector('script');

            // create a new script element so DOM can execute
            let newScriptElement = document.createElement('script');

            // check if the new script tag has a external src
            if (guardedScript.src) {
                newScriptElement.src = guardedScript.src;
            } else {
                newScriptElement.innerHTML = guardedScript.innerHTML;
            }

            // replace the meta tag with the new script element
            element.parentNode.replaceChild(newScriptElement, element);
        });
    }
}

export default FHCookieGuard;
