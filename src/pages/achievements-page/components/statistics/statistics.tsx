import './statistics.scss';
import emptyImg from '/empty_statistics.svg';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectCalendarResponse, selectTrainingsList } from '@redux/calendar/calendarSlice';
import { useFilterData } from '@hooks/useFilterData';
import { usePeriodData } from '@hooks/usePeriodData';
import { Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { StatisticsLoad } from '../statistics-load/statistics-load';
import { StatisticsCards } from '../statistics-cards/statistics-cards';
import { StatisticsPopular } from '../statistics-popular/statistics-popular';
import { StatisticsExercises } from '../statistics-exercises/statistics-exercises';

export const Statistics: React.FC<{ period: string }> = ({ period }) => {
    const userTrainings = useAppSelector(selectCalendarResponse);
    const trainingsList = useAppSelector(selectTrainingsList);
    const [filter, setFilter] = useState('');

    const filteredPeriodData = useFilterData(userTrainings, filter);
    const periodTrainings = usePeriodData(filteredPeriodData, period);

    const onFilterChange = (e: RadioChangeEvent) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <div className='statistics-filters'>
                <div>Тип тренировки :</div>
                <Radio.Group
                    defaultValue=''
                    optionType='button'
                    size='small'
                    onChange={onFilterChange}
                    value={filter}
                >
                    <Radio.Button value=''>Все</Radio.Button>
                    {trainingsList.map((training) => (
                        <Radio.Button key={training.key} value={training.name}>
                            {training.name}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </div>
            {filteredPeriodData.length ? (
                <>
                    <StatisticsLoad data={periodTrainings} period={period} />
                    <StatisticsCards data={periodTrainings} period={period} />
                    <StatisticsPopular data={periodTrainings} filter={filter} />
                    <StatisticsExercises data={periodTrainings} period={period} />
                </>
            ) : (
                <div className='statictics-empty'>
                    <img src={emptyImg} alt='empty' />
                    <div>
                        Ой, такой тренировки{' '}
                        {period === 'week' ? <>на&nbsp;этой неделе</> : <>в&nbsp;этом месяце</>}{' '}
                        не&nbsp;было.
                    </div>
                </div>
            )}
        </>
    );
};
