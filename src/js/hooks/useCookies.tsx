import { useEffect, useState } from 'react';

function getBrowserCookies(cname: string) {
    if (!document) return;
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

//set cookies function
function setBrowserCookies(
    name: string,
    value: string,
    duration: number,
    subDomains?: string[],
    mainDomain?: string
) {
    if (!location || !document) return;
    var d = new Date();
    d.setTime(d.getTime() + duration * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();

    const allDomains = [
        ...(subDomains?.map((subD) => `${subD}.${mainDomain}`) || []),
        mainDomain,
    ];

    // set cookie with domain so that cookies are saved for all subdomains
    if (allDomains.includes(document.location.hostname)) {
        document.cookie = `${name}=[${value}];${expires};domain=${mainDomain}]`;
    }
    // but in development the url changes to a test string so just store it for that domain
    else {
        console.log('setting cookie for development');
        document.cookie = name + '=' + value + ';' + 'expires=' + expires;
    }
}

export const useCookies = () => {
    const currentCookies = JSON.parse(
        getBrowserCookies('cookies_consent') || '[]'
    );
    const [cookies, setCookiesState] = useState({
        required: currentCookies.includes('required'),
        analytics: currentCookies.includes('analytics'),
        marketing: currentCookies.includes('marketing'),
    });

    const setCookies = (
        cookies: {
            analytics: boolean;
            marketing: boolean;
        },
        domain?: string,
        subdomains?: string[]
    ) => {
        const { analytics, marketing } = cookies;
        let cookieValue = ['required'];
        if (analytics) cookieValue.push('analytics');
        if (marketing) cookieValue.push('marketing');

        setBrowserCookies(
            'cookies_consent',
            JSON.stringify(cookieValue),
            7,
            subdomains,
            domain
        );
        setCookiesState({
            required: true,
            analytics,
            marketing,
        });
    };
    return { cookies, setCookies };
};
