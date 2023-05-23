import Cookies from 'js-cookie';
import { CookieOptions } from '../types/cookies';

//set cookies function
export const setCookies = (
    name: string,
    value: string,
    durationInDays: number,
    subDomains?: string[],
    mainDomain?: string
) => {
    if (typeof location === 'undefined' || typeof document === 'undefined')
        return;

    const allDomains = [
        ...(subDomains?.map((subD) => `${subD}.${mainDomain}`) || []),
        mainDomain,
    ];

    if (allDomains.includes(document.location.hostname)) {
        Cookies.set(name, value, {
            expires: durationInDays,
            domain: mainDomain,
        });
    } else {
        Cookies.set(name, value, {
            expires: durationInDays,
        });
    }
};

export const cookieOptionsToArray = (cookieOptions: CookieOptions) => {
    const { analytics, marketing, functional } = cookieOptions;
    let cookieValue = [];
    if (functional) cookieValue.push('functional');
    if (analytics) cookieValue.push('analytics');
    if (marketing) cookieValue.push('marketing');
    return cookieValue;
};
