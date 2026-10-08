import Cookies from 'js-cookie';

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

    // Otherwise a leftover host-only or domain variant would shadow the new value on read.
    removeCookies(name);

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

// A domain cookie is only removed with its domain, which may come from an earlier session, so try every parent domain.
export const removeCookies = (name: string) => {
    if (typeof document === 'undefined') return;

    Cookies.remove(name);

    const labels = document.location.hostname.split('.');
    for (let i = 0; i < labels.length - 1; i++) {
        Cookies.remove(name, { domain: labels.slice(i).join('.') });
    }
};
