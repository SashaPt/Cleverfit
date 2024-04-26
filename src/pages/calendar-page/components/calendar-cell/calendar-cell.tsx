import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarResponse,
    selectIsMobile,
    setCurrentTraining,
    setModalLeft,
    setModalTop,
} from '@redux/calendar/calendarSlice';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TrainingsItems } from '../trainings-items/trainings-items';
import { CALENDAR_MODAL_WIDTH } from '@constants/constants';
import { useCurrentTrainings } from '@hooks/useCurrentData';
import { isArrayWithItems } from '@utils/utils';
import classNames from 'classnames';

export const CalendarCell: React.FC<{
    date: Moment;
    onCellClick?: () => void;
    small?: boolean;
}> = ({ date, onCellClick, small }) => {
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
        dispatch(setCurrentTraining(''));
        if (!small && (!isMobile || e.currentTarget.closest('.ant-picker-cell-in-view'))) {
            e.stopPropagation();
            setCurrentElement(e.currentTarget);
            setPosition(e.currentTarget);
            onCellClick && onCellClick();
        }
        if (small && date.isSameOrBefore(moment())) {
            e.stopPropagation();
        }
    };

    const cellClass = classNames({
        'ant-picker-cell-inner ant-picker-calendar-date': true,
        'ant-picker-calendar-date-today': isToday,
        'calendar-cell-previous': small && date.isSameOrBefore(moment()),
        'calendar-cell-full': isArrayWithItems(currentTrainings),
    });

    useEffect(() => {
        const handleResize = () => {
            if (currentCellElement) setPosition(currentCellElement);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCellElement]);
    return (
        <div onClick={onCalendarCellClick} className={cellClass}>
            <>
                <div className='ant-picker-calendar-date-value'>
                    {!isMobile && !small ? date.format('DD') : date.format('D')}
                </div>
                {!isMobile && !small && (
                    <div className='ant-picker-calendar-date-content'>
                        <TrainingsItems date={date} editable={false} />
                    </div>
                )}
            </>
        </div>
    );
};
