import './exercises-fields.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectCheckedIndexes, setCheckedIndexes } from '@redux/calendar/calendarSlice';
import { CalendarAction } from '../../../../types/calendar/calendar';
import { Checkbox, Form, FormListFieldData, Input, InputNumber } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const ExercisesFields: React.FC<{
    field: FormListFieldData;
    index: number;
    action: CalendarAction;
}> = ({ field, index, action }) => {
    const [checked, setChecked] = useState(false);
    const checkedIndexes = useAppSelector(selectCheckedIndexes);
    const dispatch = useDispatch();
    return (
        <div className='form-fields exercises-form-fields'>
            <div className='form-line'>
                <Form.Item name={[field.name, 'name']} className='form-exercise-input'>
                    <Input
                        placeholder='Упражнение'
                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                        readOnly={action === 'toLook'}
                    />
                </Form.Item>
                {(action === 'toEdit' || action === 'toInvite') && (
                    <Form.Item name={[field.name, 'check']} className='form-check'>
                        <Checkbox
                            checked={checked}
                            data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                            onChange={(event) => {
                                setChecked(!checked);
                                if (event.target.checked) {
                                    dispatch(setCheckedIndexes([...checkedIndexes, index]));
                                } else {
                                    dispatch(
                                        setCheckedIndexes([
                                            ...checkedIndexes.splice(
                                                checkedIndexes.indexOf(index),
                                                1,
                                            ),
                                        ]),
                                    );
                                }
                            }}
                        />
                    </Form.Item>
                )}
            </div>
            <div className='form-number-inputs'>
                <Form.Item name={[field.name, 'approaches']} label='Подходы'>
                    <InputNumber
                        addonBefore='+'
                        min={1}
                        placeholder='1'
                        data-test-id={`modal-drawer-right-input-approach${index}`}
                        readOnly={action === 'toLook'}
                    />
                </Form.Item>
                <Form.Item name={[field.name, 'weight']} label='Вес, кг'>
                    <InputNumber
                        min={0}
                        placeholder='0'
                        data-test-id={`modal-drawer-right-input-weight${index}`}
                        readOnly={action === 'toLook'}
                    />
                </Form.Item>
                <div className='form-mult'>x</div>
                <Form.Item name={[field.name, 'replays']} label='Количество'>
                    <InputNumber
                        min={1}
                        placeholder='1'
                        data-test-id={`modal-drawer-right-input-quantity${index}`}
                        readOnly={action === 'toLook'}
                    />
                </Form.Item>
            </div>
        </div>
    );
};
