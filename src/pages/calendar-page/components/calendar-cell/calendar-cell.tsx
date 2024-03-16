import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarResponse,
    selectIsMobile,
    setIsMobile,
    setModalLeft,
    setModalTop,
} from '@redux/calendar/calendarSlice';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TrainingsItems } from '../trainings-items/trainings-items';
import { CALENDAR_MODAL_WIDTH } from '@constants/constants';
import { useCurrentTrainings } from '@hooks/useCurrentData';

export const CalendarCell: React.FC<{
    date: Moment;
    onCellClick: () => void;
}> = ({ date, onCellClick }) => {
    const [currentCellElement, setCurrentElement] = useState<HTMLElement>();
    const isMobile = useAppSelector(selectIsMobile);
    const userData = useAppSelector(selectCalendarResponse);
    const currentTrainings = useCurrentTrainings(date, userData);
    const dispatch = useDispatch();

    const isToday =
        date.date() == moment().date() &&
        date.month() == moment().month() &&
        date.year() == moment().year();

    const setPosition = (target: HTMLElement) => {
        const topEl = target.getBoundingClientRect().top + window.scrollY;
        const leftEl = target.getBoundingClientRect().left;
        const rightEl = target.getBoundingClientRect().right;
        const rightParent = target.closest('.ant-picker-calendar')?.getBoundingClientRect().right;

        dispatch(setModalTop(`${topEl}px`));
        if (rightParent && rightEl && rightParent - rightEl > CALENDAR_MODAL_WIDTH) {
            dispatch(setModalLeft(`${leftEl}px`));
        } else {
            if (rightEl) {
                dispatch(setModalLeft(`${rightEl - CALENDAR_MODAL_WIDTH}px`));
            }
        }
    };

    const onCalendarCellClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!isMobile || e.currentTarget.closest('.ant-picker-cell-in-view')) {
            e.stopPropagation();
            setCurrentElement(e.currentTarget);
            setPosition(e.currentTarget);
            onCellClick();
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (currentCellElement) setPosition(currentCellElement);
            if (window.innerWidth <= 600) {
                dispatch(setIsMobile(true));
            } else {
                dispatch(setIsMobile(false));
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCellElement]);
    return (
        <div
            onClick={onCalendarCellClick}
            className={` ant-picker-cell-inner ant-picker-calendar-date ${
                isToday ? 'ant-picker-calendar-date-today' : ''
            } ${currentTrainings.length ? 'calendar-cell-full' : 'calendar-cell-empty'}`}
        >
            <>
                <div className='ant-picker-calendar-date-value'>
                    {!isMobile ? date.format('DD') : date.format('D')}
                </div>
                {!isMobile && (
                    <div className='ant-picker-calendar-date-content'>
                        <TrainingsItems date={date} editable={false} />
                    </div>
                )}
            </>
        </div>
    );
};
