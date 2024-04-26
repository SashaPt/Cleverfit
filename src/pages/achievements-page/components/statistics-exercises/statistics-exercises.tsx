import './statistics-exercises.scss';
import { StatisticsData } from '../../../../types/achievements/achievements';
import { StatisticsList } from '../statistics-list/statistics-list';
import { Pie } from '@ant-design/plots';
import { useConcatData, useWeekDaysData } from '@hooks/usePeriodData';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectIsMobile } from '@redux/calendar/calendarSlice';

export const StatisticsExercises: React.FC<{
    data: StatisticsData[];
    period: string;
}> = ({ data, period }) => {
    const daysData = useWeekDaysData([...data]);
    const exData = useConcatData([...daysData]);
    const isMobile = useAppSelector(selectIsMobile);

    const config = {
        data: exData,
        padding: isMobile ? 16 : 50,
        angleField: 'value',
        colorField: 'ex',
        innerRadius: 0.7,
        animation: false,
        style: {
            stroke: '#f0f0f0',
        },
        label: {
            text: 'ex',
            offset: 50,
            style: {
                fontSize: 14,
                fill: '#242424',
                textAlign: 'center',
            },
        },
        legend: false,
        tooltip: false,
    };
    return (
        <div className='statistics-exercises'>
            <Pie className='statistics-pie' {...config} />
            <StatisticsList data={daysData} period={period} isForPopularEx={true} />
        </div>
    );
};
