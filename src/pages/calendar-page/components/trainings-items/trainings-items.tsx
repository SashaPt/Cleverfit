import './trainings-items.scss';
import type { Moment } from 'moment';
import empty from '/empty.svg';
import { Badge, Button } from 'antd';
import { EditFilled, EditOutlined } from '@ant-design/icons';
import { getColor } from '@utils/calendar-colors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarResponse,
    setCalendarAction,
    setCurrentTraining,
    setEditedTraining,
    setSelected,
} from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';
import { useCurrentTrainings } from '@hooks/useCurrentData';

export const TrainingsItems: React.FC<{
    date: Moment;
    editable: boolean;
    onEditClick?: () => void;
    onItemClick?: () => void;
    keys?: [{ name: string; _id: string }];
}> = ({ date, editable, onEditClick, onItemClick, keys }) => {
    const userData = useAppSelector(selectCalendarResponse);
    const currentTrainings = useCurrentTrainings(date, userData);
    const dispatch = useDispatch();

    const dateModalContentEmpty = (
        <>
            <div className='trainigs-items-subtitle'>Нет активных тренировок</div>
            <img className='trainigs-items-image' src={empty} alt='Нет активных тренировок' />
        </>
    );
    return (
        <>
            {keys?.length ? (
                <div className={`trainigs-items`}>
                    {keys.map((item, index) => (
                        <div
                            key={date.format('DD.MM.YYYY') + item._id + index}
                            className='trainigs-item'
                        >
                            <Badge
                                color={getColor(item.name)}
                                text={item.name}
                                className='trainigs-item-name'
                                style={{ color: editable ? '#262626' : '#8c8c8c' }}
                            />
                        </div>
                    ))}
                </div>
            ) : currentTrainings.length ? (
                <div className={`trainigs-items ${editable ? 'trainigs-items-modal' : ''}`}>
                    {currentTrainings.map((item, index) => (
                        <div
                            key={date.format('DD.MM.YYYY') + item._id + index}
                            className='trainigs-item'
                            onClick={() => {
                                if (item.isImplementation) {
                                    dispatch(setCurrentTraining(item.name));
                                    dispatch(setEditedTraining(item));
                                    dispatch(setCalendarAction('toLook'));
                                    onItemClick && onItemClick();
                                }
                            }}
                        >
                            <Badge
                                color={getColor(item.name)}
                                text={item.name}
                                className='trainigs-item-name'
                                style={
                                    editable && item.isImplementation
                                        ? { color: '#bfbfbf' }
                                        : { color: '#262626' }
                                }
                            />
                            {editable && (
                                <Button
                                    className='trainigs-items-edit'
                                    data-test-id={`modal-update-training-edit-button${index}`}
                                    disabled={item.isImplementation}
                                    onClick={() => {
                                        onEditClick && onEditClick();
                                        dispatch(setCurrentTraining(item.name));
                                        dispatch(setSelected(item.name));
                                        dispatch(setEditedTraining(item));
                                    }}
                                    icon={
                                        !item.isImplementation ? (
                                            <EditOutlined
                                                style={{ fontSize: '18px', color: '#2f54eb' }}
                                            />
                                        ) : (
                                            <EditFilled
                                                style={{ fontSize: '18px', color: '#bfbfbf' }}
                                            />
                                        )
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                editable && dateModalContentEmpty
            )}
        </>
    );
};
