import { useMemo } from 'react';
import { Exercise, TrainingsSuccess } from '../types/calendar/calendar';
import { useAppSelector } from './typed-react-redux-hooks';
import { selectTrainingsList } from '@redux/calendar/calendarSlice';

const getItemSum = (exercises: Exercise[]) => {
    if (exercises.length) {
        return [...exercises]
            .map((ex) => ex.approaches * ex.replays * (ex.weight || 1))
            .reduce((pr, cur) => (pr = pr + cur), 0);
    } else {
        return 0;
    }
};

export const usePopularType = (array: TrainingsSuccess[]) => {
    const trainingsList = useAppSelector(selectTrainingsList);

    const popularType = useMemo(() => {
        if (array.length) {
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
