import {
    Button,
    Checkbox,
    Dialog,
    HStack,
    Portal,
    Text,
    VStack,
} from '@chakra-ui/react';
import { CookieCategorySettings, useCookies } from '@freshheads/cookie-guard';
import { FC, useState } from 'react';

type CookieOptions = {
    required: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
};

const toCookieOptions = (
    cookieSettings: CookieCategorySettings
): CookieOptions => ({
    required: cookieSettings?.required ?? true,
    functional: cookieSettings?.functional ?? false,
    analytics: cookieSettings?.analytics ?? false,
    marketing: cookieSettings?.marketing ?? false,
});

const categories: { category: keyof CookieOptions; label: string }[] = [
    { category: 'required', label: 'Noodzakelijke cookies' },
    { category: 'functional', label: 'Functionele cookies' },
    { category: 'analytics', label: 'Analytische cookies' },
    { category: 'marketing', label: 'Marketing cookies' },
];

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
    const [cookieOptions, setCookieOptions] = useState(() =>
        toCookieOptions(cookieSettings)
    );

    // Reset the options when the stored settings change, during render instead of in an effect.
    const [syncedCookieSettings, setSyncedCookieSettings] =
        useState(cookieSettings);
    if (cookieSettings !== syncedCookieSettings) {
        setSyncedCookieSettings(cookieSettings);
        setCookieOptions(toCookieOptions(cookieSettings));
    }

    const onAcceptAll = () => {
        setCookieSettings({
            functional: true,
            analytics: true,
            marketing: true,
        });
        setCookieBannerIsOpen(false);
    };

    const toggle = (category: keyof CookieOptions) =>
        setCookieOptions({
            ...cookieOptions,
            [category]: !cookieOptions[category],
        });

    return (
        <Dialog.Root
            open={cookieBannerIsOpen}
            placement="center"
            size="xl"
            closeOnEscape={false}
            closeOnInteractOutside={false}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Onze site maakt gebruik van cookies
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text mb={4}>
                                Wij gebruiken cookies voor de werking van de
                                website, analyse en verbetering en
                                marketingdoeleinden.
                            </Text>

                            <VStack alignItems="flex-start" mb={4}>
                                {categories.map(({ category, label }) => (
                                    <Checkbox.Root
                                        key={category}
                                        checked={cookieOptions[category]}
                                        disabled={category === 'required'}
                                        onCheckedChange={() => toggle(category)}
                                    >
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>{label}</Checkbox.Label>
                                    </Checkbox.Root>
                                ))}
                            </VStack>

                            <HStack alignItems="center">
                                <Button
                                    flex={1}
                                    variant="subtle"
                                    onClick={() => {
                                        setCookieSettings(cookieOptions);
                                        setCookieBannerIsOpen(false);
                                    }}
                                >
                                    Opslaan
                                </Button>
                                <Button
                                    flex={1}
                                    colorPalette="blue"
                                    onClick={onAcceptAll}
                                >
                                    Alle cookies accepteren
                                </Button>
                            </HStack>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default CookieBannerPrimitive;
