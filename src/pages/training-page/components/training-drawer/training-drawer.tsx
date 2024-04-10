import './training-drawer.scss';
import { ModalProps } from '../../../../types/common/common';
import { useForm } from 'antd/lib/form/Form';
import { Avatar, Button, Checkbox, DatePicker, Drawer, Form, Select } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CloseOutlined, EditOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import {
    selectCalendarAction,
    selectCalendarResponse,
    selectCurrentTraining,
    selectEditedTraining,
    selectExercises,
    setEditedTraining,
    setExercises,
    setIsCalendarQueried,
    setSelected,
} from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'moment/locale/ru';
import moment, { Moment } from 'moment';
import { FieldData } from 'rc-field-form/lib/interface';
import { useEffect, useMemo, useState } from 'react';
import { CalendarCell } from '@pages/calendar-page/components/calendar-cell/calendar-cell';
import { DATE_FORMAT, SELECT_DEFAULT } from '@constants/constants';
import { Exercise, TrainingData } from '../../../../types/calendar/calendar';
import {
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '../../../../services/calendarApi';
import { Loader } from '@components/loader/loader';
import { TrainingsSelect } from '@pages/calendar-page/components/trainings-select/trainings-select';
import { useCurrentExercises } from '@hooks/useCurrentData';
import { TrainingFormList } from '../../../calendar-page/components/training-form-list/training-form-list';
import { usePostInviteMutation } from '../../../../services/trainingApi';
import { selectInviteUser, selectJointUsers, setJointUsers } from '@redux/training/trainingSlice';
import { TrainingsItems } from '@pages/calendar-page/components/trainings-items/trainings-items';
import { InviteData, TrainingPartner } from '../../../../types/training/training';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
});

const repeatSelectOptions = [
    { value: 1, label: 'Через 1 день' },
    { value: 2, label: 'Через 2 дня' },
    { value: 3, label: 'Через 3 дня' },
    { value: 4, label: 'Через 4 дня' },
    { value: 5, label: 'Через 5 дней' },
    { value: 6, label: 'Через 6 дней' },
    { value: 7, label: '1 раз в неделю' },
];

export const TrainingDrawer: React.FC<{
    modalProps: ModalProps;
    alertOpen: () => void;
    errorModalOpen: () => void;
}> = ({ modalProps, alertOpen, errorModalOpen }) => {
    const [drawerForm] = useForm();
    const [repeat, setRepeat] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [currentDate, setCurrentDate] = useState<Moment | null>(null);
    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();
    const [postInvitation, { isLoading: isInviteLoading }] = usePostInviteMutation();
    const action = useAppSelector(selectCalendarAction);
    const currentTraining = useAppSelector(selectCurrentTraining);
    const exercises = useAppSelector(selectExercises);
    const userTrainings = useAppSelector(selectCalendarResponse);
    const editedTraining = useAppSelector(selectEditedTraining);
    const invitedUser = useAppSelector(selectInviteUser);
    const jointUsers = useAppSelector(selectJointUsers);
    const currentExercises = useCurrentExercises(currentDate, userTrainings, currentTraining);

    const editedDate = useMemo(() => {
        if (editedTraining?.date) {
            setCurrentDate(moment(editedTraining?.date));
            return moment(editedTraining?.date);
        }
        return null;
    }, [editedTraining?.date]);

    const dispatch = useDispatch();

    const onDrawerClose = () => {
        modalProps.onCloseClick();
        setIsValid(false);
        drawerForm.resetFields();
        setCurrentDate(null);
        if (action === 'toAdd') {
            dispatch(setSelected(SELECT_DEFAULT));
        }
    };

    const resetDrawer = () => {
        onDrawerClose();
        dispatch(setSelected(SELECT_DEFAULT));
        dispatch(setEditedTraining(null));
        dispatch(setExercises([]));
        setCurrentDate(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFieldsChange = (_: any, fields: FieldData[]) => {
        const notEmpty = !!(drawerForm.getFieldValue('name') && drawerForm.getFieldValue('date'));
        const exercisesName = [...fields].filter((field) => {
            return (
                field.name.find((i: string) => i == 'exercises') &&
                field.name.find((i: string) => i == 'name')
            );
        });
        const notEmptyEx = !![...exercisesName].filter((name) => name.value).length;

        const notErr = !drawerForm.getFieldsError().some(({ errors }) => errors.length);
        setIsValid(notEmpty && notEmptyEx && notErr);
    };

    const handleCreate = async (data: TrainingData) => {
        try {
            const { _id } = await createTraining(data).unwrap();
            dispatch(setIsCalendarQueried(true));
            if (action !== 'toInvite') {
                alertOpen();
            }
            return _id;
        } catch (error) {
            errorModalOpen();
        } finally {
            resetDrawer();
        }
    };

    const handleEdit = async (body: TrainingData, id: string) => {
        try {
            await updateTraining({ body, id }).unwrap();
            dispatch(setIsCalendarQueried(true));
            onDrawerClose();
            if (action !== 'toInvite') {
                alertOpen();
            }
        } catch (error) {
            errorModalOpen();
            resetDrawer();
        }
    };

    const handleInvite = async (inviteData: InviteData) => {
        try {
            await postInvitation(inviteData).unwrap();
            const users: TrainingPartner[] = [...jointUsers].map((user) => {
                if (user.id === inviteData.to) {
                    return { ...user, status: 'pending' };
                }
                return user;
            });
            dispatch(setJointUsers(users));
        } catch (error) {
            errorModalOpen();
        }
        resetDrawer();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        const { repeat, period, date } = values;
        const exercises = [...values.exercises]
            .filter((ex) => ex.name)
            .map((value: Exercise) => {
                return {
                    name: value.name || '',
                    replays: value.replays || 1,
                    weight: value.weight || 0,
                    approaches: value.approaches || 1,
                };
            });
        const parameters = { repeat, period };
        const data: TrainingData = {
            name: currentTraining,
            date,
            exercises,
            parameters,
        };
        const past = !!currentDate?.isSameOrBefore(moment());
        if (action === 'toAdd') {
            handleCreate(data);
        } else if (action === 'toEdit') {
            const body = { ...data };
            if (past) {
                body.isImplementation = true;
            }
            if (editedTraining?._id) {
                handleEdit(body, editedTraining?._id);
            }
        } else if (action === 'toInvite') {
            const newTraining = await handleCreate({
                ...data,
                name: invitedUser?.trainingType || '',
            });

            if (invitedUser) {
                const inviteData = { to: invitedUser.id, trainingId: newTraining || '' };
                handleInvite(inviteData);
            }
        }
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

        if (action !== 'toAdd' && action !== 'toInvite') {
            drawerForm.setFieldValue(
                'exercises',
                currentExercises.length ? currentExercises : initial,
            );
            drawerForm.setFieldValue('date', editedDate);
            drawerForm.setFieldValue('period', editedTraining?.parameters?.period || 1);
            drawerForm.setFieldValue('repeat', editedTraining?.parameters?.repeat);
            setRepeat(editedTraining?.parameters?.repeat || false);
        } else {
            drawerForm.setFieldValue('exercises', exercises.length ? exercises : initial);
            drawerForm.setFieldValue('date', currentDate);
            drawerForm.setFieldValue('period', 1);
            drawerForm.setFieldValue('repeat', false);
            setRepeat(false);
        }
    }, [
        editedDate,
        currentExercises,
        drawerForm,
        exercises,
        editedTraining?.parameters?.period,
        action,
        currentDate,
        editedTraining?.parameters?.repeat,
    ]);

    useEffect(() => {
        if (action == 'toAdd') {
            dispatch(setEditedTraining(null));
            setCurrentDate(null);
        }
    }, [action, dispatch]);

    return (
        <>
            {(isCreateLoading || isUpdateLoading || isInviteLoading) && <Loader />}
            <Drawer
                className='training-drawer'
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
                        <>
                            <PlusOutlined style={{ fontSize: '14px' }} /> Совместная тренировка
                        </>
                    )
                }
                closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
                onClose={onDrawerClose}
                open={modalProps.isOpen}
            >
                <Form
                    layout='vertical'
                    className='training-drawer-form'
                    form={drawerForm}
                    onFieldsChange={onFieldsChange}
                    onFinish={onFinish}
                    initialValues={{ name: SELECT_DEFAULT, period: 1, repeat: false }}
                >
                    <div className='training-drawer-inner'>
                        {action === 'toInvite' && (
                            <div className='training-drawer-top'>
                                <div className='training-drawer-partner'>
                                    <div className='training-drawer-partner-img'>
                                        <Avatar
                                            src={invitedUser?.imageSrc}
                                            icon={<UserOutlined />}
                                        />
                                    </div>
                                    <div className='training-drawer-partner-name'>
                                        {invitedUser?.name || 'Пользователь'}
                                    </div>
                                </div>
                                <TrainingsItems
                                    date={currentDate || moment()}
                                    editable={false}
                                    keys={[
                                        {
                                            name: invitedUser?.trainingType || currentTraining,
                                            _id: invitedUser?.id || '1',
                                        },
                                    ]}
                                />
                            </div>
                        )}
                        {action !== 'toInvite' && (
                            <Form.Item name='name'>
                                <TrainingsSelect date={currentDate} bordered={true} />
                            </Form.Item>
                        )}
                        <div className='training-drawer-line'>
                            <Form.Item className='training-drawer-picker' name='date'>
                                <DatePicker
                                    data-test-id='modal-drawer-right-date-picker'
                                    locale={locale}
                                    format={DATE_FORMAT}
                                    inputReadOnly={action === 'toEdit'}
                                    disabledDate={(current) => current.isSameOrBefore(moment())}
                                    onChange={(date) => setCurrentDate(date)}
                                    dateRender={(date: Moment) => (
                                        <CalendarCell date={date} small={true} />
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                className='training-drawer-check'
                                name='repeat'
                                valuePropName='checked'
                            >
                                <Checkbox
                                    data-test-id='modal-drawer-right-checkbox-period'
                                    onChange={() => setRepeat(!repeat)}
                                >
                                    С периодичностью
                                </Checkbox>
                            </Form.Item>
                        </div>
                        {repeat && (
                            <Form.Item className='training-drawer-repeat' name='period'>
                                <Select
                                    data-test-id='modal-drawer-right-select-period'
                                    className='training-drawer-repeat-select'
                                    options={repeatSelectOptions}
                                />
                            </Form.Item>
                        )}
                        <TrainingFormList />
                    </div>
                    <div className='training-drawer-form-footer'>
                        <Button
                            htmlType='submit'
                            type='primary'
                            block={true}
                            disabled={!isValid && action !== 'toEdit'}
                        >
                            {action !== 'toInvite' ? 'Сохранить' : 'Отправить приглашение'}
                        </Button>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};
