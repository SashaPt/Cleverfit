import './training-page.scss';
import { Alert, Badge, Layout, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageSider } from '@components/sider/pageSider';
import { PageHeader } from '@components/header/pageHeader';
import { Content } from 'antd/lib/layout/layout';
import { Paths } from '../../routes/paths';
import { useLazyGetTrainingsListQuery } from '../../services/calendarApi';
import { Loader } from '@components/loader/loader';
import { useDispatch } from 'react-redux';
import {
    selectCalendarAction,
    selectEditedTraining,
    setEditedTraining,
    setExercises,
    setSelected,
    setTrainingsList,
} from '@redux/calendar/calendarSlice';
import { TrainingsErrorModal } from '@pages/calendar-page/components/trainigs-error-modal/trainigs-error-modal';
import { TrainingTable } from './components/training-table/training-table';
import { TrainingDrawer } from './components/training-drawer/training-drawer';
import { Marathons } from './components/marathons/marathons';
import { TrainingInfoModal } from './components/training-info-modal/training-info-modal';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { PARTNERS_LIMIT, SELECT_DEFAULT } from '@constants/constants';
import { CommonTrainings } from './components/common-trainings/common-trainings';
import { selectMyInvites, selectPartners } from '@redux/training/trainingSlice';

export const TrainingPage: React.FC = () => {
    const [getTrainings, { isLoading }] = useLazyGetTrainingsListQuery();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isErrorModalSaveOpen, setIsErrorModalSaveOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMarathons, setIsMarathons] = useState(false);
    const [isModalInfo, setIsModalInfo] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const editedTraining = useAppSelector(selectEditedTraining);
    const action = useAppSelector(selectCalendarAction);
    const myInvites = useAppSelector(selectMyInvites);
    const partners = useAppSelector(selectPartners);
    const dispatch = useDispatch();

    const getTrainingsList = async () => {
        try {
            const resp = await getTrainings(null).unwrap();
            dispatch(setTrainingsList(resp));
        } catch (error) {
            setIsErrorModalOpen(true);
        }
    };

    const onChange = (activeKey: string) => {
        if (activeKey === '3') {
            setIsMarathons(true);
        } else {
            setIsMarathons(false);
        }
    };

    const reset = () => {
        dispatch(setSelected(SELECT_DEFAULT));
        dispatch(setEditedTraining(null));
        dispatch(setExercises([]));
    };

    useEffect(() => {
        getTrainingsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {isLoading && <Loader />}
            <Layout className='training-page'>
                <PageSider menuActive='training' />
                <Layout className='training-content'>
                    <PageHeader
                        isMain={false}
                        isSettings={true}
                        breadcrumbs={[
                            { id: 1, name: 'Главная', href: Paths.MAIN },
                            { id: 2, name: 'Тренировки', href: '' },
                        ]}
                    />
                    <Content>
                        <div className='_container'>
                            <div
                                className={`training-container ${
                                    isMarathons ? 'training-container-m' : ''
                                }`}
                            >
                                <Tabs
                                    className='training-tabs'
                                    animated={false}
                                    defaultActiveKey='1'
                                    onChange={onChange}
                                    items={[
                                        {
                                            label: `Мои тренировки`,
                                            key: '1',
                                            children: (
                                                <TrainingTable
                                                    onCreateClick={() => {
                                                        setIsDrawerOpen(true);
                                                    }}
                                                    onEditClick={() => {
                                                        setIsDrawerOpen(true);
                                                    }}
                                                    onInfoOpenClick={() => setIsModalInfo(true)}
                                                />
                                            ),
                                        },
                                        {
                                            label: (
                                                <>
                                                    Совместные тренировки
                                                    {partners.length < PARTNERS_LIMIT &&
                                                        !!myInvites.length && (
                                                            <Badge count={myInvites.length} />
                                                        )}
                                                </>
                                            ),
                                            key: '2',
                                            children: (
                                                <CommonTrainings
                                                    onCreateClick={() => {
                                                        setIsDrawerOpen(true);
                                                    }}
                                                />
                                            ),
                                        },
                                        {
                                            label: `Марафоны`,
                                            key: '3',
                                            children: <Marathons />,
                                        },
                                    ]}
                                />

                                <TrainingDrawer
                                    modalProps={{
                                        isOpen: isDrawerOpen,
                                        onCloseClick: () => {
                                            setIsDrawerOpen(false);
                                        },
                                    }}
                                    alertOpen={() => setIsAlertVisible(true)}
                                    errorModalOpen={() => setIsErrorModalSaveOpen(true)}
                                />
                                {isAlertVisible && (
                                    <Alert
                                        className='profile-alert'
                                        data-test-id='create-training-success-alert'
                                        message={
                                            action === 'toAdd'
                                                ? 'Новая тренировка успешно добавлена'
                                                : 'Тренировка успешно обновлена'
                                        }
                                        type='success'
                                        showIcon
                                        closable
                                        onClose={() => setIsAlertVisible(false)}
                                    />
                                )}
                            </div>
                        </div>
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
                                isOpen: isErrorModalSaveOpen,
                                onCloseClick: () => {
                                    reset();
                                    setIsErrorModalSaveOpen(false);
                                    setIsModalInfo(false);
                                },
                            }}
                            onRefreshClick={() => {
                                reset();
                                setIsErrorModalSaveOpen(false);
                                setIsModalInfo(false);
                            }}
                            isToSave={true}
                        ></TrainingsErrorModal>
                        <TrainingInfoModal
                            item={editedTraining}
                            onCreateClick={() => setIsDrawerOpen(true)}
                            modalProps={{
                                isOpen: isModalInfo,
                                onCloseClick: () => {
                                    reset();
                                    setIsModalInfo(false);
                                },
                            }}
                        />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
