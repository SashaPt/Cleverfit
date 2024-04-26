import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import authReducer from './auth/authSlice';
import feedbacksReducer from './feedbacks/feedbacksSlice';
import calendarReducer from './calendar/calendarSlice';
import profileReducer from './profile/profileSlice';
import trainingReducer from './training/trainingSlice';
import { authApi } from '../services/authApi';
import { feedbacksApi } from '../services/feedbacksApi';
import { calendarApi } from '../services/calendarApi';
import { profileApi } from '../services/profileApi';
import { trainingApi } from '../services/trainingApi';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        auth: authReducer,
        feedbacks: feedbacksReducer,
        calendar: calendarReducer,
        profile: profileReducer,
        training: trainingReducer,
        [authApi.reducerPath]: authApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
        [calendarApi.reducerPath]: calendarApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [trainingApi.reducerPath]: trainingApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authApi.middleware)
            .concat(feedbacksApi.middleware)
            .concat(calendarApi.middleware)
            .concat(profileApi.middleware)
            .concat(trainingApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
