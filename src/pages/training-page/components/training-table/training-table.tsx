import './training-table.scss';
import { Button, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarResponse,
    selectPathToNavigate,
    selectTrainingsList,
    setCalendarAction,
    setCurrentTraining,
    setEditedTraining,
    setExercises,
    setModalLeft,
    setModalTop,
    setSelected,
} from '@redux/calendar/calendarSlice';
import { TrainingsItems } from '@pages/calendar-page/components/trainings-items/trainings-items';
import moment from 'moment';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainingsSuccess } from '../../../../types/calendar/calendar';
import { TrainingPeriodCell } from '../training-period-cell/training-period-cell';
import { useDispatch } from 'react-redux';
const { Title } = Typography;

interface DataType {
    item: TrainingsSuccess;
    index: number;
    period: number;
}

export const TrainingTable: React.FC<{
    onCreateClick: () => void;
    onEditClick: () => void;
    onInfoOpenClick: () => void;
}> = ({ onCreateClick, onEditClick, onInfoOpenClick }) => {
    const [isLoading, setIsloading] = useState(true);
    const [currentCellElement, setCurrentCellElement] = useState<HTMLElement>();
    const userTrainings = useAppSelector(selectCalendarResponse);
    const trainingsList = useAppSelector(selectTrainingsList);
    const pathToNavigate = useAppSelector(selectPathToNavigate);
    const dispatch = useDispatch();

    const setPosition = (target: HTMLElement) => {
        const topEl =
            target.closest('.ant-table-cell')?.getBoundingClientRect().top || 0 + window.scrollY;
        const rightEl = target.closest('.ant-table-cell')?.getBoundingClientRect().right || 0;

        dispatch(setModalTop(`${topEl}px`));
        dispatch(setModalLeft(`${rightEl - 241}px`));
    };
    const onOpen = (e: React.MouseEvent<HTMLElement>) => {
        setCurrentCellElement(e.currentTarget);
        setPosition(e.currentTarget);
    };

    useEffect(() => {
        const handleResize = () => {
            if (currentCellElement) setPosition(currentCellElement);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCellElement]);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'name',
            render: (_, { item }) => (
                <div className='training-table-type'>
                    <TrainingsItems
                        date={moment(item.date)}
                        editable={true}
                        keys={[{ name: item.name, _id: item._id }]}
                    />
                    <DownOutlined
                        style={{ fontSize: '10px' }}
                        onClick={(e) => {
                            onInfoOpenClick();
                            onOpen(e);
                            dispatch(setCurrentTraining(item.name));
                            dispatch(setExercises(item.exercises));
                            dispatch(setCalendarAction('toEdit'));
                            dispatch(setSelected(item.name));
                            dispatch(setEditedTraining(item));
                        }}
                    />
                </div>
            ),
        },
        {
            title: 'Периодичность',
            dataIndex: 'period',
            width: '240px',
            sorter: (a, b) => a.period - b.period,
            render: (_, { item, period, index }) => (
                <TrainingPeriodCell
                    item={item}
                    period={period}
                    index={index}
                    onEditClick={onEditClick}
                />
            ),
        },
    ];

    const data: DataType[] = [...userTrainings].map((item, index) => {
        return {
            key: item._id,
            item: item,
            index: index,
            period: item.parameters?.period || 0,
        };
    });

    useEffect(() => {
        setIsloading(false);
    }, []);
    return (
        <>
            {(pathToNavigate && userTrainings.length) || !pathToNavigate ? (
                <>
                    <Table
                        className='training-table'
                        data-test-id='my-trainings-table'
                        columns={columns}
                        dataSource={data}
                        size='small'
                        pagination={{
                            position: ['bottomLeft'],
                            defaultPageSize: 10,
                            hideOnSinglePage: true,
                            showSizeChanger: false,
                        }}
                    />
                    {!!trainingsList.length && (
                        <Button
                            type='primary'
                            className='training-table-button'
                            data-test-id='create-new-training-button'
                            icon={<PlusOutlined />}
                            onClick={() => {
                                onCreateClick();
                                dispatch(setCalendarAction('toAdd'));
                            }}
                        >
                            Новая тренировка
                        </Button>
                    )}
                </>
            ) : (
                !isLoading && (
                    <div className='training-empty'>
                        <Title className='training-empty-title' level={3}>
                            У вас ещё нет созданных тренировок
                        </Title>
                        {!!trainingsList.length && (
                            <Button
                                type='primary'
                                className='training-empty-button'
                                onClick={() => {
                                    onCreateClick();
                                    dispatch(setCalendarAction('toAdd'));
                                }}
                            >
                                Создать тренировку
                            </Button>
                        )}
                    </div>
                )
            )}
        </>
    );
};
