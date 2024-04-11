import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    CalendarAction,
    CalendarState,
    Exercise,
    TrainingsList,
    TrainingsSuccess,
} from '../../types/calendar/calendar';

const initialState: CalendarState = {
    queried: false,
    pathToNavigate: '',
    response: [],
    trainingsList: [],
    checkedIndexes: [],
    currentTraining: '',
    exercises: [],
    selected: 'Выбор типа тренировки',
    editedTraining: null,
    editedExercise: null,
    modalTop: '',
    modalLeft: '',
    isMobile: false,
    calendarAction: 'toAdd',
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setIsCalendarQueried: (state, action: PayloadAction<boolean>) => {
            state.queried = action.payload;
        },
        setPathToNavigate: (state, action: PayloadAction<string>) => {
            state.pathToNavigate = action.payload;
        },
        setCalendarResponse: (state, action: PayloadAction<TrainingsSuccess[]>) => {
            state.response = action.payload;
        },
        setTrainingsList: (state, action: PayloadAction<TrainingsList[]>) => {
            state.trainingsList = action.payload;
        },
        setCheckedIndexes: (state, action: PayloadAction<number[]>) => {
            state.checkedIndexes = action.payload;
        },
        setCurrentTraining: (state, action: PayloadAction<string>) => {
            state.currentTraining = action.payload;
        },
        setSelected: (state, action: PayloadAction<string>) => {
            state.selected = action.payload;
        },
        setEditedTraining: (state, action: PayloadAction<TrainingsSuccess | null>) => {
            state.editedTraining = action.payload;
        },
        setEditedExercise: (state, action: PayloadAction<Exercise | null>) => {
            state.editedExercise = action.payload;
        },
        setModalTop: (state, action: PayloadAction<string>) => {
            state.modalTop = action.payload;
        },
        setModalLeft: (state, action: PayloadAction<string>) => {
            state.modalLeft = action.payload;
        },
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },
        setCalendarAction: (state, action: PayloadAction<CalendarAction>) => {
            state.calendarAction = action.payload;
        },
        setExercises: (state, action: PayloadAction<Exercise[]>) => {
            state.exercises = action.payload;
        },
    },
});

export const {
    setIsCalendarQueried,
    setPathToNavigate,
    setCalendarResponse,
    setTrainingsList,
    setCheckedIndexes,
    setCurrentTraining,
    setSelected,
    setEditedTraining,
    setEditedExercise,
    setModalTop,
    setModalLeft,
    setIsMobile,
    setCalendarAction,
    setExercises,
} = calendarSlice.actions;

export const selectIsCalendarQueried = (state: { calendar: CalendarState }) =>
    state.calendar.queried;
    export const selectPathToNavigate = (state: { calendar: CalendarState }) =>
    state.calendar.pathToNavigate;
export const selectCalendarResponse = (state: { calendar: CalendarState }) =>
    state.calendar.response;
export const selectTrainingsList = (state: { calendar: CalendarState }) =>
    state.calendar.trainingsList;
export const selectCheckedIndexes = (state: { calendar: CalendarState }) =>
    state.calendar.checkedIndexes;
export const selectCurrentTraining = (state: { calendar: CalendarState }) =>
    state.calendar.currentTraining;
export const selectSelected = (state: { calendar: CalendarState }) => state.calendar.selected;
export const selectEditedTraining = (state: { calendar: CalendarState }) =>
    state.calendar.editedTraining;
export const selectEditedExercise = (state: { calendar: CalendarState }) =>
    state.calendar.editedExercise;
export const selectModalTop = (state: { calendar: CalendarState }) => state.calendar.modalTop;
export const selectModalLeft = (state: { calendar: CalendarState }) => state.calendar.modalLeft;
export const selectIsMobile = (state: { calendar: CalendarState }) => state.calendar.isMobile;
export const selectCalendarAction = (state: { calendar: CalendarState }) =>
    state.calendar.calendarAction;
export const selectExercises = (state: { calendar: CalendarState }) => state.calendar.exercises;

export default calendarSlice.reducer;
