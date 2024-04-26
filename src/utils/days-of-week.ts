enum DaysOfWeek {
    MO = 'Понедельник',
    TU = 'Вторник',
    WE = 'Среда',
    TH = 'Четверг',
    FR = 'Пятница',
    SUT = 'Суббота',
    SUN = 'Воскресенье',
}

export const getDayOfWeek = (day: number) => {
    switch (day) {
        case 1:
            return DaysOfWeek.MO;
        case 2:
            return DaysOfWeek.TU;
        case 3:
            return DaysOfWeek.WE;
        case 4:
            return DaysOfWeek.TH;
        case 5:
            return DaysOfWeek.FR;
        case 6:
            return DaysOfWeek.SUT;
        case 7:
            return DaysOfWeek.SUN;
    }
};