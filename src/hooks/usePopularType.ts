import { useMemo } from 'react';
import { Exercise, TrainingsSuccess } from '../types/calendar/calendar';
import { useAppSelector } from './typed-react-redux-hooks';
import { selectTrainingsList } from '@redux/calendar/calendarSlice';
import { isArrayWithItems } from '@utils/utils';

const getItemSum = (exercises: Exercise[]) => {
    if (isArrayWithItems(exercises)) {
        return [...exercises]
            .map((ex) => ex.approaches * ex.replays * (ex.weight || 1))
            .reduce((pr, cur) => (pr = pr + cur), 0);
    } else {
        return 0;
    }
};

export const getExNames = (items: TrainingsSuccess[]) => {
    const exArr: string[] = [];
    items.forEach((item) => {
        const ex = item.exercises.map((ex) => ex.name);
        exArr.push(...ex);
    });
    return exArr;
};

export const getExCount = (items: TrainingsSuccess[]) => {
    if (isArrayWithItems(items)) {
        const exNames = getExNames(items);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exCount: any = {};
        const exArray: {
            key: string;
            value: number;
        }[] = [];

        for (const elem of exNames) {
            if (exCount[elem] === undefined) {
                exCount[elem] = 1;
            } else {
                exCount[elem]++;
            }
        }

        for (const [key, value] of Object.entries(exCount)) {
            exArray.push({ key, value: value as number });
        }

        return exArray;
    }
    return [];
};

export const getPopularExercise = (array: TrainingsSuccess[], filter: string) => {
    if (!isArrayWithItems(array)) return ({ex: '', value: 0});

        const filtered = filter ? [...array].filter((item) => item.name === filter) : array;

        const popular = getExCount([...filtered]).sort((a, b) => b.value - a.value)[0];
       
        return {ex: popular.key, value: popular.value};
}

export const usePopularType = (array: TrainingsSuccess[]) => {
    const trainingsList = useAppSelector(selectTrainingsList);

    const popularType = useMemo(() => {
        if (isArrayWithItems(array)) {
            const sums = [...array].map((item) => {
                return { name: item.name, sum: getItemSum([...item.exercises]) };
            });
            const popular = [...trainingsList]
                .map((item) => {
                    return {
                        type: item.key,
                        value: [...sums]
                            .filter((sum) => sum.name === item.name)
                            .map((sum) => sum.sum)
                            .reduce((pr, cur) => (pr = pr + cur), 0),
                    };
                })
                .sort((a, b) => b.value - a.value)[0].type;
            return popular;
        }
        return '';
    }, [array, trainingsList]);
    return popularType;
};

export const usePopularTraining = (array: TrainingsSuccess[]) => {
    const trainingsList = useAppSelector(selectTrainingsList);

    const popularTraining = useMemo(() => {
        if (isArrayWithItems(array)) {
            const popular = [...trainingsList]
                .map((item) => {
                    return {
                        type: item.name,
                        value: [...array].filter((i) => i.name === item.name).length,
                    };
                })
                ?.sort((a, b) => b.value - a.value)[0]?.type;
            return popular;
        }
        return '';
    }, [array, trainingsList]);
    return popularTraining;
};

export const usePopularExercise = (array: TrainingsSuccess[], filter: string) => {
    const popularExercise = useMemo(() => {
        return getPopularExercise(array, filter).ex
    }, [array, filter]);
    return popularExercise;
};
