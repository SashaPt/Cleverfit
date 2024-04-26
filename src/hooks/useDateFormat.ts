import { DATE_FORMAT, DM_FORMAT } from '@constants/constants';
import { useMemo } from 'react';

const addZero = (val: number) => {
    if (val < 10) {
        return `0${val}`;
    } else {
        return `${val}`;
    }
};

export const useDateFormat = (date: Date | null, format?: string) => {
    const formated = useMemo(() => {
        if (date) {
            if (!format || format === DATE_FORMAT) {
                return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(
                    date.getUTCFullYear(),
                )}`;
            } else if (format == DM_FORMAT) {
                return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}`;
            }
        }
        return '';
    }, [date, format]);
    return formated;
};
