import './training-form-list.scss';
import { Button, Form } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ExercisesFields } from '@pages/calendar-page/components/exercises-fields/exercises-fields';
import {
    selectCalendarAction,
    selectCheckedIndexes,
    selectExercises,
    setCheckedIndexes,
} from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';

export const TrainingFormList: React.FC = () => {
    const action = useAppSelector(selectCalendarAction);
    const exercises = useAppSelector(selectExercises);
    const checkedIndexes = useAppSelector(selectCheckedIndexes);

    const dispatch = useDispatch();

    return (
        <div className='training-form-list'>
            <Form.List
                name='exercises'
                initialValue={
                    exercises.length
                        ? exercises.map((exercise) => ({
                              name: exercise.name,
                              approaches: exercise.approaches,
                              weight: exercise.weight,
                              replays: exercise.replays,
                          }))
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
                                    onClick={add}
                                    icon={<PlusOutlined />}
                                >
                                    Добавить ещё
                                </Button>
                                {(action === 'toEdit' || action === 'toInvite') && (
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
        </div>
    );
};
