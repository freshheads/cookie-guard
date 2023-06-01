import { FC, ReactNode, useEffect, useState } from 'react';
import { setCookies as setBrowserCookies } from '../util/cookieFunctions';
import { CookieGuardContext } from './CookieGuardContext';
import Cookies from 'js-cookie';
import { CookieCategorySettings } from '../types/cookies';

export const cookieName = 'cookies_consent';

export type CookieGuardsContextProviderProps = {
    children: ReactNode;
    onCookieSettingsChange?: (cookieSettings: CookieCategorySettings) => void;
    onCookieSettingsSet?: (cookieSettings: CookieCategorySettings) => void;
    onCookieSettingsCleared?: () => void;
};

export const CookieGuardProvider: FC<CookieGuardsContextProviderProps> = ({
    children,
    onCookieSettingsChange,
    onCookieSettingsCleared,
    onCookieSettingsSet,
}) => {
    const currentCookies = Cookies.get(cookieName);
    const initialState = currentCookies
        ? (JSON.parse(currentCookies) as CookieCategorySettings)
        : undefined;

    const [cookiebannerIsOpen, setCookieBannerIsOpen] = useState<boolean>(
        currentCookies ? false : true
    );

    const [cookieSettings, setCookieSettings] =
        useState<CookieCategorySettings>(initialState);

    useEffect(() => {
        onCookieSettingsChange && onCookieSettingsChange(cookieSettings);
    }, [cookieSettings]);

    const onSetCookieSettings = (
        newCookieSettings: CookieCategorySettings,
        domain?: string,
        subdomains?: string[]
    ) => {
        if (!newCookieSettings) return;
        if (Object.keys(newCookieSettings).length === 0) return;

        const cookiesToSet = {
            ...cookieSettings,
            ...newCookieSettings,
            required: true,
        };

        setBrowserCookies(
            cookieName,
            JSON.stringify(cookiesToSet),
            7,
            subdomains,
            domain
        );

        setCookieSettings(cookiesToSet);
        onCookieSettingsSet && onCookieSettingsSet(cookiesToSet);
    };

    const clearCookieSettings = () => {
        if (typeof document === 'undefined') return;
        setCookieSettings(undefined);
        Cookies.remove(cookieName);
        // cookies in state is not updated immediately, so we need to pass undefined
        onCookieSettingsCleared && onCookieSettingsCleared();
    };

    return (
        <CookieGuardContext.Provider
            value={{
                cookieSettings: cookieSettings,
                setCookieSettings: onSetCookieSettings,
                clearCookieSettings: clearCookieSettings,
                cookieBannerIsOpen: cookiebannerIsOpen,
                setCookieBannerIsOpen: setCookieBannerIsOpen,
            }}
        >
            {children}
        </CookieGuardContext.Provider>
    );
};
