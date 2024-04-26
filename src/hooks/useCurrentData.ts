import { useMemo } from 'react';
import type { Moment } from 'moment';
import { TrainingsSuccess } from '../types/calendar/calendar';
import moment from 'moment';
import { isArrayWithItems } from '@utils/utils';

const getCurrentData = (date: Moment | null, data: TrainingsSuccess[]) => {
    if (isArrayWithItems(data) && date) {
        return [...data].filter((item) => {
            return typeof item.date === 'string'
                ? date.date() === moment(new Date(Date.parse(item.date))).date() &&
                      date.month() === moment(new Date(Date.parse(item.date))).month() &&
                      date.year() === moment(new Date(Date.parse(item.date))).year()
                : date.date() === moment(item.date).date() &&
                      date.month() === moment(item.date).month() &&
                      date.year() === moment(item.date).year();
        });
    }
    return data;
};

export const useCurrentTrainings = (date: Moment | null, data: TrainingsSuccess[]) => {
    const current = useMemo(() => {
        return getCurrentData(date, data);
    }, [data, date]);
    return current;
};

export const useCurrentTrainingsNames = (date: Moment | null, data: TrainingsSuccess[]) => {
    const current = useCurrentTrainings(date, data);

    const trainings = new Set<string>();
    current.forEach((item) => {
        trainings.add(item.name);
    });

    return trainings;
};

export const useCurrentExercises = (
    date: Moment | null,
    data: TrainingsSuccess[],
    training: string,
) => {
    const exercises = useMemo(() => {
        if (training) {
            const current = getCurrentData(date, data);
            return [...current].filter((item) => item.name === training)?.[0]?.exercises || [];
        }
        return [];
    }, [data, date, training]);
    return exercises;
};
