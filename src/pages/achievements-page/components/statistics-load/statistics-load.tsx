import './statistics-load.scss';
import { Column } from '@ant-design/charts';
import classNames from 'classnames';
import { DM_FORMAT } from '@constants/constants';
import { StatisticsList } from '../statistics-list/statistics-list';
import { divideArray } from '@utils/utils';
import { StatisticsData } from '../../../../types/achievements/achievements';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectIsMobile } from '@redux/calendar/calendarSlice';

export const StatisticsLoad: React.FC<{
    data: StatisticsData[];
    period: string;
}> = ({ data, period }) => {
    const isMobile = useAppSelector(selectIsMobile);

    const colomnData = data.map((item) => ({
        ...item,
        date: item.date.format(DM_FORMAT),
        weightA: Math.round(item.weight / item.exercises),
    }));

    const staticticData = divideArray(data, 7);

    const config = {
        data: colomnData,
        insetTop: isMobile ? 0 : 16,
        insetLeft: -10,
        height: isMobile ? 236 : 374,
        xField: 'date',
        yField: 'weightA',
        interaction: false,
        tooltip: false,
        animation:false,
        scrollbar: period === 'month' && {
            x: {
                ratio: isMobile ? 0.25 : 0.54,
            },
        },

        style: {
            maxWidth: isMobile ? 19 : 30,
            fill: '#85A5FF',
        },
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: isMobile ? 8 : 16,
                titleFontSize: isMobile ? 10 : 14,
                tick: false,
            },
            y: {
                labelFormatter: (weightA: string) => `${weightA} кг`,
                tick: false,
            },
        },
    };

    const columnClass = classNames({
        'statistics-column': true,
        'statistics-column-month': period === 'month',
    });

    return (
        <>
            <div className='statistics-load'>
                <Column className={columnClass} {...config} />
                {period === 'week' ? (
                    <StatisticsList data={data} period={period} />
                ) : (
                    <div className='statistics-info'>
                        {staticticData.map((itemData) => (
                            <StatisticsList
                                key={itemData[0].date.toJSON()}
                                data={itemData}
                                period={period}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
