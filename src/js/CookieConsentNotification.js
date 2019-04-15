class CookieConsentNotification {
    constructor(cookieConsentNotificationElement, cookieConsentStore, options, onAcceptCallback = null) {
        this.cookieConsentNotificationElement = cookieConsentNotificationElement;
        this.cookieConsentStore = cookieConsentStore;
        this.options = options;
        this.onAcceptCallback = onAcceptCallback;

        this._onAcceptClick = this._onAcceptClick.bind(this);
        this._onRefuseClick = this._onRefuseClick.bind(this);

        this.init();
    }

    init() {
        const { selectors } = this.options;

        // notification html must be available, we do not create this with javascript
        if (!this.cookieConsentNotificationElement) {
            return;
        }

        // @todo better to select within notification element?
        this.acceptButton = document.querySelector(selectors.accept);
        this.refuseButton = document.querySelector(selectors.refuse);
        this._parentContainer = document.querySelector(selectors.parentContainer);

        if (this.acceptButton) {
            this.acceptButton.addEventListener('click', this._onAcceptClick);
        }

        if (this.refuseButton) {
            this.refuseButton.addEventListener('click', this._onRefuseClick);
        }
    }

    show() {
        var { callbacks, activeClass } = this.options;

        this._parentContainer.classList.add(activeClass);
        this.cookieConsentNotificationElement.setAttribute('aria-hidden', 'false');

        if (this.acceptButton) {
            this.acceptButton.focus();
        }

        if (typeof callbacks.onOpenCookieAlert === 'function') {
            callbacks.onOpenCookieAlert(this.cookieConsentNotificationElement);
        }
    }

    close() {
        var { activeClass, callbacks } = this.options;

        this._parentContainer.classList.remove(activeClass);
        this.cookieConsentNotificationElement.setAttribute('aria-hidden', 'true');

        if (typeof callbacks.onCloseCookieAlert === 'function') {
            callbacks.onCloseCookieAlert(this.cookieConsentNotificationElement);
        }
    }

    _onAcceptClick() {
        this.cookieConsentStore.accept();
        this.close();

        if (typeof this.onAcceptCallback === 'function') {
            this.onAcceptCallback();
        }
    }

    _onRefuseClick() {
        this.cookieConsentStore.refuse();
        this.close();
    }
}

export default CookieConsentNotification;
