import './invitations.scss';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectMyInvites } from '@redux/training/trainingSlice';
import { Button, List } from 'antd';
import { InvitationCard } from '../invitation-card/invitation-card';
import { TrainingInfoModal } from '../training-info-modal/training-info-modal';
import { TrainingsSuccess } from '../../../../types/calendar/calendar';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export const Invitations: React.FC = () => {
    const myInvites = useAppSelector(selectMyInvites);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trainingToShow, setTrainigToShow] = useState<TrainingsSuccess | null>(null);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const check = (target: HTMLElement) => {
            if (
                isModalOpen &&
                !target.closest('.training-info-modal-inv') &&
                !target.closest('.invitation-card-button')
            ) {
                setIsModalOpen(false);
                setTrainigToShow(null);
            }
        };
        const onClick = (e: MouseEvent) => {
            check(e.target as HTMLElement);
        };
        window.addEventListener('click', (e) => onClick(e));
        return () => {
            window.removeEventListener('click', (e) => onClick(e));
        };
    }, [isModalOpen, myInvites]);

    return (
        <>
            {!!myInvites.length && (
                <div className='invitations'>
                    <div className='invitations-sub'>Новое сообщение ({myInvites.length})</div>
                    <List
                        className='invitation-cards'
                        itemLayout='horizontal'
                        dataSource={myInvites}
                        renderItem={(item, index) => {
                            if (isItemsCollapsed && index >= 1) {
                                return;
                            }
                            return (
                                <InvitationCard
                                    invite={item}
                                    onShowInfoClick={() => {
                                        setIsModalOpen(true);
                                        setTrainigToShow(item.training);
                                    }}
                                    onButtonClick={() => setIsModalOpen(false)}
                                />
                            );
                        }}
                    />
                    {myInvites.length > 1 && (
                        <Button
                            type='link'
                            icon={isItemsCollapsed ? <DownOutlined /> : <UpOutlined />}
                            className='invitations-toggle-button'
                            onClick={() => setIsItemsCollapsed(!isItemsCollapsed)}
                        >
                            {isItemsCollapsed ? 'Показать все сообщения' : 'Скрыть все сообщения'}
                        </Button>
                    )}
                    <TrainingInfoModal
                        item={trainingToShow}
                        isFromInvite={true}
                        modalProps={{
                            isOpen: isModalOpen,
                            onCloseClick: () => setIsModalOpen(false),
                        }}
                    />
                </div>
            )}
        </>
    );
};
