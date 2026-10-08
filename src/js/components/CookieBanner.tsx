import { FC, ReactNode, useState } from 'react';
import { Description, Dialog, DialogTitle } from '@headlessui/react';
import { useCookies } from '../hooks/useCookies';
import { CookieCategorySettings } from '../types/cookies';
import { Checkbox } from './Checkbox';

const toCookieOptions = (cookieSettings: CookieCategorySettings) => ({
    required: cookieSettings?.required ?? false,
    functional: cookieSettings?.functional ?? false,
    analytics: cookieSettings?.analytics ?? false,
    marketing: cookieSettings?.marketing ?? false,
});

export type CookieBannerProps = {
    title: string;
    description: ReactNode;
    acceptAllLabel: string;
    saveLabel: string;
    requiredLabel: string;
    functionalLabel: string;
    analyticsLabel: string;
    marketingLabel: string;
};

export const CookieBanner: FC<CookieBannerProps> = ({
    title,
    description,
    acceptAllLabel,
    saveLabel,
    requiredLabel,
    functionalLabel,
    analyticsLabel,
    marketingLabel,
}) => {
    const {
        cookieSettings,
        setCookieSettings,
        cookieBannerIsOpen,
        setCookieBannerIsOpen,
    } = useCookies();
    /*
        To prevent the cookie banner changing the settings without pressing save,
        we need to keep track of the options in the banner itself. 
    */
    const [cookieOptions, setCookieOptions] = useState(() =>
        toCookieOptions(cookieSettings)
    );

    // Reset the options when the stored settings change, during render instead of in an effect.
    const [syncedCookieSettings, setSyncedCookieSettings] =
        useState(cookieSettings);
    if (cookieSettings !== syncedCookieSettings) {
        setSyncedCookieSettings(cookieSettings);
        setCookieOptions(toCookieOptions(cookieSettings));
    }

    const onAcceptAll = () => {
        setCookieSettings({
            functional: true,
            analytics: true,
            marketing: true,
        });
        setCookieBannerIsOpen(false);
    };

    return (
        <Dialog
            open={cookieBannerIsOpen}
            onClose={() => {}}
            className="cookiebanner"
        >
            <div className="cookiebanner__backdrop" aria-hidden="true" />
            <div className="cookiebanner__scroll-container">
                <div className="cookiebanner__container">
                    <div className="cookiebanner__content">
                        <DialogTitle as="h2">{title}</DialogTitle>
                        <Description as="div">{description}</Description>
                        <div className="cookiebanner__options">
                            <Checkbox
                                label={requiredLabel}
                                name="required"
                                value={true}
                                disabled
                            />
                            <Checkbox
                                label={functionalLabel}
                                name="functional"
                                value={cookieOptions?.functional ?? false}
                                onChange={() =>
                                    setCookieOptions({
                                        ...cookieOptions,
                                        functional: !cookieOptions.functional,
                                    })
                                }
                            />
                            <Checkbox
                                label={analyticsLabel}
                                name="analytics"
                                value={cookieOptions.analytics ?? false}
                                onChange={() =>
                                    setCookieOptions({
                                        ...cookieOptions,
                                        analytics: !cookieOptions.analytics,
                                    })
                                }
                            />

                            <Checkbox
                                label={marketingLabel}
                                name="marketing"
                                value={cookieOptions.marketing ?? false}
                                onChange={() =>
                                    setCookieOptions({
                                        ...cookieOptions,
                                        marketing: !cookieOptions.marketing,
                                    })
                                }
                            />
                        </div>
                        <div className="cookiebanner__button-container">
                            <button
                                className="cookiebanner__button cookiebanner__save-button"
                                onClick={() => {
                                    setCookieSettings(cookieOptions);
                                    setCookieBannerIsOpen(false);
                                }}
                            >
                                {saveLabel}
                            </button>
                            <button
                                className="cookiebanner__button cookiebanner__button--primary cookiebanner__accept-all-button"
                                onClick={() => onAcceptAll()}
                            >
                                {acceptAllLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
