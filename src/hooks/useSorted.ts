import { useMemo } from 'react';
import { FeedbackSuccess } from '../types/feedbacks/feedbacks';

export const useSorted = (array: FeedbackSuccess[]) => {
    const sortedArray = useMemo(() => {
        if (array.length) {
            const sorted = [...array].sort((a, b) => {
                return (
                    new Date(Date.parse(b.createdAt)).getTime() -
                    new Date(Date.parse(a.createdAt)).getTime()
                );
            });
            return sorted;
        }
        return array;
    }, [array]);
    return sortedArray;
};
