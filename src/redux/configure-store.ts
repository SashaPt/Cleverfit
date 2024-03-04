import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import authReducer from './auth/authSlice';
import feedbacksReducer from './feedbacks/feedbacksSlice';
import { authApi } from '../services/authApi';
import { feedbacksApi } from '../services/feedbacksApi';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        auth: authReducer,
        feedbacks: feedbacksReducer,
        [authApi.reducerPath]: authApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authApi.middleware)
            .concat(feedbacksApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
