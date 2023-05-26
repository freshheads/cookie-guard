import { FC } from 'react';
import { useCookies } from '../hooks/useCookies';
import { CookieCategory } from '../types/cookies';

// component that shows children or a fallback component based on the cookies that are set

type Props = {
    children: React.ReactNode;
    fallback: React.ReactNode;
    cookieRequirement: CookieCategory;
};

export const NeedsCookie: FC<Props> = ({
    children,
    fallback,
    cookieRequirement,
}) => {
    const { cookieSettings } = useCookies();
    const hasRequiredCookies = !!cookieSettings?.[cookieRequirement];

    return <>{hasRequiredCookies ? children : fallback}</>;
};
