import { FC, Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { useCookies } from '../hooks/useCookies';

type CookiePopupProps = {
    title: string;
    beforeOptions: JSX.Element | string;
};

export const CookieGuard: FC<CookiePopupProps> = ({ title, beforeOptions }) => {
    let [isOpen, setIsOpen] = useState(true);
    const { cookies, setCookies } = useCookies();

    const [analytics, setAnalytics] = useState(cookies.analytics);
    const [marketing, setMarketing] = useState(cookies.marketing);

    const onSetCookies = (cookies: {
        analytics: boolean;
        marketing: boolean;
    }) => {
        setCookies(cookies);
        setIsOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => {}}
            style={{ position: 'relative', zIndex: 999 }}
            className="cookiebanner"
        >
            <div className="cookiebanner_backdrop" aria-hidden="true" />
            <Dialog.Panel
                className="cookiebanner_content"
                style={{ zIndex: 1 }}
            >
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Description as="div">
                    {beforeOptions}
                </Dialog.Description>

                <button
                    onClick={() =>
                        onSetCookies({ analytics: true, marketing: true })
                    }
                >
                    accepteer alle cookies
                </button>

                <Disclosure>
                    <Disclosure.Button as={Fragment}>
                        <button className="cookiebanner_button">
                            Wijzig cookie instellingen
                        </button>
                    </Disclosure.Button>

                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Disclosure.Panel>
                            <div>deze cookies kun je wijzigen</div>
                            <Checkbox
                                label="Analytics"
                                name="analytics"
                                value={analytics}
                                onChange={() => setAnalytics(!analytics)}
                            />

                            <Checkbox
                                label="Marketing"
                                name="marketing"
                                value={marketing}
                                onChange={() => setMarketing(!marketing)}
                            />
                            <button
                                onClick={() =>
                                    onSetCookies({ analytics, marketing })
                                }
                            >
                                opslaan
                            </button>
                        </Disclosure.Panel>
                    </Transition>
                </Disclosure>
            </Dialog.Panel>
        </Dialog>
    );
};

const Checkbox: FC<{
    label: string;
    value: boolean;
    name: string;
    onChange: () => void;
}> = ({ label, name, value, onChange }) => {
    return (
        <label htmlFor={name} className="cookiebanner_checkbox-label">
            <input
                className="cookiebanner_checkbox"
                type="checkbox"
                name={name}
                checked={value}
                onChange={onChange}
            />
            {label}
        </label>
    );
};
