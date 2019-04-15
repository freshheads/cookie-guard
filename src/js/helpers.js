export function isCurrentPageExcluded(excludedPageUrls) {
    if (Array.isArray(excludedPageUrls) === false ) {
        excludedPageUrls = JSON.parse(excludedPageUrls);
    }

    return excludedPageUrls.indexOf(window.location.pathname) >= 0;
}
