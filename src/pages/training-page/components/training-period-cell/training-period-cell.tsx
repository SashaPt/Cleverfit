import './training-period-cell.scss';
import { Button } from 'antd';
import React from 'react';
import { setCurrentTraining, setEditedTraining, setSelected } from '@redux/calendar/calendarSlice';
import { EditFilled, EditOutlined } from '@ant-design/icons';
import { TrainingsSuccess } from '../../../../types/calendar/calendar';
import { useDispatch } from 'react-redux';
import { useSelectOptions } from '@hooks/useSelectOptions';
import { setCalendarAction } from '@redux/calendar/calendarSlice';

export const TrainingPeriodCell: React.FC<{
    item: TrainingsSuccess;
    period: number;
    index: number;
    onEditClick: () => void;
}> = ({ item, period, index, onEditClick }) => {
    const dispatch = useDispatch();
    const periodLabel = useSelectOptions(period);

    const onEditButtonClick = () => {
        dispatch(setCurrentTraining(item.name));
        dispatch(setCalendarAction('toEdit'));
        dispatch(setSelected(item.name));
        dispatch(setEditedTraining(item));
        onEditClick();
    };

    return (
        <div className='training-table-period'>
            <div>{period ? periodLabel : ''}</div>
            <Button
                className='training-table-edit'
                data-test-id={`update-my-training-table-icon${index}`}
                disabled={item.isImplementation}
                onClick={onEditButtonClick}
                icon={
                    !item.isImplementation ? (
                        <EditOutlined style={{ color: '#2f54eb' }} />
                    ) : (
                        <EditFilled style={{ color: '#bfbfbf' }} />
                    )
                }
            />
        </div>
    );
};
