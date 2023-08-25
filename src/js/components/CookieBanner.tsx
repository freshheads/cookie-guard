import { FC, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useCookies } from '../hooks/useCookies';
import { Checkbox } from './Checkbox';

export type CookieBannerProps = {
    title: string;
    description: JSX.Element | string;
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
    const [cookieOptions, setCookieOptions] = useState<{
        required: boolean;
        functional: boolean;
        analytics: boolean;
        marketing: boolean;
    }>({
        required: cookieSettings?.required ?? false,
        functional: cookieSettings?.functional ?? false,
        analytics: cookieSettings?.analytics ?? false,
        marketing: cookieSettings?.marketing ?? false,
    });

    useEffect(() => {
        setCookieOptions({
            required: cookieSettings?.required ?? false,
            functional: cookieSettings?.functional ?? false,
            analytics: cookieSettings?.analytics ?? false,
            marketing: cookieSettings?.marketing ?? false,
        });
    }, [cookieSettings]);

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
            <div className="cookiebanner__scroll-container" aria-hidden="true">
                <div className="cookiebanner__container">
                    <div className="cookiebanner__content">
                        <Dialog.Title as="h2">{title}</Dialog.Title>
                        <Dialog.Description as="div">
                            {description}
                        </Dialog.Description>
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
