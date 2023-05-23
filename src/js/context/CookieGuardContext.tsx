import { createContext } from 'react';
import { CookieOptions } from '../types/cookies';

export const CookieGuardContext = createContext<{
    cookies: CookieOptions | undefined;
    setCookies: (
        cookies: Partial<CookieOptions>,
        domain?: string,
        subdomains?: string[]
    ) => void;
    clearCookies: () => void;
}>({
    cookies: undefined,
    setCookies: () => {},
    clearCookies: () => {},
});
