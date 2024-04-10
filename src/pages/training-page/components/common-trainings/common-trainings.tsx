import './common-trainings.scss';
import React, { useEffect, useState } from 'react';
import { CommonTrainingsBanner } from '../common-trainings-banner/common-trainings-banner';
import { CommonPartners } from '../common-partners/common-partners';
import { TrainingsErrorModal } from '@pages/calendar-page/components/trainigs-error-modal/trainigs-error-modal';
import { useLazyGetJointUsersQuery } from '../../../../services/trainingApi';
import { useDispatch } from 'react-redux';
import {
    selectJointQueriedType,
    selectIsJointUsersQueried,
    setIsJointUsersQueried,
    setJointUsers,
    selectPartners,
    setJointUsersAll,
} from '@redux/training/trainingSlice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Loader } from '@components/loader/loader';
import { SearchPartners } from '../search-partners/search-partners';
import { usePopularType } from '@hooks/usePopularType';
import { selectCalendarResponse } from '@redux/calendar/calendarSlice';
import { Invitations } from '../invitations/invitations';
import { PARTNERS_LIMIT } from '@constants/constants';

export const CommonTrainings: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [getJointUsers, { isLoading }] = useLazyGetJointUsersQuery();
    const isJointUsersQueried = useAppSelector(selectIsJointUsersQueried);
    const jointQueriedType = useAppSelector(selectJointQueriedType);
    const userTrainings = useAppSelector(selectCalendarResponse);
    const partners = useAppSelector(selectPartners);
    const dispatch = useDispatch();

    const popular = usePopularType(userTrainings);

    const queryJointUsers = async () => {
        const myType = jointQueriedType === 'my';

        try {
            const resp = await getJointUsers(myType ? popular : '').unwrap();
            dispatch(setJointUsers(resp));
            if (!myType) dispatch(setJointUsersAll(resp));
            setIsSearch(true);
        } catch (error) {
            setIsErrorModalOpen(true);
        } finally {
            dispatch(setIsJointUsersQueried(false));
        }
    };

    useEffect(() => {
        if (isJointUsersQueried) {
            queryJointUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isJointUsersQueried]);

    return (
        <>
            {isLoading && <Loader />}
            {!isSearch ? (
                <div className='common-trainings'>
                    {partners.length < PARTNERS_LIMIT && <Invitations />}
                    {partners.length < PARTNERS_LIMIT && <CommonTrainingsBanner />}
                    <CommonPartners />
                    <TrainingsErrorModal
                        modalProps={{
                            isOpen: isErrorModalOpen,
                            onCloseClick: () => setIsErrorModalOpen(false),
                        }}
                        onRefreshClick={() => {
                            setIsErrorModalOpen(false);
                            dispatch(setIsJointUsersQueried(true));
                        }}
                    ></TrainingsErrorModal>
                </div>
            ) : (
                <div className='common-trainings-search'>
                    <SearchPartners
                        onBackClick={() => setIsSearch(false)}
                        onCreateClick={onCreateClick}
                    />
                </div>
            )}
        </>
    );
};
