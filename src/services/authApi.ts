import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../http';
import {
    LoginSuccess,
    LoginData,
    RegistrationData,
    CheckEmailData,
    CheckEmailSuccess,
    ConfirmEmailData,
    ConfirmEmailSuccess,
    ChangePasswordData,
    ChangePasswordSuccess,
} from '../types/auth/auth';
import { RootState } from '@redux/configure-store';

export const authApi = createApi({
    reducerPath: 'authApi',
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
        login: builder.mutation<LoginSuccess, LoginData>({
            query: (body: { email: string; password: string }) => {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body,
                };
            },
        }),
        register: builder.mutation<null, RegistrationData>({
            query: (body: { email: string; password: string }) => {
                return {
                    url: 'auth/registration',
                    method: 'POST',
                    body,
                };
            },
        }),
        checkEmail: builder.mutation<CheckEmailSuccess, CheckEmailData>({
            query: (body: CheckEmailData) => {
                return {
                    url: 'auth/check-email',
                    method: 'POST',
                    body,
                };
            },
        }),

        confirmEmail: builder.mutation<ConfirmEmailSuccess, ConfirmEmailData>({
            query: (body: ConfirmEmailData) => {
                return {
                    url: 'auth/confirm-email',
                    method: 'POST',
                    body,
                    credentials: 'include',
                };
            },
        }),
        changePassword: builder.mutation<ChangePasswordSuccess, ChangePasswordData>({
            query: (body: ChangePasswordData) => {
                return {
                    url: 'auth/change-password',
                    method: 'POST',
                    body,
                    credentials: 'include',
                };
            },
        }),
        googleAuth: builder.query({
            query: () => ({
                url: 'auth/google',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
    useLazyGoogleAuthQuery,
} = authApi;
