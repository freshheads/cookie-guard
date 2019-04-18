export interface OptionsType {
    selectors: {
        accept: string,
        refuse: string,
        revoke: string,
        cookieGuard: string,
        parentContainer: string
    },
    cookieName: string,
    autoAcceptCookieConsentAfterRequestCount: number | null,
    autoAcceptCookieConsentName: string,
    expireDays: number,
    domain: string,
    path: string,
    activeClass: string,
    excludedPageUrls: Array<string>,
    callbacks: {
        onOpenCookieAlert: Function | null,
        onCloseCookieAlert: Function | null,
        onRevoke: Function | null
    }
}

export type UserOptionsType = Partial<OptionsType>;

export interface CookieSettingsType {
    name: string,
    domain: string,
    path: string,
    expireDays ?: number,
}
