import { createContext } from 'react';
import { CookieCategorySettings } from '../types/cookies';

export const CookieGuardContext = createContext<{
    cookieSettings: CookieCategorySettings;
    setCookieSettings: (
        cookieSettings: CookieCategorySettings,
        domain?: string,
        subdomains?: string[]
    ) => void;
    clearCookieSettings: () => void;
    cookieBannerIsOpen: boolean;
    setCookieBannerIsOpen: (isOpen: boolean) => void;
}>({
    cookieSettings: undefined,
    setCookieSettings: () => {},
    clearCookieSettings: () => {},
    cookieBannerIsOpen: false,
    setCookieBannerIsOpen: () => {},
});
