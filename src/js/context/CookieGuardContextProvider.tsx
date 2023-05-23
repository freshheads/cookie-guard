import { FC, ReactNode, useEffect, useState } from 'react';
import {
    cookieOptionsToArray,
    setCookies as setBrowserCookies,
} from '../util/cookieFunctions';
import { CookieGuardContext } from './CookieGuardContext';
import { CookieOptions } from '../types/cookies';
import Cookies from 'js-cookie';

export const cookieName = 'cookies_consent';

export type CookieGuardsContextProviderProps = {
    children: ReactNode;
    onCookiesChange?: (cookies: CookieOptions | undefined) => void;
    onCookiesSet?: (cookies: CookieOptions) => void;
    onCookiesCleared?: () => void;
};

export const CookieGuardContextProvider: FC<
    CookieGuardsContextProviderProps
> = ({ children, onCookiesChange, onCookiesCleared, onCookiesSet }) => {
    const currentCookies = Cookies.get(cookieName);
    const initialState = currentCookies
        ? {
              functional: JSON.parse(currentCookies).includes('functional'),
              analytics: JSON.parse(currentCookies).includes('analytics'),
              marketing: JSON.parse(currentCookies).includes('marketing'),
          }
        : undefined;

    const [cookies, setCookiesState] = useState(initialState);

    useEffect(() => {
        onCookiesChange && onCookiesChange(cookies);
    }, [cookies]);

    const setCookies = (
        cookiesChoice: Partial<CookieOptions>,
        domain?: string,
        subdomains?: string[]
    ) => {
        const { analytics, marketing } = cookiesChoice;

        const cookiesToSet = {
            ...cookies,
            functional: true,
            analytics: analytics ?? cookies?.analytics ?? false,
            marketing: marketing ?? cookies?.marketing ?? false,
        };

        setBrowserCookies(
            cookieName,
            JSON.stringify(cookieOptionsToArray(cookiesToSet)),
            7,
            subdomains,
            domain
        );

        setCookiesState(cookiesToSet);
        onCookiesSet && onCookiesSet(cookiesToSet);
    };

    const clearCookies = () => {
        if (typeof document === 'undefined') return;
        setCookiesState(undefined);
        Cookies.remove(cookieName);
        // cookies in state is not updated immediately, so we need to pass undefined
        onCookiesCleared && onCookiesCleared();
    };

    return (
        <CookieGuardContext.Provider
            value={{
                cookies: cookies,
                setCookies: setCookies,
                clearCookies: clearCookies,
            }}
        >
            {children}
        </CookieGuardContext.Provider>
    );
};
