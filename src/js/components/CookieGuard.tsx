import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useCookies } from '../hooks/useCookies';
import { Checkbox } from './Checkbox';

export type CookieGuardProps = {
    title: string;
    description: JSX.Element | string;
    acceptAllLabel: string;
    saveLabel: string;
    functionalLabel: string;
    analyticsLabel: string;
    marketingLabel: string;
};

export const CookieGuard: FC<CookieGuardProps> = ({
    title,
    description,
    acceptAllLabel,
    saveLabel,
    functionalLabel,
    analyticsLabel,
    marketingLabel,
}) => {
    const { cookies, setCookies } = useCookies();
    const [isOpen, setIsOpen] = useState(cookies === undefined);

    const [analytics, setAnalytics] = useState(cookies?.analytics ?? false);
    const [marketing, setMarketing] = useState(cookies?.marketing ?? false);

    const onSetCookies = (cookies: {
        analytics: boolean;
        marketing: boolean;
    }) => {
        setCookies(cookies);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={() => {}} className="cookieguard">
            <div className="cookieguard__backdrop" aria-hidden="true" />
            <div className="cookieguard__scroll-container" aria-hidden="true">
                <div className="cookieguard__container">
                    <div className="cookieguard__content">
                        <Dialog.Title as="h2">{title}</Dialog.Title>
                        <Dialog.Description as="div">
                            {description}
                        </Dialog.Description>
                        <div className="cookieguard__options">
                            <Checkbox
                                label={functionalLabel}
                                name="functional"
                                value={true}
                                disabled={true}
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
                        <div className="cookieguard__button-container">
                            <button
                                className="cookieguard__button cookieguard__save-button"
                                onClick={() =>
                                    onSetCookies({
                                        analytics,
                                        marketing,
                                    })
                                }
                            >
                                {saveLabel}
                            </button>
                            <button
                                className="cookieguard__button cookieguard__button--primary cookieguard__accept-all-button"
                                onClick={() =>
                                    onSetCookies({
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
