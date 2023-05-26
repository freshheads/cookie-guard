import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useCookies } from '../hooks/useCookies';
import { Checkbox } from './Checkbox';
import { CookieCategorySettings } from '../types/cookies';

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
    const { cookies, setCookies } = useCookies();
    const [isOpen, setIsOpen] = useState(cookies === undefined);

    const [analytics, setAnalytics] = useState(cookies?.analytics ?? false);
    const [marketing, setMarketing] = useState(cookies?.marketing ?? false);
    const [functional, setFunctional] = useState(cookies?.functional ?? false);

    const onSetCookies = (cookiesToset: CookieCategorySettings) => {
        setCookies(cookiesToset);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={() => {}} className="cookiebanner">
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
                                value={functional}
                                onChange={() => setFunctional(!functional)}
                            />
                            <Checkbox
                                label={analyticsLabel}
                                name="analytics"
                                value={analytics}
                                onChange={() => setAnalytics(!analytics)}
                            />

                            <Checkbox
                                label={marketingLabel}
                                name="marketing"
                                value={marketing}
                                onChange={() => setMarketing(!marketing)}
                            />
                        </div>
                        <div className="cookiebanner__button-container">
                            <button
                                className="cookiebanner__button cookiebanner__save-button"
                                onClick={() =>
                                    onSetCookies({
                                        functional,
                                        analytics,
                                        marketing,
                                    })
                                }
                            >
                                {saveLabel}
                            </button>
                            <button
                                className="cookiebanner__button cookiebanner__button--primary cookiebanner__accept-all-button"
                                onClick={() =>
                                    onSetCookies({
                                        functional: true,
                                        analytics: true,
                                        marketing: true,
                                    })
                                }
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
