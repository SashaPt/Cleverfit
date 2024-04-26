import './statistics-list-item.scss';
import { getDayOfWeek } from '@utils/days-of-week';
import classNames from 'classnames';
import { Badge, List } from 'antd';
import { DATE_FORMAT } from '@constants/constants';
import { StatisticsData } from '../../../../types/achievements/achievements';
import { usePopularExercise } from '@hooks/usePopularType';

export const StatisticsListItem: React.FC<{
    item: StatisticsData;
    index: number;
    period: string;
    isForPopularEx?: boolean;
}> = ({ item, index, isForPopularEx, period }) => {
    const popularEx = usePopularExercise(item.currentItems, '');

    const itemClass = classNames({
        'statistics-list-item': true,
        'statistics-list-item-month': period === 'month',
        'statistics-list-item-popular': isForPopularEx,
    });
    const badgeClass = classNames({
        'statistics-list-badge': true,
        'statistics-list-badge-empty': !item.weight,
        'statistics-list-badge-popular': isForPopularEx,
    });

    return (
        <List.Item className={itemClass}>
            <Badge className={badgeClass} count={index + 1} />
            <div className='item-day'>
                {period === 'week' || isForPopularEx
                    ? getDayOfWeek(item.date.isoWeekday())
                    : item.date.format(DATE_FORMAT)}{' '}
            </div>
            <div className='item-value'>{isForPopularEx ? !!popularEx &&  popularEx : !!item.weight && `${item.weight} кг`} </div>
        </List.Item>
    );
};
