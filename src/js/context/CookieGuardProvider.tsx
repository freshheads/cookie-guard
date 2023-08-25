import { FC, ReactNode, useEffect, useState } from 'react';
import { setCookies as setBrowserCookies } from '../util/cookieFunctions';
import { CookieGuardContext } from './CookieGuardContext';
import Cookies from 'js-cookie';
import { CookieCategory, CookieCategorySettings } from '../types/cookies';

export const cookieSettingsName = 'cookies_consent';

export type CookieGuardsContextProviderProps = {
    children: ReactNode;
    onCookieSettingsChange?: (cookieSettings: CookieCategorySettings) => void;
    onCookieSettingsSet?: (cookieSettings: CookieCategorySettings) => void;
    onCookieSettingsClear?: () => void;
    reloadOnRetractCookies?: boolean;
};

export const CookieGuardProvider: FC<CookieGuardsContextProviderProps> = ({
    children,
    onCookieSettingsChange,
    onCookieSettingsSet,
    onCookieSettingsClear,
    reloadOnRetractCookies = false,
}) => {
    const currentCookies = Cookies.get(cookieSettingsName);
    const initialState = currentCookies
        ? (JSON.parse(currentCookies) as CookieCategorySettings)
        : undefined;

    const [cookiebannerIsOpen, setCookieBannerIsOpen] = useState<boolean>(
        currentCookies ? false : true
    );

    const [cookieSettings, setCookieSettings] =
        useState<CookieCategorySettings>(initialState);

    const onCookieSettingRetract = () => {
        /*
            remove all cookies except the cookie that stores the cookie settings
        */
        Object.keys(Cookies.get()).forEach(function (cookie) {
            if (cookie !== cookieSettingsName) {
                Cookies.remove(cookie);
            }
        });
        reloadOnRetractCookies && window.location.reload();
    };

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
        let hasRetractedCookies = false;

        /*
            Since tags cannot be removed from the browser we need to refresh if a
            cookie value is changed from true to false to remove all tags that were
            set when the value was true.
        */

        if (cookieSettings) {
            if (
                (cookieSettings.analytics &&
                    newCookieSettings.analytics === false) ||
                (cookieSettings.marketing &&
                    newCookieSettings.marketing === false) ||
                (cookieSettings.functional &&
                    newCookieSettings.functional === false) ||
                (cookieSettings.required &&
                    newCookieSettings.required === false)
            ) {
                hasRetractedCookies = true;
            }
        }

        const cookiesToSet = {
            ...cookieSettings,
            ...newCookieSettings,
            required: true,
        };

        setBrowserCookies(
            cookieSettingsName,
            JSON.stringify(cookiesToSet),
            7,
            subdomains,
            domain
        );

        setCookieSettings(cookiesToSet);
        onCookieSettingsSet && onCookieSettingsSet(cookiesToSet);
        hasRetractedCookies && onCookieSettingRetract();
    };

    const clearCookieSettings = () => {
        if (typeof document === 'undefined') return;
        setCookieSettings(undefined);
        Cookies.remove(cookieSettingsName);
        /*
            Since tags cannot be removed from the browser we need to refresh if a
            cookie value is changed from true to false to remove all tags that were
            set when the value was true.
        */
        onCookieSettingsClear && onCookieSettingsClear();
        onCookieSettingRetract();
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
