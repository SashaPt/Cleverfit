import './statistics-list.scss';
import { Collapse, List } from 'antd';
import { StatisticsListItem } from '../statistics-list-item/statistics-list-item';
import { DM_FORMAT } from '@constants/constants';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectIsMobile } from '@redux/calendar/calendarSlice';
import { StatisticsData } from '../../../../types/achievements/achievements';
const { Panel } = Collapse;

export const StatisticsList: React.FC<{
    data: StatisticsData[];
    isForPopularEx?: boolean;
    period: string;
}> = ({ data, isForPopularEx, period }) => {
    const listData = [...data]
        .map((i) => ({ ...i, weight: Math.round(i.weight / i.exercises) }))
        .sort((a, b) => (a.date.isoWeekday() < b.date.isoWeekday() ? -1 : 1));

    const firstDate = data[0].date.format(DM_FORMAT);
    const lastDate = data[data.length - 1].date.format(DM_FORMAT);
    const isMobile = useAppSelector(selectIsMobile);

    const StatisticsListSubtitle = isForPopularEx ? (
        <div className='statistics-list-subtitle'>
            Самые частые упражнения
            <br />
            по дням недели {period == 'month' ? 'за месяц' : ''}
        </div>
    ) : period == 'month' ? (
        <div className='statistics-list-subtitle'>
            Неделя {firstDate}-{lastDate}
        </div>
    ) : (
        <div className='statistics-list-subtitle subtitle-week'>
            {'Средняя нагрузка '}
            <br />
            по дням недели
        </div>
    );

    const StatisticsListItems = (
        <List
            className='statistics-list-items'
            dataSource={listData}
            renderItem={(item, index) => (
                <StatisticsListItem
                    item={item}
                    index={index}
                    isForPopularEx={isForPopularEx}
                    period={period}
                />
            )}
        />
    );

    return (
        <>
            {isMobile && !isForPopularEx && period === 'month' ? (
                <Collapse className='statistics-list' ghost expandIconPosition='end'>
                    <Panel key='1' header={StatisticsListSubtitle}>
                        {StatisticsListItems}
                    </Panel>
                </Collapse>
            ) : (
                <div className='statistics-list'>
                    {StatisticsListSubtitle}
                    {StatisticsListItems}
                </div>
            )}
        </>
    );
};
