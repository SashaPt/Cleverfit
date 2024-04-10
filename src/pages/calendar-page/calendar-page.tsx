import './calendar-page.scss';
import { PageSider } from '@components/sider/pageSider';
import { Calendar, Layout } from 'antd';
import { PageHeader } from '@components/header/pageHeader';
import { Content } from 'antd/lib/layout/layout';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import TimePickerLocale from 'antd/lib/time-picker/locale/ru_RU';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import { Paths } from '../../routes/paths';
import {
    useCreateTrainingMutation,
    useLazyGetTrainingsListQuery,
    useUpdateTrainingMutation,
} from '../../services/calendarApi';
import { useEffect, useState } from 'react';
import { Loader } from '@components/loader/loader';
import { TrainingData } from '../../types/calendar/calendar';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarAction,
    selectCalendarResponse,
    selectCurrentTraining,
    selectEditedTraining,
    selectExercises,
    selectIsMobile,
    selectTrainingsList,
    setCalendarAction,
    setCurrentTraining,
    setEditedExercise,
    setEditedTraining,
    setExercises,
    setIsCalendarQueried,
    setSelected,
    setTrainingsList,
} from '@redux/calendar/calendarSlice';
import { TrainingsItems } from './components/trainings-items/trainings-items';
import { useCurrentExercises, useCurrentTrainingsNames } from '@hooks/useCurrentData';
import { TrainingsErrorModal } from './components/trainigs-error-modal/trainigs-error-modal';
import { CalendarDateModal } from './components/calendar-date-modal/calendar-date-modal';
import { CalendarDateModalCreate } from './components/calendar-date-modal-create/calendar-date-modal-create';
import { useDispatch } from 'react-redux';
import { ExercisesItems } from './components/exercises-items/exercises-items';
import { CalendarCell } from './components/calendar-cell/calendar-cell';
import { CalendarDrawer } from './components/calendar-drawer/calendar-drawer';
import { SELECT_DEFAULT } from '@constants/constants';
import { isArrayWithItems } from '@utils/utils';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

const locale: PickerLocale = {
    lang: {
        placeholder: 'Выберите дату',
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
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
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};

export const CalendarPage: React.FC = () => {
    const [getTrainings, { isLoading }] = useLazyGetTrainingsListQuery();
    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isErrorSaveModalOpen, setIsErrorSaveModalOpen] = useState(false);
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [isDate2ModalOpen, setIsDate2ModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState<Moment>(moment());
    const [isDelete, setIsDelete] = useState(false);

    const currentTraining = useAppSelector(selectCurrentTraining);
    const userTrainings = useAppSelector(selectCalendarResponse);
    const trainingsList = useAppSelector(selectTrainingsList);
    const editedId = useAppSelector(selectEditedTraining);
    const isMobile = useAppSelector(selectIsMobile);
    const action = useAppSelector(selectCalendarAction);
    const exercises = useAppSelector(selectExercises);
    const currentTrainingsNames = useCurrentTrainingsNames(currentDate, userTrainings);
    const currentExercises = useCurrentExercises(currentDate, userTrainings, currentTraining);
    const dispatch = useDispatch();

    const getTrainingsList = async () => {
        try {
            const resp = await getTrainings(null).unwrap();
            dispatch(setTrainingsList(resp));
        } catch (error) {
            setIsErrorModalOpen(true);
        }
    };

    const dateCellRender = (date: Moment) => (
        <CalendarCell
            date={date}
            onCellClick={() => {
                setIsDateModalOpen(true);
                setIsDate2ModalOpen(false);
                setCurrentDate(date);
            }}
        />
    );

    const resetModal = () => {
        setIsDate2ModalOpen(false);
        dispatch(setCurrentTraining(''));
        dispatch(setEditedExercise(null));
        dispatch(setEditedTraining(null));
        dispatch(setExercises([...currentExercises]));
        setIsDelete(false);
        dispatch(setCalendarAction('toAdd'));
    };

    const handleSaveClick = async () => {
        const data: TrainingData = {
            name: currentTraining,
            date: currentDate.toJSON(),
            exercises,
        };
        const past = currentDate.isSameOrBefore(moment());
        if ((action === 'toAdd' && !editedId) || (editedId && editedId?.name !== currentTraining)) {
            if (isArrayWithItems(exercises)) {
                try {
                    await createTraining(data).unwrap();
                    dispatch(setIsCalendarQueried(true));
                    setIsDateModalOpen(true);
                } catch (error) {
                    setIsErrorSaveModalOpen(true);
                }
            }
        } else {
            const body = { ...data, parameters: editedId?.parameters };
            if (past) {
                body.isImplementation = true;
            }
            if (editedId?._id) {
                try {
                    await updateTraining({ body, id: editedId?._id }).unwrap();
                    dispatch(setIsCalendarQueried(true));
                    setIsDateModalOpen(true);
                } catch (error) {
                    setIsErrorSaveModalOpen(true);
                }
            }
        }
        resetModal();
    };

    const onTrainingEdit = () => {
        setIsDateModalOpen(false);
        setIsDate2ModalOpen(true);
        dispatch(setExercises([...currentExercises]));
        dispatch(setSelected(currentTraining));
        dispatch(setCalendarAction('toEdit'));
    };

    const onExerciseEdit = () => {
        dispatch(setCalendarAction('toEdit'));
        setIsDrawerOpen(true);
    };

    useEffect(() => {
        if (!isArrayWithItems(trainingsList)) {
            getTrainingsList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            <Layout className='calendar-page'>
                <PageSider menuActive='calendar' />
                <Layout className='calendar-content'>
                    <PageHeader
                        isMain={false}
                        isSettings={true}
                        breadcrumbs={[
                            { id: 1, name: 'Главная', href: Paths.MAIN },
                            { id: 2, name: 'Календарь', href: '' },
                        ]}
                    />
                    <Content>
                        <div className='_container calendar-container'>
                            <Calendar
                                locale={locale}
                                dateFullCellRender={dateCellRender}
                                fullscreen={!isMobile}
                            />
                        </div>
                        <div className='calendar-modals'>
                            {isDateModalOpen && (
                                <CalendarDateModal
                                    modalProps={{
                                        isOpen: isDateModalOpen,
                                        onCloseClick: () => setIsDateModalOpen(false),
                                    }}
                                    onCreateClick={() => {
                                        setIsDateModalOpen(false);
                                        setIsDate2ModalOpen(true);
                                        dispatch(setExercises([...currentExercises]));
                                        dispatch(setSelected(SELECT_DEFAULT));
                                    }}
                                    disabled={
                                        currentDate.isSameOrBefore(moment()) ||
                                        (!!trainingsList.length &&
                                            trainingsList.length === currentTrainingsNames.size)
                                    }
                                    currentDate={currentDate}
                                    children={
                                        <TrainingsItems
                                            date={currentDate}
                                            editable={true}
                                            onEditClick={onTrainingEdit}
                                            onItemClick={() => setIsDrawerOpen(true)}
                                        />
                                    }
                                />
                            )}
                            {isDate2ModalOpen && (
                                <CalendarDateModalCreate
                                    date={currentDate}
                                    modalProps={{
                                        isOpen: isDate2ModalOpen,
                                        onCloseClick: resetModal,
                                    }}
                                    onBackClick={() => {
                                        resetModal();
                                        setIsDateModalOpen(true);
                                    }}
                                    onAddClick={() => {
                                        setIsDrawerOpen(true);
                                        dispatch(setExercises([...currentExercises]));
                                    }}
                                    onSaveClick={handleSaveClick}
                                    disabledSave={!(exercises.length || isDelete)}
                                    saveLoading={isCreateLoading || isUpdateLoading}
                                    children={
                                        <ExercisesItems
                                            date={currentDate}
                                            exercises={[...exercises]}
                                            onEditClick={onExerciseEdit}
                                            isDelete={isDelete}
                                        />
                                    }
                                />
                            )}
                        </div>
                        <CalendarDrawer
                            date={currentDate}
                            modalProps={{
                                isOpen: isDrawerOpen,
                                onCloseClick: () => setIsDrawerOpen(false),
                            }}
                            toDelete={() => setIsDelete(true)}
                        />
                        <TrainingsErrorModal
                            modalProps={{
                                isOpen: isErrorModalOpen,
                                onCloseClick: () => setIsErrorModalOpen(false),
                            }}
                            onRefreshClick={() => {
                                setIsErrorModalOpen(false);
                                getTrainingsList();
                            }}
                        ></TrainingsErrorModal>
                        <TrainingsErrorModal
                            modalProps={{
                                isOpen: isErrorSaveModalOpen,
                                onCloseClick: () => setIsErrorSaveModalOpen(false),
                            }}
                            onRefreshClick={() => {
                                setIsErrorSaveModalOpen(false);
                            }}
                            isToSave={true}
                        ></TrainingsErrorModal>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
