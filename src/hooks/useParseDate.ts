import { useMemo } from 'react';

export const useParseDate = (date: string | number) => {
    const parsed = useMemo(() => {
        if (date && typeof date === 'string') {
            return new Date(Date.parse(date));
        }
        if (date && typeof date === 'number') {
            return new Date(date);
        }
        return null;
    }, [date]);
    return parsed;
};
