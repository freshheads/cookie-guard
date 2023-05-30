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
import { FaCookieBite } from 'react-icons/fa';

export const CenteredBanner: FC = () => {
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
        setIsOpen(false);
        // setCookieBannerIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={() => {}} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="xl" maxWidth="3xl" p={8}>
                <ModalBody>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        gap={{ base: 0, md: 6 }}
                    >
                        <Heading size="xl">
                            Onze site maakt gebruik van cookies
                        </Heading>
                        <Box
                            maxW="sm"
                            mb={2}
                            fontSize={{ base: 'sm', md: 'md' }}
                        >
                            <Text mb={2}>
                                We maken gebruiken van cookies om content en
                                advertenties te personaliseren, om functies voor
                                social media te bieden en om ons websiteverkeer
                                te analyseren.
                            </Text>
                            <Link href="#" fontWeight={600}>
                                Meer informatie
                            </Link>
                        </Box>

                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={{ base: 'flex-start', sm: 'center' }}
                        >
                            <Button
                                variant="secondary"
                                border="2px solid #1293FA"
                                borderRadius="full"
                                color="#1293FA"
                                mr={2}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                size={{ base: 'sm', md: 'md' }}
                            >
                                Weigeren
                            </Button>
                            <Button
                                variant="primary"
                                onClick={onAccept}
                                bgColor="#1293FA"
                                borderRadius="full"
                                color="white"
                                size={{ base: 'sm', md: 'md' }}
                            >
                                Accepteren
                            </Button>
                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
