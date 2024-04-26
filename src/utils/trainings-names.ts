export const getTrainingName = (name: string) => {
    switch (name) {
        case 'Ноги':
            return 'на ноги';
        case 'Силовая':
            return 'силовой';
        case 'Руки':
            return 'на руки';
        case 'Грудь':
            return 'на грудь';
        case 'Спина':
            return 'на спину';
        default:
            return '';
    }
};
