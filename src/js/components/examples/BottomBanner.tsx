import { FC, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useCookies } from '../../hooks/useCookies';
import { CookieCategorySettings } from '../../types/cookies';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react';

export const BottomBanner: FC = () => {
    const { cookieSettings, setCookieSettings } = useCookies();
    const [isOpen, setIsOpen] = useState(cookieSettings === undefined);

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

    const onAccept = () => {
        setCookieSettings({
            functional: true,
            analytics: true,
            marketing: true,
        });
        setCookieBannerIsOpen(false);
    };

    return (
        // <Dialog open={isOpen} onClose={() => {}} className="cookiebanner">
        //     <div className="cookiebanner__backdrop" aria-hidden="true" />
        //     <div className="cookiebanner__scroll-container" aria-hidden="true">
        //         <div className="cookiebanner__container">
        //             <div className="cookiebanner__content">
        //                 <Dialog.Title as="h2">{title}</Dialog.Title>
        //                 <Dialog.Description as="div">
        //                     {description}
        //                 </Dialog.Description>
        //                 <div className="cookiebanner__options">
        //                     <Checkbox
        //                         label={requiredLabel}
        //                         name="required"
        //                         value={true}
        //                         disabled
        //                     />
        //                     <Checkbox
        //                         label={functionalLabel}
        //                         name="functional"
        //                         value={functional}
        //                         onChange={() => setFunctional(!functional)}
        //                     />
        //                     <Checkbox
        //                         label={analyticsLabel}
        //                         name="analytics"
        //                         value={analytics}
        //                         onChange={() => setAnalytics(!analytics)}
        //                     />

        //                     <Checkbox
        //                         label={marketingLabel}
        //                         name="marketing"
        //                         value={marketing}
        //                         onChange={() => setMarketing(!marketing)}
        //                     />
        //                 </div>
        //                 <div className="cookiebanner__button-container">
        //                     <button
        //                         className="cookiebanner__button cookiebanner__save-button"
        //                         onClick={() =>
        //                             onSetCookies({
        //                                 functional,
        //                                 analytics,
        //                                 marketing,
        //                             })
        //                         }
        //                     >
        //                         {saveLabel}
        //                     </button>
        //                     <button
        //                         className="cookiebanner__button cookiebanner__button--primary cookiebanner__accept-all-button"
        //                         onClick={() =>
        //                             onSetCookies({
        //                                 functional: true,
        //                                 analytics: true,
        //                                 marketing: true,
        //                             })
        //                         }
        //                     >
        //                         {acceptAllLabel}
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Dialog>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cookies</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <p>Modal body text goes here.</p>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
