import { useMemo } from 'react';

export const getFormated = (name: string) => {
    switch (name) {
        case 'Ноги':
            return '[тренировок на ноги]';
        case 'Силовая':
            return '[силовых тренировок]';
        case 'Руки':
            return '[тренировок на руки]';
        case 'Грудь':
            return '[тренировок на грудь]';
        case 'Спина':
            return '[тренировок на спину]';
    }
};

export const useTrainingName = (trainingName: string) => {
    const formated = useMemo(() => {
        if (trainingName) {
            return getFormated(trainingName);
        }
        return '';
    }, [trainingName]);
    return formated;
};
