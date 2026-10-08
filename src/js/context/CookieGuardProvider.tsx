'use client';

import {
    FC,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from 'react';
import {
    removeCookies as removeBrowserCookies,
    setCookies as setBrowserCookies,
} from '../util/cookieFunctions';
import { CookieGuardContext } from './CookieGuardContext';
import Cookies from 'js-cookie';
import { CookieCategory, CookieCategorySettings } from '../types/cookies';

export const cookieSettingsName = 'cookies_consent';

const consentCookieListeners = new Set<() => void>();

const subscribeToConsentCookie = (listener: () => void) => {
    consentCookieListeners.add(listener);
    return () => {
        consentCookieListeners.delete(listener);
    };
};

// Wins over the cookie once written ('' after a clear), so a blocked cookie write still applies this session.
let sessionConsentCookie: string | undefined;

// js-cookie has no change events, so every write in this provider notifies subscribers itself.
const setSessionConsentCookie = (value: string) => {
    sessionConsentCookie = value;
    consentCookieListeners.forEach((listener) => listener());
};

// The raw string keeps the snapshot stable between reads (a parsed object would be new each time).
const getConsentCookie = () =>
    sessionConsentCookie ?? Cookies.get(cookieSettingsName);

// null marks server rendering and hydration; React re-renders with the client snapshot right after.
const getServerConsentCookie = () => null;

const parseCookieSettings = (
    consentCookie: string | null | undefined
): CookieCategorySettings => {
    if (!consentCookie) return undefined;

    let parsed: unknown;
    try {
        parsed = JSON.parse(consentCookie);
    } catch {
        return undefined;
    }
    if (typeof parsed !== 'object' || parsed === null) return undefined;

    const settings: NonNullable<CookieCategorySettings> = {};
    for (const category of Object.values(CookieCategory)) {
        const value: unknown = Reflect.get(parsed, category);
        if (typeof value === 'boolean') settings[category] = value;
    }
    return settings;
};

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
    const consentCookie = useSyncExternalStore(
        subscribeToConsentCookie,
        getConsentCookie,
        getServerConsentCookie
    );
    const isServerSnapshot = consentCookie === null;
    const cookieSettings = useMemo(
        () => parseCookieSettings(consentCookie),
        [consentCookie]
    );

    // undefined: follow the cookie (open without consent); otherwise opened or closed explicitly.
    const [cookieBannerIsOpenOverride, setCookieBannerIsOpen] = useState<
        boolean | undefined
    >(undefined);
    const cookiebannerIsOpen =
        cookieBannerIsOpenOverride ?? (!isServerSnapshot && !cookieSettings);

    const writeSessionConsentCookie = (value: string) => {
        // Writing or clearing consent must not toggle the banner by itself, as before.
        setCookieBannerIsOpen((isOpen) => isOpen ?? cookiebannerIsOpen);
        setSessionConsentCookie(value);
    };

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

    // Via a ref: an inline callback prop is new every render and must not re-fire the effect below.
    const onCookieSettingsChangeRef = useRef(onCookieSettingsChange);
    useEffect(() => {
        onCookieSettingsChangeRef.current = onCookieSettingsChange;
    });

    useEffect(() => {
        if (isServerSnapshot) return;
        onCookieSettingsChangeRef.current?.(cookieSettings);
    }, [cookieSettings, isServerSnapshot]);

    const onSetCookieSettings = (
        newCookieSettings: CookieCategorySettings,
        domain?: string,
        subdomains?: string[]
    ) => {
        if (!newCookieSettings) return;
        if (Object.keys(newCookieSettings).length === 0) return;
        // Read from the store: a handler captured during hydration still has cookieSettings === undefined.
        const storedCookieSettings = parseCookieSettings(getConsentCookie());

        /*
            Since tags cannot be removed from the browser we need to refresh if a
            cookie value is changed from true to false to remove all tags that were
            set when the value was true.
        */
        const hasRetractedCookies = Object.values(CookieCategory).some(
            (category) =>
                storedCookieSettings?.[category] &&
                newCookieSettings[category] === false
        );

        const cookiesToSet = {
            ...storedCookieSettings,
            ...newCookieSettings,
            required: true,
        };
        const consentCookieValue = JSON.stringify(cookiesToSet);

        setBrowserCookies(
            cookieSettingsName,
            consentCookieValue,
            7,
            subdomains,
            domain
        );

        writeSessionConsentCookie(consentCookieValue);
        onCookieSettingsSet && onCookieSettingsSet(cookiesToSet);
        hasRetractedCookies && onCookieSettingRetract();
    };

    const clearCookieSettings = () => {
        if (typeof document === 'undefined') return;
        removeBrowserCookies(cookieSettingsName);
        writeSessionConsentCookie('');
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
