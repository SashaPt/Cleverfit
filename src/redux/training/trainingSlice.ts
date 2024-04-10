import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Invite, TrainingPartner, TrainingState } from '../../types/training/training';

const initialState: TrainingState = {
    isPartnersQueried: false,
    partners: [],
    isJointUsersQueried: false,
    jointQueriedType: 'rand',
    jointUsers: [],
    jointUsersAll: [],
    inviteUser: null,
    isMyInvitesQueried: false,
    myInvites: [],
};

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setIsPartnersQueried: (state, action: PayloadAction<boolean>) => {
            state.isPartnersQueried = action.payload;
        },
        setPartners: (state, action: PayloadAction<TrainingPartner[]>) => {
            state.partners = action.payload;
        },
        setIsJointUsersQueried: (state, action: PayloadAction<boolean>) => {
            state.isJointUsersQueried = action.payload;
        },
        setJointQueriedType: (state, action: PayloadAction<'rand' | 'my'>) => {
            state.jointQueriedType = action.payload;
        },
        setJointUsers: (state, action: PayloadAction<TrainingPartner[]>) => {
            state.jointUsers = action.payload;
        },
        setJointUsersAll: (state, action: PayloadAction<TrainingPartner[]>) => {
            state.jointUsersAll = action.payload;
        },
        setInviteUser: (state, action: PayloadAction<TrainingPartner | null>) => {
            state.inviteUser = action.payload;
        },
        setIsMyInvitesQueried: (state, action: PayloadAction<boolean>) => {
            state.isMyInvitesQueried = action.payload;
        },
        setMyInvites: (state, action: PayloadAction<Invite[]>) => {
            state.myInvites = action.payload;
        },
    },
});

export const {
    setIsPartnersQueried,
    setPartners,
    setIsJointUsersQueried,
    setJointQueriedType,
    setJointUsers,
    setJointUsersAll,
    setInviteUser,
    setIsMyInvitesQueried,
    setMyInvites,
} = trainingSlice.actions;

export const selectIsPartnersQueried = (state: { training: TrainingState }) =>
    state.training.isPartnersQueried;
export const selectPartners = (state: { training: TrainingState }) => state.training.partners;
export const selectIsJointUsersQueried = (state: { training: TrainingState }) =>
    state.training.isJointUsersQueried;
export const selectJointQueriedType = (state: { training: TrainingState }) =>
    state.training.jointQueriedType;
export const selectJointUsers = (state: { training: TrainingState }) => state.training.jointUsers;
export const selectJointUsersAll = (state: { training: TrainingState }) =>
    state.training.jointUsersAll;
export const selectInviteUser = (state: { training: TrainingState }) => state.training.inviteUser;
export const selectIsMyInvitesQueried = (state: { training: TrainingState }) =>
    state.training.isMyInvitesQueried;
export const selectMyInvites = (state: { training: TrainingState }) => state.training.myInvites;

export default trainingSlice.reducer;
