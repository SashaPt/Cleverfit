import { getDate, isArrayWithItems } from '@utils/utils';
import { Exercise, TrainingsSuccess } from '../types/calendar/calendar';
import moment, { Moment } from 'moment';
import { useMemo } from 'react';
import { StatisticsData } from '../types/achievements/achievements';
import { getPopularExercise } from './usePopularType';

const getDateInterval = (period: string) => {
    const firstDay =
        period === 'week' ? moment().subtract(6, 'days') : moment().subtract(27, 'days');
    const firstMonday = firstDay.clone().startOf('isoWeek');
    const startDay =
        period === 'week'
            ? firstDay
            : firstMonday.isBefore(firstDay, 'days')
            ? firstMonday.clone().add(1, 'weeks')
            : firstMonday;
    const daysNumber = period === 'week' ? 7 : 28;
    const daysArr = [];

    for (let i = 0; i < daysNumber; i++) {
        daysArr.push(startDay.clone().add(i, 'days'));
    }
    return daysArr;
};

const getWeightSum = (exercises: Exercise[]) => {
    if (isArrayWithItems(exercises)) {
        return [...exercises]
            .map((ex) => ex.approaches * ex.replays * ex.weight)
            .reduce((pr, cur) => (pr = pr + cur), 0);
    }
    return 0;
};

const getReplaysNumber = (exercises: Exercise[]) => {
    if (isArrayWithItems(exercises)) {
        return [...exercises].reduce((pr, cur) => (pr += cur.replays), 0);
    }
    return 0;
};

const getApproachesNumber = (exercises: Exercise[]) => {
    if (isArrayWithItems(exercises)) {
        return [...exercises].reduce((pr, cur) => (pr += cur.approaches), 0);
    }
    return 0;
};

const checkIsNotEmpty = (data: TrainingsSuccess[]) => {
    if (!isArrayWithItems(data)) {
        return false;
    }
    const clearedFromEmpty = [...data].filter(
        (item) =>
            getWeightSum(item.exercises) ||
            getReplaysNumber(item.exercises) ||
            getApproachesNumber(item.exercises),
    );
    if (isArrayWithItems(clearedFromEmpty)) {
        return true;
    } else {
        return false;
    }
};

const sumData = (data: TrainingsSuccess[]) => {
    return [...data].reduce(
        (pr, cur) => ({
            ...pr,
            weight: pr.weight + getWeightSum(cur.exercises),
            replays: pr.replays + getReplaysNumber(cur.exercises),
            approaches: pr.approaches + getApproachesNumber(cur.exercises),
            exercises: pr.exercises + cur.exercises.length,
        }),
        {
            weight: 0,
            replays: 0,
            approaches: 0,
            exercises: 0,
        },
    );
};

const sumStaticticData = (data: StatisticsData[]) => {
    return [...data].reduce(
        (pr, cur) => ({
            ...pr,
            date: (pr.date = cur.date),
            weight: pr.weight + cur.weight,
            replays: pr.replays + cur.replays,
            approaches: pr.approaches + cur.approaches,
            exercises: pr.exercises + cur.exercises,
        }),
        {
            date: moment(),
            weight: 0,
            replays: 0,
            approaches: 0,
            exercises: 0,
        },
    );
};

const getPeriodData = (data: TrainingsSuccess[], daysArr: Moment[]) => {
    if (!checkIsNotEmpty(data)) return [];
    const periodData = [...daysArr].map((day) => {
        const currentItems = [...data].filter((item) =>
            moment(getDate(item.date)).isSame(day, 'days'),
        );
        const todayInfo = sumData([...currentItems]);
        return { date: day, ...todayInfo, currentItems };
    });
    return periodData;
};

export const usePeriodData = (data: TrainingsSuccess[], period: string) => {
    const periodData = useMemo(() => {
        if (isArrayWithItems(data)) {
            const days = getDateInterval(period);
            const periodDataArr = getPeriodData(data, days);
            return periodDataArr;
        }
        return [];
    }, [data, period]);
    return periodData;
};

export const useWeekDaysData = (data: StatisticsData[]) => {
    const weekDaysData = useMemo(() => {
        if (isArrayWithItems(data)) {
            const newArr: StatisticsData[] = [];
            const daysOfWeek = new Set<number>();

            [...data].forEach((item) => {
                daysOfWeek.add(item.date.isoWeekday());
            });

            Array.from(daysOfWeek).forEach((day) => {
                const currentItems: TrainingsSuccess[] = [];
                [...data]
                    .filter((item) => item.date.isoWeekday() == day)
                    .forEach((i) => currentItems.push(...i.currentItems));

                const summedInfo = sumStaticticData(
                    [...data].filter((item) => item.date.isoWeekday() === day),
                );
                newArr.push({ ...summedInfo, currentItems });
            });
            return newArr;
        }
        return [];
    }, [data]);
    return weekDaysData;
};

export const useConcatData = (data: StatisticsData[]) => {
    const concatData = useMemo(() => {
        if (!isArrayWithItems(data)) return [];
        const exData = [...data].map((i) => getPopularExercise(i.currentItems, ''));
        const unicData = new Set();
        exData.forEach((item) => unicData.add(item.ex));
        const dataArr = [
            ...Array.from(unicData).map((ex) => {
                const value = [...exData].filter((item) => item.ex === ex).length;
                return { ex, value };
            }),
        ].filter((item) => item.ex);
        return dataArr;
    }, [data]);
    return concatData;
};
