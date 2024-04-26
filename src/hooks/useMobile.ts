import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '@redux/calendar/calendarSlice';

export const useMobile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const handleResize = () => {
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
    }, [dispatch]);
};
