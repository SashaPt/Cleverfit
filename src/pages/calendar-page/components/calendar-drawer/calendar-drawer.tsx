import './calendar-drawer.scss';
import type { Moment } from 'moment';
import { Button, Drawer, Form } from 'antd';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarAction,
    selectCalendarResponse,
    selectCurrentTraining,
    selectEditedTraining,
    selectExercises,
    setExercises,
} from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';
import { TrainingsItems } from '../trainings-items/trainings-items';
import { useForm } from 'antd/lib/form/Form';
import { Exercise } from '../../../../types/calendar/calendar';
import { useCurrentExercises } from '@hooks/useCurrentData';
import { useEffect } from 'react';
import { ModalProps } from '../../../../types/common/common';
import { DATE_FORMAT } from '@constants/constants';
import { TrainingFormList } from '../training-form-list/training-form-list';

export const CalendarDrawer: React.FC<{
    date: Moment;
    modalProps: ModalProps;
    toDelete: () => void;
}> = ({ date, modalProps, toDelete }) => {
    const currentTraining = useAppSelector(selectCurrentTraining);
    const action = useAppSelector(selectCalendarAction);
    const userTrainings = useAppSelector(selectCalendarResponse);
    const currentExercises = useCurrentExercises(date, userTrainings, currentTraining);
    const editedId = useAppSelector(selectEditedTraining);
    const exercises = useAppSelector(selectExercises);
    const dispatch = useDispatch();
    const [drawerForm] = useForm();

    const onDrawerClose = () => {
        modalProps.onCloseClick();

        const values = drawerForm.getFieldValue('exercises');

        const ex: Exercise[] = [...values]
            .filter((value) => value && value?.name && value?.name !== '')
            .map((value: Exercise) => {
                return {
                    name: value.name || '',
                    replays: value.replays || 1,
                    weight: value.weight || 0,
                    approaches: value.approaches || 1,
                };
            });
        if (!ex.length && action === 'toEdit') {
            toDelete();
        }
        dispatch(setExercises([...ex]));
    };

    useEffect(() => {
        const initial = [
            {
                name: '',
                approaches: 1,
                weight: 0,
                replays: 1,
            },
        ];
        drawerForm.setFieldValue(
            'exercises',
            exercises.length ? exercises : currentExercises.length ? currentExercises : initial,
        );
    }, [currentExercises, drawerForm, exercises]);

    return (
        <Drawer
            className='calendar-drawer'
            data-test-id='modal-drawer-right'
            title={
                action === 'toAdd' ? (
                    <>
                        <PlusOutlined style={{ fontSize: '14px' }} /> Добавление упражнений
                    </>
                ) : action === 'toEdit' ? (
                    <>
                        <EditOutlined style={{ fontSize: '14px' }} /> Редактирование
                    </>
                ) : (
                    <>Просмотр упражнений</>
                )
            }
            closable={false}
            onClose={onDrawerClose}
            open={modalProps.isOpen}
            extra={
                <Button
                    data-test-id='modal-drawer-right-button-close'
                    className='calendar-modal-close-button'
                    icon={<CloseOutlined />}
                    onClick={onDrawerClose}
                />
            }
        >
            <div className='calendar-drawer-top'>
                <TrainingsItems
                    date={date}
                    editable={false}
                    keys={[{ name: currentTraining, _id: editedId?._id || '' }]}
                />
                <div>{date.format(DATE_FORMAT)}</div>
            </div>
            <Form layout='vertical' className='calendar-drawer-form' form={drawerForm}>
                <TrainingFormList/>
            </Form>
        </Drawer>
    );
};
