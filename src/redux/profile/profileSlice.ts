import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Tariff, User, UserState } from '../../types/profile/profile';

const initialState: UserState = {
    queried: false,
    user: null,
    image: '',
    tariffs: [],
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setIsUserQueried: (state, action: PayloadAction<boolean>) => {
            state.queried = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setTariffsList: (state, action: PayloadAction<Tariff[]>) => {
            state.tariffs = action.payload;
        },
    },
});

export const { setIsUserQueried, setUser, setImage, setTariffsList } = profileSlice.actions;

export const selectIsUserQueried = (state: { profile: UserState }) => state.profile.queried;
export const selectUser = (state: { profile: UserState }) => state.profile.user;
export const selectUserImage = (state: { profile: UserState }) => state.profile.image;
export const selectTariffsList = (state: { profile: UserState }) => state.profile.tariffs;

export default profileSlice.reducer;
