import './exercises-items.scss';
import { useCurrentExercises } from '@hooks/useCurrentData';
import { Exercise } from '../../../../types/calendar/calendar';
import type { Moment } from 'moment';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarResponse,
    selectCurrentTraining,
    setEditedExercise,
} from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';

export const ExercisesItems: React.FC<{
    date: Moment;
    exercises?: Exercise[];
    isDelete: boolean;
    isFromInvite?: boolean;
    onEditClick?: () => void;
}> = ({ date, exercises, isDelete, onEditClick, isFromInvite }) => {
    const userData = useAppSelector(selectCalendarResponse);
    const currentTraining = useAppSelector(selectCurrentTraining);
    const currentExercises = useCurrentExercises(date, userData, currentTraining);
    const items = exercises?.length ? exercises : isDelete ? [] : currentExercises;
    const dispatch = useDispatch();

    return (
        <>
            <div className='exercises-items'>
                {items.map((item, index) => (
                    <div className='exercises-item' key={item._id || index}>
                        <div className='exercises-item-name'>{item.name}</div>
                        {onEditClick && (
                            <Button
                                className='exercises-items-edit'
                                data-test-id={`modal-update-training-edit-button${index}`}
                                onClick={() => {
                                    dispatch(setEditedExercise(item));
                                    onEditClick();
                                }}
                                icon={
                                    <EditOutlined
                                        style={{
                                            fontSize: '18px',
                                            color: '#2f54eb',
                                        }}
                                    />
                                }
                            />
                        )}
                        {isFromInvite && (
                            <div className='exercises-item-val'>
                                {item.approaches} х {item.weight ? `(${item.weight} кг) х ` : ''}
                                {item.replays}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};
