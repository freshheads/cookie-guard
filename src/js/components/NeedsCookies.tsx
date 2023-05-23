import { FC } from 'react';
import { useCookies } from '../hooks/useCookies';

// component that shows children or a fallback component based on the cookies that are set

type Props = {
    children: React.ReactNode;
    fallback: React.ReactNode;
    cookieRequirement: 'marketing' | 'analytics';
};

export const NeedsCookie: FC<Props> = ({
    children,
    fallback,
    cookieRequirement,
}) => {
    const { cookies } = useCookies();
    const hasRequiredCookies = !!cookies?.[cookieRequirement];

    return <>{hasRequiredCookies ? children : fallback}</>;
};
