import { CookieAttributes } from "js-cookie";

export interface OptionsType {
    selectors: {
        accept: string,
        refuse: string,
        cookieGuard: string,
        parentContainer: string
    },
    cookieName: string,
    cookieAttributes: CookieAttributes,
    autoAcceptCookieConsentAfterRequestCount: number | null,
    activeClass: string,
    excludedPageUrls: Array<string>,
    callbacks: {
        onOpenCookieAlert: Function | null,
        onCloseCookieAlert: Function | null
    }
}

export type UserOptionsType = Partial<OptionsType>;
