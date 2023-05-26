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
