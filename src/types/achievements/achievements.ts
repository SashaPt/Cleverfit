import { TrainingsSuccess } from '../../types/calendar/calendar';
import { Moment } from 'moment';

export type StatisticsData = {
    currentItems: TrainingsSuccess[];
    weight: number;
    replays: number;
    approaches: number;
    exercises: number,
    date: Moment;
};
