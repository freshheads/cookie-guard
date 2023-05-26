import { useContext } from 'react';
import { CookieGuardContext } from '../context/CookieGuardContext';

export const useCookies = () => {
    const { cookieSettings, setCookieSettings, clearCookieSettings } =
        useContext(CookieGuardContext);
    return { cookieSettings, setCookieSettings, clearCookieSettings };
};
