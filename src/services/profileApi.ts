import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../http';

import { RootState } from '@redux/configure-store';
import { Tariff, TariffData, UploadSuccess, User, UserData } from '../types/profile/profile';

export const profileApi = createApi({
    reducerPath: 'profileApi',
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
        getUser: builder.query<User, null>({
            query: () => ({
                url: 'user/me',
            }),
        }),
        upload: builder.mutation<UploadSuccess, FormData>({
            query: (body: FormData) => {
                return {
                    url: 'upload-image',
                    method: 'POST',
                    body,
                };
            },
        }),
        updateUser: builder.mutation<User, UserData>({
            query: (body: UserData) => {
                return {
                    url: 'user',
                    method: 'PUT',
                    body,
                };
            },
        }),
        getTariffs: builder.query<Tariff[], null>({
            query: () => ({
                url: 'catalogs/tariff-list',
            }),
        }),
        changeTariff: builder.mutation<null, TariffData>({
            query: (body: TariffData) => {
                return {
                    url: 'tariff',
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const {
    useLazyGetUserQuery,
    useUploadMutation,
    useUpdateUserMutation,
    useLazyGetTariffsQuery,
    useChangeTariffMutation,
} = profileApi;
