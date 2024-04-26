import './statistics-popular.scss';
import { usePopularExercise, usePopularTraining } from '@hooks/usePopularType';
import { getTrainingName } from '@utils/trainings-names';
import { StatisticsData } from '../../../../types/achievements/achievements';
import { TrainingsSuccess } from '../../../../types/calendar/calendar';

export const StatisticsPopular: React.FC<{
    data: StatisticsData[];
    filter: string;
}> = ({ data, filter }) => {
    const currentTrainings:TrainingsSuccess[] = [];
    [...data].forEach(item => {
        currentTrainings.push(...item.currentItems)
    })
    const popularTraining = usePopularTraining(currentTrainings);
    const popularExercise = usePopularExercise(currentTrainings, filter);
    const training = getTrainingName(filter);

    const popularData = [
        {
            id: 1,
            title: (
                <>
                    Самая частая <br />
                    тренировка
                </>
            ),
            value: popularTraining?.toLowerCase(),
            withFilter: !filter,
        },
        {
            id: 2,
            title: (
                <>
                    Самое частое <br />
                    упражнение{' '}
                    {training ? (
                        <>
                            <br />
                            {training}
                        </>
                    ) : (
                        ''
                    )}
                </>
            ),
            value: popularExercise?.toLowerCase(),
            withFilter: true,
        },
    ];

    return (
        <div className='statistics-popular'>
            {popularData.map(
                (item) =>
                    item.withFilter && (
                        <div key={item.id} className='statistics-popular-line'>
                            <div className='statistics-popular-title'>{item.title}</div>
                            <div className='statistics-popular-value'>{item.value}</div>
                        </div>
                    ),
            )}
        </div>
    );
};
