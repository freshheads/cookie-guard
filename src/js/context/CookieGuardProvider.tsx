import { FC, ReactNode, useEffect, useState } from 'react';
import { setCookies as setBrowserCookies } from '../util/cookieFunctions';
import { CookieGuardContext } from './CookieGuardContext';
import Cookies from 'js-cookie';
import { CookieCategorySettings } from '../types/cookies';

export const cookieName = 'cookies_consent';

export type CookieGuardsContextProviderProps = {
    children: ReactNode;
    onCookiesChange?: (cookies: CookieCategorySettings) => void;
    onCookiesSet?: (cookies: CookieCategorySettings) => void;
    onCookiesCleared?: () => void;
};

export const CookieGuardProvider: FC<CookieGuardsContextProviderProps> = ({
    children,
    onCookiesChange,
    onCookiesCleared,
    onCookiesSet,
}) => {
    const currentCookies = Cookies.get(cookieName);
    const initialState = currentCookies
        ? (JSON.parse(currentCookies) as CookieCategorySettings)
        : undefined;

    const [cookies, setCookiesState] =
        useState<CookieCategorySettings>(initialState);

    useEffect(() => {
        onCookiesChange && onCookiesChange(cookies);
    }, [cookies]);

    const setCookies = (
        cookiesChoice: CookieCategorySettings,
        domain?: string,
        subdomains?: string[]
    ) => {
        if (!cookiesChoice) return;
        if (Object.keys(cookiesChoice).length === 0) return;

        const cookiesToSet = {
            ...cookies,
            required: true,
            ...cookiesChoice,
        };

        setBrowserCookies(
            cookieName,
            JSON.stringify(cookiesToSet),
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
