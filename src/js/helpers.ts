export function isCurrentPageExcluded(excludedPageUrls: string | string[]): boolean {
    if (typeof excludedPageUrls === 'string') {
        excludedPageUrls = JSON.parse(excludedPageUrls);
    }

    return excludedPageUrls.indexOf(window.location.pathname) >= 0;
}
