export type FeedbacksState = {
    added: FeedbackData;
};
export type FeedbackData = {
    message: string;
    rating: number;
};

export type FeedbackSuccess = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

export type FeedbackEroor = {
    status: number;
    data: {
        statusCode: number;
        error: string;
        message: string;
    };
};
