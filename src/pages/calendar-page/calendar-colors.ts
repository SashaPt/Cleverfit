export enum CalendarColors {
    RED = '#ff4d4f',
    YELLOW = '#fadb14',
    BLUE = '#13c2c2',
    GREEN = '#52c41a',
    ORANGE = '#fa8c16',
}

export const getColor = (name: string) => {
    switch (name) {
        case 'Ноги':
            return CalendarColors.RED;
        case 'Силовая':
            return CalendarColors.YELLOW;
        case 'Руки':
            return CalendarColors.BLUE;
        case 'Грудь':
            return CalendarColors.GREEN;
        case 'Спина':
            return CalendarColors.ORANGE;
    }
};
