import { useContext } from 'react';
import { CookieGuardContext } from '../context/CookieGuardContext';

export const useCookies = () => {
    const { cookies, setCookies, clearCookies } =
        useContext(CookieGuardContext);
    return { cookies, setCookies, clearCookies };
};
