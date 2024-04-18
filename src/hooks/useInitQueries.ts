import {
    selectIsUserQueried,
    setImage,
    setIsUserQueried,
    setUser,
} from '@redux/profile/profileSlice';
import {
    selectIsMyInvitesQueried,
    selectIsPartnersQueried,
    setIsMyInvitesQueried,
    setIsPartnersQueried,
    setMyInvites,
    setPartners,
} from '@redux/training/trainingSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetUserQuery } from '../services/profileApi';
import { useLazyGetInviteQuery, useLazyGetPartnersQuery } from '../services/trainingApi';
import { useAppSelector } from './typed-react-redux-hooks';

export const useInitQueries = () => {
    const [getUser] = useLazyGetUserQuery();
    const [getInvitation] = useLazyGetInviteQuery();
    const [getPartners] = useLazyGetPartnersQuery();
    const isUserQueried = useAppSelector(selectIsUserQueried);
    const isMyInvitesQueried = useAppSelector(selectIsMyInvitesQueried);
    const isPartnersQueried = useAppSelector(selectIsPartnersQueried);
    const dispatch = useDispatch();

    const queryUser = async () => {
        try {
            const resp = await getUser(null).unwrap();
            dispatch(setUser(resp));
            dispatch(setImage(resp.imgSrc || ''));
        } catch (error) {
            return;
        } finally {
            setIsUserQueried(false);
        }
    };

    const queryInvitations = async () => {
        try {
            const resp = await getInvitation(null).unwrap();
            dispatch(setMyInvites(resp));
        } catch (error) {
            return;
        } finally {
            dispatch(setIsMyInvitesQueried(false));
        }
    };

    const queryPartners = async () => {
        try {
            const resp = await getPartners(null).unwrap();
            dispatch(setPartners(resp));
        } catch (error) {
            return;
        } finally {
            dispatch(setIsPartnersQueried(false));
        }
    };

    useEffect(() => {
        dispatch(setIsUserQueried(true));
        dispatch(setIsMyInvitesQueried(true));
        dispatch(setIsPartnersQueried(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isUserQueried) {
            setTimeout(() => queryUser(), 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserQueried]);

    useEffect(() => {
        if (isMyInvitesQueried) {
            queryInvitations();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMyInvitesQueried]);

    useEffect(() => {
        if (isPartnersQueried) {
            queryPartners();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPartnersQueried]);
};
