import { useMemo } from 'react';

const addZero = (val: number) => {
    if (val < 10) {
        return `0${val}`;
    } else {
        return `${val}`;
    }
};

export const useDateFormat = (date: Date) => {
    const formated = useMemo(() => {
        if (date) {
            return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(
                date.getUTCFullYear(),
            )}`;
        }
        return '';
    }, [date]);
    return formated;
};
