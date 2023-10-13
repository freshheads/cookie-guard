import {
    Button,
    Checkbox,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useCookies } from '@freshheads/cookie-guard';
import React from 'react';
import { FC, useEffect, useState } from 'react';

const CookieBannerPrimitive: FC = () => {
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
        required: cookieSettings?.required ?? true,
        functional: cookieSettings?.functional ?? false,
        analytics: cookieSettings?.analytics ?? false,
        marketing: cookieSettings?.marketing ?? false,
    });

    useEffect(() => {
        setCookieOptions({
            required: cookieSettings?.required ?? true,
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
        <Modal
            isOpen={cookieBannerIsOpen}
            onClose={() => {}}
            isCentered
            size={'2xl'}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Onze site maakt gebruik van cookies</ModalHeader>
                <ModalBody>
                    <Text mb={4}>
                        Wij gebruiken cookies voor de werking van de website,
                        analyse en verbetering en marketingdoeleinden.
                    </Text>

                    <VStack alignItems={'flex-start'} mb={4}>
                        <Checkbox
                            isChecked={cookieOptions.required}
                            isDisabled={true}
                        >
                            Noodzakelijke cookies
                        </Checkbox>
                        <Checkbox
                            isChecked={cookieOptions.functional}
                            onChange={() =>
                                setCookieOptions({
                                    ...cookieOptions,
                                    functional: !cookieOptions.functional,
                                })
                            }
                        >
                            Functionele cookies
                        </Checkbox>
                        <Checkbox
                            isChecked={cookieOptions.analytics}
                            onChange={() =>
                                setCookieOptions({
                                    ...cookieOptions,
                                    analytics: !cookieOptions.analytics,
                                })
                            }
                        >
                            Analytische cookies
                        </Checkbox>
                        <Checkbox
                            isChecked={cookieOptions.marketing}
                            onChange={() =>
                                setCookieOptions({
                                    ...cookieOptions,
                                    marketing: !cookieOptions.marketing,
                                })
                            }
                        >
                            Marketing cookies
                        </Checkbox>
                    </VStack>

                    <HStack alignItems={'center'}>
                        <Button
                            flex={1}
                            onClick={() => {
                                setCookieSettings(cookieOptions);
                                setCookieBannerIsOpen(false);
                            }}
                        >
                            Opslaan
                        </Button>
                        <Button
                            flex={1}
                            colorScheme="blue"
                            onClick={onAcceptAll}
                        >
                            Alles cookies accepteren
                        </Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CookieBannerPrimitive;
