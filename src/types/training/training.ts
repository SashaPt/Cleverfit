import { TrainingsSuccess } from '../../types/calendar/calendar';

export type TrainingState = {
    isPartnersQueried: boolean;
    partners: TrainingPartner[];
    isJointUsersQueried: boolean;
    jointQueriedType: 'rand' | 'my';
    jointUsers: TrainingPartner[];
    jointUsersAll: TrainingPartner[];
    inviteUser: TrainingPartner | null;
    isMyInvitesQueried: boolean;
    myInvites: Invite[];
};

export type TrainingPartner = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string;
    status: string;
};

export type Invite = {
    _id: string;
    from: {
        _id: string;
        firstName: string | null;
        lastName: string | null;
        imageSrc: string | null;
    };
    training: TrainingsSuccess;
    status: string;
    createdAt: string | number;
};

export type InviteData = {
    to: string;
    trainingId: string;
};

export type InviteUpdateData = {
    id: string;
    status: string;
};

export type InviteSuccess = {
    _id: string;
    from: {
        _id: string;
        firstName: string | null;
        lastName: string | null;
        imageSrc: string | null;
    };
    training: TrainingsSuccess;
    status: string;
    createdAt: string;
    to: {
        _id: string;
        firstName: string | null;
        lastName: string | null;
        imageSrc: string | null;
    };
};
