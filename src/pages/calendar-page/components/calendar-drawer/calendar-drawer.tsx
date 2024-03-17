import './calendar-drawer.scss';

import type { Moment } from 'moment';
import { Button, Drawer, Form } from 'antd';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarAction,
    selectCalendarResponse,
    selectCheckedIndexes,
    selectCurrentTraining,
    selectEditedTraining,
    selectExercises,
    setCheckedIndexes,
    setExercises,
} from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';
import { TrainingsItems } from '../trainings-items/trainings-items';
import { ExercisesFields } from '../exercises-fields/exercises-fields';
import { useForm } from 'antd/lib/form/Form';
import { Exercise } from '../../../../types/calendar/calendar';
import { useCurrentExercises } from '@hooks/useCurrentData';
import { useEffect } from 'react';

export const CalendarDrawer: React.FC<{
    date: Moment;
    isOpen: boolean;
    onClose: () => void;
    toDelete: () => void;
}> = ({ date, isOpen, onClose, toDelete }) => {
    const currentTraining = useAppSelector(selectCurrentTraining);
    const action = useAppSelector(selectCalendarAction);
    const userTrainings = useAppSelector(selectCalendarResponse);
    const currentExercises = useCurrentExercises(date, userTrainings, currentTraining);
    const editedId = useAppSelector(selectEditedTraining);
    const checkedIndexes = useAppSelector(selectCheckedIndexes);
    const exercises = useAppSelector(selectExercises);
    const dispatch = useDispatch();
    const [drawerForm] = useForm();

    const onDrawerClose = () => {
        onClose();

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
            open={isOpen}
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
                <div>{date.format('DD.MM.YYYY')}</div>
            </div>
            <Form layout='vertical' className='calendar-drawer-form' form={drawerForm}>
                <Form.List
                    name='exercises'
                    initialValue={
                        exercises.length
                            ? exercises.map((exercise) => {
                                  return {
                                      name: exercise.name,
                                      approaches: exercise.approaches,
                                      weight: exercise.weight,
                                      replays: exercise.replays,
                                  };
                              })
                            : [
                                  {
                                      name: '',
                                      approaches: 1,
                                      weight: 0,
                                      replays: 1,
                                  },
                              ]
                    }
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <ExercisesFields
                                    field={field}
                                    index={index}
                                    action={action}
                                    key={field.key}
                                />
                            ))}
                            {action !== 'toLook' && (
                                <div className='form-actions'>
                                    <Button
                                        type='text'
                                        className='form-button-add'
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Добавить ещё
                                    </Button>
                                    {action === 'toEdit' && (
                                        <Button
                                            type='text'
                                            className='form-button-remove'
                                            icon={<MinusOutlined />}
                                            disabled={!checkedIndexes.length}
                                            onClick={() => {
                                                remove([...checkedIndexes]);
                                                dispatch(setCheckedIndexes([]));
                                            }}
                                        >
                                            Удалить
                                        </Button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </Form.List>
            </Form>
        </Drawer>
    );
};
