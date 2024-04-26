import './statistics-cards.scss';
import { StatisticsData } from '../../../../types/achievements/achievements';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';

export const StatisticsCards: React.FC<{
    data: StatisticsData[];
    period: string;
}> = ({ data, period }) => {
    const commonWeight = [...data].reduce((c, i) => (c += i.weight), 0);
    const weightPerDay = Math.round((commonWeight / data.length || 0) * 10) / 10;
    const commonReplays = [...data].reduce((c, i) => (c += i.replays), 0);
    const commonApproaches = [...data].reduce((c, i) => (c += i.approaches), 0);

    const cardsData = [
        {
            id: 1,
            title: `${commonWeight}`,
            description: (
                <>
                    {'Общая '}
                    <br />
                    нагрузка, кг
                </>
            ),
        },
        {
            id: 2,
            title: `${weightPerDay}`.replace('.', ','),
            description: (
                <>
                    {'Нагрузка '}
                    <br />в день, кг
                </>
            ),
        },
        {
            id: 3,
            title: `${commonReplays}`,
            description: (
                <>
                    {'Количество '}
                    <br />
                    повторений, раз
                </>
            ),
        },
        {
            id: 4,
            title: `${commonApproaches}`,
            description: (
                <>
                    {'Подходы, '}
                    <br />
                    раз
                </>
            ),
        },
    ];

    return (
        <div className='statistics-cards'>
            {cardsData.map((item) => (
                <Card
                    key={item.id}
                    className={`statistics-card ${period === 'month' ? 'statistics-card-m' : ''}`}
                >
                    <Meta title={item.title} description={item.description} />
                </Card>
            ))}
        </div>
    );
};
