import { useMemo } from 'react';
import { FeedbackSuccess } from '../types/feedbacks/feedbacks';
import { TrainingPartner } from '../types/training/training';
import { isArrayWithItems } from '@utils/utils';

export const useSortedFeedbacks = (array: FeedbackSuccess[]) => {
    const sortedArray = useMemo(() => {
        if (isArrayWithItems(array)) {
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

export const useSortedPartners = (array: TrainingPartner[]) => {
    const toSort = (arr: TrainingPartner[]) => [...arr].sort((a, b) => (a.name < b.name ? -1 : 1));

    const sortedArray = useMemo(() => {
        if (isArrayWithItems(array)) {
            const sortedByStatus = [
                ...toSort([...array].filter((item) => item.status === 'accepted')),
                ...toSort([...array].filter((item) => item.status === 'pending')),
                ...toSort([...array].filter((item) => !item.status)),
                ...toSort([...array].filter((item) => item.status === 'rejected')),
            ];

            return sortedByStatus;
        }
        return array;
    }, [array]);
    return sortedArray;
};
