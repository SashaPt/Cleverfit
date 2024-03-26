export type UserState = {
    queried: boolean;
    user: User | null;
    image: string;
    tariffs: Tariff[];
};
export type User = {
    email: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    tariff?: {
        tariffId?: string;
        expired?: string;
    };
};

export type UserData = {
    email: string;
    firstName: string;
    lastName: string;
    imgSrc: string;
    birthday?: string;
    password?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};

export type UploadSuccess = {
    name: string;
    url: string;
};

export type Tariff = {
    _id: string;
    name: string;
    periods: [
        {
            text: string;
            cost: number;
            days: number;
        },
    ];
};

export type TariffData = {
    tariffId: string;
    days: number;
};
