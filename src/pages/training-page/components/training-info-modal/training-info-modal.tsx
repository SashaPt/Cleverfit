import './training-info-modal.scss';
import React from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarResponse,
    selectIsMobile,
    selectModalLeft,
    selectModalTop,
} from '@redux/calendar/calendarSlice';
import moment from 'moment';
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { TrainingsSuccess } from '../../../../types/calendar/calendar';
import { ExercisesItems } from '@pages/calendar-page/components/exercises-items/exercises-items';
import { useCurrentExercises } from '@hooks/useCurrentData';
import { Badge, Button, Modal } from 'antd';
import { ModalProps } from '../../../../types/common/common';
import { getColor } from '@utils/calendar-colors';
import { useDateFormat } from '@hooks/useDateFormat';
import { useParseDate } from '@hooks/useParseDate';
import { useSelectOptions } from '@hooks/useSelectOptions';

export const TrainingInfoModal: React.FC<{
    modalProps: ModalProps;
    item: TrainingsSuccess | null;
    onCreateClick?: () => void;
    isFromInvite?: boolean;
}> = ({ item, onCreateClick, modalProps, isFromInvite }) => {
    const top = useAppSelector(selectModalTop);
    const left = useAppSelector(selectModalLeft);
    const isMobile = useAppSelector(selectIsMobile);
    const userTrainings = useAppSelector(selectCalendarResponse);
    const currentUserExercises = useCurrentExercises(
        moment(item?.date),
        userTrainings,
        item?.name || '',
    );
    const currentExercises = isFromInvite ? item?.exercises || [] : currentUserExercises;
    const date = useDateFormat(useParseDate(item?.date || ''));

    const period = useSelectOptions(item?.parameters?.period || 0);

    return (
        <>
            <div
                className={`training-modal ${
                    isFromInvite ? 'training-modal-inv' : 'training-modal-table'
                }`}
            >
                {item && modalProps.isOpen && (
                    <Modal
                        className={`training-info-modal ${
                            isFromInvite ? 'training-info-modal-inv' : ''
                        }`}
                        data-test-id={isFromInvite ? 'joint-training-review-card' : 'modal'}
                        open={modalProps.isOpen}
                        mask={false}
                        closable={false}
                        getContainer={
                            isFromInvite ? '.training-modal-inv' : '.training-modal-table'
                        }
                        style={!isMobile ? { top, left } : {}}
                        bodyStyle={
                            isFromInvite
                                ? { borderTop: '1px solid #f0f0f0' }
                                : { borderTop: `2px solid ${getColor(item.name)}` }
                        }
                        onCancel={modalProps.onCloseClick}
                        title={
                            <div className='training-info-modal-header'>
                                {!isFromInvite && (
                                    <Button
                                        data-test-id='modal-exercise-training-button-close'
                                        className='training-modal-close-button'
                                        onClick={modalProps.onCloseClick}
                                        icon={<ArrowLeftOutlined style={{ fontSize: '16px' }} />}
                                    />
                                )}
                                {isFromInvite && <Badge color={getColor(item.name)} />}
                                {item?.name}
                                {isFromInvite && (
                                    <Button
                                        data-test-id='modal-create-training-button-close'
                                        className='training-info-modal-close-button'
                                        onClick={modalProps.onCloseClick}
                                        icon={
                                            <CloseOutlined
                                                style={{ fontSize: '14px', color: '#8c8c8c' }}
                                            />
                                        }
                                    />
                                )}
                            </div>
                        }
                        footer={
                            isFromInvite
                                ? null
                                : [
                                      <Button
                                          key='add'
                                          block={true}
                                          disabled={item.isImplementation}
                                          onClick={onCreateClick}
                                      >
                                          Добавить упражнения
                                      </Button>,
                                  ]
                        }
                    >
                        {isFromInvite && (
                            <div className='training-info-modal-line'>
                                <div className='line-period'>{period ? period : ''}</div>
                                <div className='line-date'>{date}</div>
                            </div>
                        )}
                        <ExercisesItems
                            date={item?.date ? moment(item.date) : moment()}
                            isDelete={false}
                            exercises={currentExercises}
                            isFromInvite={isFromInvite}
                        />
                    </Modal>
                )}
            </div>
        </>
    );
};
