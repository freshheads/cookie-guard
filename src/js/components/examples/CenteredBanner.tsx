import { FC, useEffect, useState } from 'react';
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
    Slide,
    Text,
    Link,
    Flex,
    VStack,
    Icon,
    Box,
    Stack,
    Heading,
} from '@chakra-ui/react';
import { PrivacyPreferences } from '../PrivacyPreferences';

export const CenteredBanner: FC = () => {
    const { cookieSettings, setCookieSettings } = useCookies();
    const [isOpen, setIsOpen] = useState(cookieSettings === undefined);
    const [privacyPreferencesIsOpen, setPrivacyPreferencesIsOpen] =
        useState(false);

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
        setIsOpen(false);
    };

    const onDenyAll = () => {
        setCookieSettings({
            functional: true,
            analytics: false,
            marketing: false,
        });
        setIsOpen(false);
    };

    const openPrivacyPreferences = () => {
        setPrivacyPreferencesIsOpen(true);
    };

    const closePrivacyPreferences = () => {
        setPrivacyPreferencesIsOpen(false);
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => {}} isCentered>
            <ModalOverlay />
            <ModalContent
                borderRadius="none"
                maxWidth="2xl"
                px={{ base: 4, md: 8 }}
                py={{ base: 6, md: 8 }}
            >
                <ModalBody>
                    <Flex direction="column" gap={{ base: 0, md: 6 }}>
                        <Heading size="lg" mb={2}>
                            Onze site maakt gebruik van cookies
                        </Heading>
                        <Box mb={2} fontSize={{ base: 'sm', md: 'md' }}>
                            <Text mb={2}>
                                We maken gebruiken van cookies om content en
                                advertenties te personaliseren, om functies voor
                                social media te bieden en om ons websiteverkeer
                                te analyseren.
                            </Text>
                            <Link
                                onClick={openPrivacyPreferences}
                                fontWeight={600}
                            >
                                Voorkeuren
                            </Link>
                        </Box>

                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={{ base: 'flex-start', sm: 'center' }}
                            gap={{ base: 0, sm: 2 }}
                        >
                            <Button
                                variant="secondary"
                                border="2px solid"
                                borderRadius="full"
                                onClick={onDenyAll}
                                size={{ base: 'md', md: 'lg' }}
                                width={{ base: 'full', sm: 'auto' }}
                            >
                                Weigeren
                            </Button>
                            <Button
                                variant="primary"
                                onClick={onAcceptAll}
                                bgColor="#1293FA"
                                borderRadius="full"
                                color="white"
                                size={{ base: 'md', md: 'lg' }}
                                width={{ base: 'full', sm: 'auto' }}
                            >
                                Accepteren
                            </Button>
                        </Stack>
                        <PrivacyPreferences
                            isOpen={privacyPreferencesIsOpen}
                            setIsOpen={setPrivacyPreferencesIsOpen}
                            onAcceptAll={onAcceptAll}
                            onDenyAll={onDenyAll}
                            closePrivacyPreferences={closePrivacyPreferences}
                        />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
