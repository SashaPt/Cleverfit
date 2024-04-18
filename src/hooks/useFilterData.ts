import { isArrayWithItems } from '@utils/utils';
import { TrainingsSuccess } from '../types/calendar/calendar';
import { useMemo } from 'react';

export const useFilterData = (data: TrainingsSuccess[], filter?: string) => {
    const filterData = useMemo(() => {
        if (!filter) return data;
        if (isArrayWithItems(data)) {
            return [...data].filter((item) => item.name === filter);
        }
        return [];
    }, [data, filter]);
    return filterData;
};
