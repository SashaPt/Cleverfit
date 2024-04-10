import './invitation-card.scss';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Invite } from '../../../../types/training/training';
import { useDateFormat } from '@hooks/useDateFormat';
import { useParseDate } from '@hooks/useParseDate';
import { useUpdateInviteMutation } from '../../../../services/trainingApi';
import { Loader } from '@components/loader/loader';
import { useDispatch } from 'react-redux';
import { selectMyInvites, setIsPartnersQueried, setMyInvites } from '@redux/training/trainingSlice';
import { setModalLeft, setModalTop } from '@redux/calendar/calendarSlice';
import { useTrainingName } from '@hooks/useTrainingName';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const InvitationCard: React.FC<{
    invite: Invite;
    onShowInfoClick: () => void;
    onButtonClick: () => void;
}> = ({ invite, onShowInfoClick, onButtonClick }) => {
    const date = useDateFormat(useParseDate(invite.createdAt));
    const [updateInvite, { isLoading }] = useUpdateInviteMutation();
    const [currentCellElement, setCurrentCellElement] = useState<HTMLElement>();
    const myInvites = useAppSelector(selectMyInvites);
    const dispatch = useDispatch();

    const formatedTraining = useTrainingName(invite.training.name);
    const isName = !!(invite.from.firstName || invite.from.lastName);

    const onAcceptClick = async () => {
        onButtonClick();
        const data = { id: invite._id, status: 'accepted' };
        try {
            await updateInvite(data).unwrap();
            dispatch(setIsPartnersQueried(true));
            dispatch(setMyInvites([...myInvites].filter((item) => item._id !== invite._id)));
        } catch (error) {
            return;
        }
    };
    const onRejectClick = async () => {
        onButtonClick();
        const data = { id: invite._id, status: 'rejected' };
        try {
            await updateInvite(data).unwrap();
            dispatch(setIsPartnersQueried(true));
            dispatch(setMyInvites([...myInvites].filter((item) => item._id !== invite._id)));
        } catch (error) {
            return;
        }
    };

    const setPosition = (target: HTMLElement) => {
        const topEl = target.getBoundingClientRect().top + window.scrollY;
        const leftEl = target.getBoundingClientRect().left;

        dispatch(setModalTop(`${topEl}px`));
        dispatch(setModalLeft(`${leftEl}px`));
    };
    const onOpen = (e: React.MouseEvent<HTMLElement>) => {
        setCurrentCellElement(e.currentTarget);
        setPosition(e.currentTarget);
        onShowInfoClick();
    };

    useEffect(() => {
        const handleResize = () => {
            if (currentCellElement) setPosition(currentCellElement);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCellElement]);
    return (
        <>
            {isLoading && <Loader />}

            <List.Item
                className='invitation-card'
                actions={[
                    <Button type='primary' key='accept' block={true} onClick={onAcceptClick}>
                        Тренироваться вместе
                    </Button>,
                    <Button key='reject' block={true} onClick={onRejectClick}>
                        Отклонить запрос
                    </Button>,
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={invite.from.imageSrc} icon={<UserOutlined />} />}
                    title={
                        <>
                            {isName
                                ? `${invite.from.firstName} ${invite.from.lastName}`
                                : 'Пользователь'}
                        </>
                    }
                />
                <div className='invitation-card-content'>
                    <div className='invitation-card-date'>{date}</div>
                    <div className='invitation-card-text'>
                        Привет, я ищу партнёра для совместных {formatedTraining}. Ты хочешь
                        присоединиться ко мне на следующих тренировках?
                    </div>
                    <Button type='link' onClick={onOpen} className='invitation-card-button'>
                        Посмотреть детали тренировки
                    </Button>
                </div>
            </List.Item>
        </>
    );
};
