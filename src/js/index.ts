// Extracted into dist/style.css by the library build; not injected into the JS.
import '../css/popup-styles.css';
import { CookieBanner, CookieBannerProps } from './components/CookieBanner';
import { useCookies } from './hooks/useCookies';
import { CookieGuardContext } from './context/CookieGuardContext';
import { CookieGuardProvider } from './context/CookieGuardProvider';

import { CookieCategorySettings } from './types/cookies';

export type { CookieBannerProps, CookieCategorySettings };
export { CookieBanner, useCookies, CookieGuardContext, CookieGuardProvider };
