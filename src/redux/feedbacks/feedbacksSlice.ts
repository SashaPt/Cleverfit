import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FeedbackData, FeedbacksState } from '../../types/feedbacks/feedbacks';

const initialState: FeedbacksState = {
    added: {
        message: '',
        rating: 0,
    },
};

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        setAdded: (state, action: PayloadAction<FeedbackData>) => {
            state.added = action.payload;
        },
    },
});

export const { setAdded } = feedbacksSlice.actions;

export const selectAdded = (state: { feedbacks: FeedbacksState }) => state.feedbacks.added;

export default feedbacksSlice.reducer;
