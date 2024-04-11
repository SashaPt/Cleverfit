import './partner-card.scss';
import React, { useMemo } from 'react';
import { Avatar, Button, Card, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { TrainingPartner } from '../../../../types/training/training';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useHighlight } from '@hooks/useHighlight';
import { setCalendarAction } from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';
import {
    selectJointUsersAll,
    selectPartners,
    setInviteUser,
    setPartners,
} from '@redux/training/trainingSlice';
import { useDeleteInviteMutation } from '../../../../services/trainingApi';
import { Loader } from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { PARTNERS_LIMIT } from '@constants/constants';
import classNames from 'classnames';

export const PartnerCard: React.FC<{
    partner: TrainingPartner;
    index?: number;
    isJoint?: boolean;
    isInModal?: boolean;
    searchValue?: string;
    onCreateClick?: () => void;
    onDelete?: () => void;
}> = ({ partner, index, isJoint, isInModal, searchValue, onCreateClick, onDelete }) => {
    const name = useHighlight(partner.name || 'Пользователь', searchValue);
    const [deleteInvite, { isLoading }] = useDeleteInviteMutation();
    const partners = useAppSelector(selectPartners);
    const jointUsersAll = useAppSelector(selectJointUsersAll);
    const dispatch = useDispatch();

    const pendingPartners = useMemo(() => {
        return [...jointUsersAll].filter((user) => user.status === 'pending');
    }, [jointUsersAll]);

    const onDeleteClick = async () => {
        try {
            await deleteInvite(partner.inviteId).unwrap();
            dispatch(setPartners([...partners].filter((item) => item.id !== partner.id)));
            onDelete && onDelete();
        } catch (error) {
            return;
        }
    };

    const cardClass = classNames({
        'partner-card': true,
        'partner-card-joint': isJoint,
        'partner-card-rejected': partner.status === 'rejected',
        'partner-card-modal': isInModal,
    });

    return (
        <>
            {isLoading && <Loader />}
            <Card data-test-id={`joint-training-cards${index}`} className={cardClass}>
                <Meta
                    title={name}
                    avatar={
                        <Avatar src={partner.imageSrc} alt={partner.name} icon={<UserOutlined />} />
                    }
                />
                <div>
                    <div className='partner-card-info'>
                        <span className='partner-card-subtitle'>Тип тренировки:</span>{' '}
                        <span className='partner-card-value'>{partner.trainingType}</span>
                    </div>
                    <div className='partner-card-info'>
                        <span className='partner-card-subtitle'>Средняя нагрузка:</span>{' '}
                        <span className='partner-card-value'>{partner.avgWeightInWeek} кг/нед</span>
                    </div>
                </div>
                {isJoint && (
                    <div className='partner-card-action'>
                        {partner.status !== 'accepted' && (
                            <div className='partner-card-footer'>
                                <Button
                                    type='primary'
                                    className='partner-card-button'
                                    block={true}
                                    disabled={
                                        partner.status === 'pending' ||
                                        partner.status === 'rejected' ||
                                        pendingPartners.length + partners.length >= PARTNERS_LIMIT
                                    }
                                    onClick={() => {
                                        dispatch(setCalendarAction('toInvite'));
                                        dispatch(setInviteUser(partner));
                                        onCreateClick && onCreateClick();
                                    }}
                                >
                                    Создать тренировку
                                </Button>
                                {partner.status === 'pending' && (
                                    <span className='partner-card-note'>ожидает подтверждения</span>
                                )}
                                {partner.status === 'rejected' && (
                                    <span className='partner-card-note'>
                                        <Tooltip
                                            placement='topRight'
                                            color='#000'
                                            className='partner-card-note-inner'
                                            title={
                                                <>
                                                    повторный запрос <br />
                                                    будет доступнен <br></br>через 2 недели
                                                </>
                                            }
                                        >
                                            тренировка отклонена{' '}
                                            <ExclamationCircleOutlined
                                                style={{ color: '#8c8c8c', fontSize: '16px' }}
                                            />
                                        </Tooltip>
                                    </span>
                                )}
                            </div>
                        )}
                        {partner.status === 'accepted' && (
                            <div className='partner-card-footer'>
                                <Button
                                    type='default'
                                    className='partner-card-button'
                                    block={true}
                                    onClick={() => {
                                        dispatch(setInviteUser(partner));
                                        onDeleteClick && onDeleteClick();
                                    }}
                                >
                                    Отменить тренировку
                                </Button>
                                <span className='partner-card-note'>
                                    тренировка одобрена{' '}
                                    <CheckCircleFilled
                                        style={{ color: '#52c41a', fontSize: '14px' }}
                                    />
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </>
    );
};
