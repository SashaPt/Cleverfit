import { useMemo } from 'react';

type SelectOption = {
    value: number;
    label: string;
};

const repeatSelectOptions = [
    { value: 1, label: 'Через 1 день' },
    { value: 2, label: 'Через 2 дня' },
    { value: 3, label: 'Через 3 дня' },
    { value: 4, label: 'Через 4 дня' },
    { value: 5, label: 'Через 5 дней' },
    { value: 6, label: 'Через 6 дней' },
    { value: 7, label: '1 раз в неделю' },
];

export const useSelectOptions = (value: number, options?: SelectOption[]) => {
    const label = useMemo(() => {
        if (!value) return value;
        if (options?.length) {
            return [...options].filter((options) => options.value === value)?.[0]?.label || value;
        }
        return (
            [...repeatSelectOptions].filter((options) => options.value === value)?.[0]?.label ||
            value
        );
    }, [options, value]);
    return label;
};
