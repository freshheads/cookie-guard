import { CookieGuard, CookieGuardProps } from './components/CookieGuard';
import { useCookies } from './hooks/useCookies';
import { CookieGuardContext } from './context/CookieGuardContext';
import { CookieGuardContextProvider } from './context/CookieGuardContextProvider';
import { CookieOptions } from './types/cookies';

export {
    CookieGuard,
    useCookies,
    CookieGuardContext,
    CookieGuardContextProvider,
};

export type { CookieGuardProps, CookieOptions };
