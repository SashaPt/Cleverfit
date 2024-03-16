import { AuthState } from '../../types/auth/auth';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const googleToken = new URLSearchParams(window.location.search).get('accessToken');
if (googleToken) {
    localStorage.setItem('jwtToken', googleToken);
}
const token = localStorage.getItem('jwtToken');
const email = localStorage.getItem('email');

const initialState: AuthState = {
    email: email || '',
    password: '',
    accessToken: token || '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },

        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
});

export const { setAccessToken, setPassword, setEmail } = authSlice.actions;

export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectEmail = (state: { auth: AuthState }) => state.auth.email;
export const selectPassword = (state: { auth: AuthState }) => state.auth.password;
export default authSlice.reducer;
