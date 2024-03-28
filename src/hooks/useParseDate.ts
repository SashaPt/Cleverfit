import { useMemo } from 'react';

export const useParseDate = (date: string) => {
    const parsed = useMemo(() => {
        if (date) {
            return new Date(Date.parse(date));
        }
        return null;
    }, [date]);
    return parsed;
};
