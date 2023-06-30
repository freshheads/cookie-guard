import {
    Box,
    Button,
    Flex,
    Heading,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useCookies } from '../../hooks/useCookies';

export const WideBottomBanner: FC = () => {
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
        <Modal
            isOpen={isOpen}
            onClose={() => {}}
            isCentered={false}
            autoFocus={false}
        >
            <ModalOverlay />
            <ModalContent
                color="white"
                borderRadius="none"
                maxWidth="full"
                containerProps={{
                    alignItems: 'flex-end',
                }}
                display="flex"
                justifyContent="center"
                bgColor="#003459"
                p={8}
                m={0}
            >
                <Flex justifyContent="center">
                    <ModalBody p={0} maxW="2xl">
                        <Heading size="lg" mb={2}>
                            Cookies
                        </Heading>
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            gap={{ base: 0, md: 6 }}
                        >
                            <Flex>
                                <Box
                                    maxW="sm"
                                    mb={{ base: 4, md: 0 }}
                                    fontSize={{ base: 'sm', md: 'md' }}
                                >
                                    <Text mb={2}>
                                        Onze site gebruikt cookies om jou de
                                        beste ervaring te geven op onze website.
                                    </Text>
                                    <Link href="#" fontWeight={600}>
                                        Meer info
                                    </Link>
                                </Box>
                            </Flex>
                            <Stack direction={{ base: 'column', sm: 'row' }}>
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
                </Flex>
            </ModalContent>
        </Modal>
    );
};
