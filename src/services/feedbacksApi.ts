import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../http';

import { RootState } from '@redux/configure-store';
import { FeedbackSuccess, FeedbackData } from '../types/feedbacks/feedbacks';

export const feedbacksApi = createApi({
    reducerPath: 'feedbacksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFeedbacks: builder.query<FeedbackSuccess[], null>({
            query: () => ({
                url: 'feedback',
            }),
        }),
        writeFeedback: builder.mutation<null, FeedbackData>({
            query: (body: { message: string; rating: number }) => {
                return {
                    url: 'feedback',
                    method: 'POST',
                    body,
                    credentials: 'include',
                };
            },
        }),
    }),
});

export const { useLazyGetFeedbacksQuery, useWriteFeedbackMutation } = feedbacksApi;
