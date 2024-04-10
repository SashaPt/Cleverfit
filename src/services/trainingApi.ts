import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../http';

import { RootState } from '@redux/configure-store';
import {
    Invite,
    InviteData,
    InviteSuccess,
    InviteUpdateData,
    TrainingPartner,
} from '../types/training/training';

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
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
        getPartners: builder.query<TrainingPartner[], null>({
            query: () => ({
                url: 'catalogs/training-pals',
            }),
        }),
        getJointUsers: builder.query<TrainingPartner[], string>({
            query: (trainingType) => ({
                url: 'catalogs/user-joint-training-list',
                params: { trainingType },
            }),
        }),
        getInvite: builder.query<Invite[], null>({
            query: () => ({
                url: 'invite',
            }),
        }),
        postInvite: builder.mutation<InviteSuccess, InviteData>({
            query: (body: InviteData) => {
                return {
                    url: 'invite',
                    method: 'POST',
                    body,
                };
            },
        }),
        updateInvite: builder.mutation<InviteSuccess, InviteUpdateData>({
            query: (body: InviteUpdateData) => {
                return {
                    url: 'invite',
                    method: 'PUT',
                    body,
                };
            },
        }),
        deleteInvite: builder.mutation<null, string>({
            query: (inviteId: string) => {
                return {
                    url: `invite/${inviteId}`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});

export const {
    useLazyGetPartnersQuery,
    useLazyGetJointUsersQuery,
    useLazyGetInviteQuery,
    usePostInviteMutation,
    useUpdateInviteMutation,
    useDeleteInviteMutation,
} = trainingApi;
