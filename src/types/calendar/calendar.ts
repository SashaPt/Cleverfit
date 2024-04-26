export type CalendarState = {
    queried: boolean;
    pathToNavigate: string;
    response: TrainingsSuccess[];
    trainingsList: TrainingsList[];
    checkedIndexes: number[];
    currentTraining: string;
    exercises: Exercise[];
    selected: string;
    editedTraining: TrainingsSuccess | null;
    editedExercise: Exercise | null;
    modalTop: string;
    modalLeft: string;
    isMobile: boolean;
    calendarAction: CalendarAction;
};

export type CalendarAction = 'toAdd' | 'toEdit' | 'toLook' | 'toInvite';

export type Exercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
    _id?: string;
};

export type Parameters = {
    repeat?: boolean;
    period?: number | null;
    jointTraining?: boolean;
    participants?: string[];
};

export type TrainingsSuccess = {
    _id: string;
    name: string;
    date: string | number;
    isImplementation: boolean;
    userId: string;
    exercises: Exercise[];
    parameters?: Parameters;
};

export type TrainingsList = {
    name: string;
    key: string;
};

export type TrainingData = {
    name: string;
    date: string;
    exercises: Exercise[];
    isImplementation?: boolean;
    parameters?: Parameters;
};
