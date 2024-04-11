import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../http';

import { RootState } from '@redux/configure-store';
import { TrainingData, TrainingsList, TrainingsSuccess } from '../types/calendar/calendar';

export const calendarApi = createApi({
    reducerPath: 'calendarApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token : string = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserTrainings: builder.query<TrainingsSuccess[], null>({
            query: () => ({
                url: 'training',
            }),
        }),
        getTrainingsList: builder.query<TrainingsList[], null>({
            query: () => ({
                url: 'catalogs/training-list',
            }),
        }),
        createTraining: builder.mutation<TrainingsSuccess, TrainingData>({
            query: (body: TrainingData) => {
                return {
                    url: 'training',
                    method: 'POST',
                    body,
                };
            },
        }),
        updateTraining: builder.mutation<TrainingsSuccess, { body: TrainingData; id: string }>({
            query: (arg: { body: TrainingData; id: string }) => {
                return {
                    url: `training/${arg.id}`,
                    method: 'PUT',
                    body: arg.body,
                };
            },
        }),
        deleteTraining: builder.mutation<null, string>({
            query: (id: string) => {
                return {
                    url: `training/${id}`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});

export const {
    useLazyGetUserTrainingsQuery,
    useLazyGetTrainingsListQuery,
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
    useDeleteTrainingMutation,
} = calendarApi;
