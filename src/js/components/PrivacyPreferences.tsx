import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    Switch,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { useCookies } from '../hooks/useCookies';

type Props = {
    onClose: () => void;
};

export const PrivacyPreferences: FC<Props> = ({ onClose }) => {
    const { cookieSettings, setCookieSettings } = useCookies();
    const [isOpen, setIsOpen] = useState(cookieSettings === undefined);

    const initialRef = useRef(null);

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
        // setCookieBannerIsOpen(false);
    };

    const onDenyAll = () => {
        setCookieSettings({
            functional: true,
            analytics: false,
            marketing: false,
        });
        setIsOpen(false);
        // setCookieBannerIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {}}
            isCentered
            initialFocusRef={initialRef}
        >
            <ModalOverlay />
            <ModalContent
                borderRadius="none"
                maxWidth="2xl"
                px={{ base: 4, md: 8 }}
                py={{ base: 6, md: 8 }}
            >
                <ModalBody>
                    <ModalCloseButton onClick={onClose} />
                    <Flex direction="column" gap={{ base: 0, md: 4 }}>
                        <Heading size="lg">Privacyvoorkeuren</Heading>
                        <Text mb="xs">
                            Wanneer je websites bezoekt, kunnen zij gegevens in
                            je browser opslaan of ophalen. Dit is vaak
                            noodzakelijk voor de basisfunctionaliteit van de
                            website. De opgeslagen gegevens kunnen worden
                            gebruikt voor marketing, analyse en personalisering
                            van de site, zoals het opslaan van je voorkeuren.
                            Privacy is belangrijk voor ons, dus je hebt de
                            mogelijkheid om bepaalde soorten opslag uit te
                            schakelen die mogelijk niet nodig zijn voor de
                            basiswerking van de website. Het blokkeren van
                            categorieën kan je ervaring op de website
                            beïnvloeden.
                        </Text>

                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={{ base: 'flex-start', sm: 'center' }}
                            gap={{ base: 0, sm: 2 }}
                            mt={{ base: 4, md: 0 }}
                        >
                            <Button
                                variant="secondary"
                                border="2px solid"
                                borderRadius="full"
                                onClick={() => {
                                    onDenyAll();
                                }}
                                size="lg"
                            >
                                Alle cookies weigeren
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    onAcceptAll();
                                }}
                                bgColor="#1293FA"
                                borderRadius="full"
                                color="white"
                                size="lg"
                                ref={initialRef}
                            >
                                Alle cookies toestaan
                            </Button>
                        </Stack>
                        <Heading size="md" mt={4} mb={2}>
                            Toestemming beheren per categorie
                        </Heading>
                        <VStack gap={2} align="flex-start">
                            <Flex direction="column" w="full">
                                <FormControl
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <FormLabel
                                        fontSize="lg"
                                        htmlFor="functional"
                                    >
                                        Functioneel
                                    </FormLabel>
                                    <Text as="b">Altijd actief</Text>
                                </FormControl>

                                <Text mb={2} maxW="85%">
                                    Deze cookies zijn nodig voor de
                                    basisfunctionaliteit van de website.
                                </Text>
                            </Flex>

                            <Flex direction="column" w="full">
                                <FormControl
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <FormLabel
                                        htmlFor="analytics"
                                        fontSize="lg"
                                    >
                                        Analytics
                                    </FormLabel>
                                    <Switch size="lg" id="analytics" />
                                </FormControl>

                                <Text mb={2} maxW="85%">
                                    Deze cookies geven ons inzicht in de
                                    prestaties van de website, hoe bezoekers met
                                    de site omgaan en of er technische problemen
                                    zijn. Bij dit type opslag worden geen
                                    identificeerbare gegevens van bezoekers
                                    verzameld
                                </Text>
                            </Flex>
                            <Flex direction="column" w="full">
                                <FormControl
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <FormLabel
                                        htmlFor="marketing"
                                        fontSize="lg"
                                    >
                                        Marketing
                                    </FormLabel>
                                    <Switch size="lg" id="marketing" />
                                </FormControl>

                                <Text mb={2} maxW="85%">
                                    Deze cookies worden gebruikt om advertenties
                                    aan te bieden die relevanter zijn voor jou
                                    en je interesses. Ze kunnen ook worden
                                    gebruikt om het aantal keren dat je een
                                    advertentie te zien krijgt te beperken en om
                                    de doeltreffendheid van reclamecampagnes te
                                    meten.
                                </Text>
                            </Flex>
                        </VStack>
                        <Flex justifyContent="flex-end" mt={2}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    onAcceptAll();
                                }}
                                bgColor="#1293FA"
                                borderRadius="full"
                                color="white"
                                size="lg"
                            >
                                Voorkeuren opslaan
                            </Button>
                        </Flex>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
