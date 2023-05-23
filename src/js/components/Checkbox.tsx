import { FC } from 'react';

export const Checkbox: FC<{
    label: string;
    value: boolean;
    name: string;
    onChange?: () => void;
    disabled?: boolean;
}> = ({ label, name, value, onChange, disabled }) => {
    return (
        <label htmlFor={name} className="cookieguard__checkbox-label">
            <input
                id={name}
                className="cookieguard__checkbox"
                type="checkbox"
                name={name}
                checked={value}
                onChange={onChange}
                disabled={disabled}
            />
            {label}
        </label>
    );
};
