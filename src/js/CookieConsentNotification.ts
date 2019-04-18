import CookieConsentStore from "./CookieConsentStore";
import { OptionsType } from "./types";

class CookieConsentNotification {
    public cookieConsentNotificationElement: HTMLElement;
    private cookieConsentStore: CookieConsentStore;
    private options: OptionsType;
    private onAcceptCallback: Function | null;
    private acceptButton: HTMLElement | null = null;
    private refuseButton: HTMLElement | null = null;
    private parentContainer: HTMLElement;

    constructor(
        cookieConsentNotificationElement: HTMLElement,
        cookieConsentStore: CookieConsentStore,
        options: OptionsType,
        onAcceptCallback: Function | null = null
    ) {
        this.cookieConsentNotificationElement = cookieConsentNotificationElement;
        this.cookieConsentStore = cookieConsentStore;
        this.options = options;
        this.onAcceptCallback = onAcceptCallback;

        this.parentContainer = document.querySelector(this.options.selectors.parentContainer) || document.body;

        this.init();
    }

    public init() {
        const { selectors } = this.options;

        // notification html must be available, we do not create this with javascript
        if (!this.cookieConsentNotificationElement) {
            return;
        }

        // @todo better to select within notification element?
        this.acceptButton = document.querySelector(selectors.accept);
        this.refuseButton = document.querySelector(selectors.refuse);

        if (this.acceptButton) {
            this.acceptButton.addEventListener('click', this.onAcceptClick);
        }

        if (this.refuseButton) {
            this.refuseButton.addEventListener('click', this.onRefuseClick);
        }
    }

    public show() {
        const { callbacks, activeClass } = this.options;

        this.parentContainer.classList.add(activeClass);
        this.cookieConsentNotificationElement.setAttribute('aria-hidden', 'false');

        if (this.acceptButton) {
            this.acceptButton.focus();
        }

        if (typeof callbacks.onOpenCookieAlert === 'function') {
            callbacks.onOpenCookieAlert(this.cookieConsentNotificationElement);
        }
    }

    public close() {
        const { activeClass, callbacks } = this.options;

        this.parentContainer.classList.remove(activeClass);
        this.cookieConsentNotificationElement.setAttribute('aria-hidden', 'true');

        if (typeof callbacks.onCloseCookieAlert === 'function') {
            callbacks.onCloseCookieAlert(this.cookieConsentNotificationElement);
        }
    }

    private onAcceptClick = () => {
        this.cookieConsentStore.accept();
        this.close();

        if (typeof this.onAcceptCallback === 'function') {
            this.onAcceptCallback();
        }
    }

    private onRefuseClick = () => {
        this.cookieConsentStore.refuse();
        this.close();
    }
}

export default CookieConsentNotification;
