import './trainings-select.scss';
import type { Moment } from 'moment';
import { Select } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectCalendarAction,
    selectCalendarResponse,
    selectSelected,
    selectTrainingsList,
    setCurrentTraining,
    setEditedTraining,
    setSelected,
} from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';
import { useCurrentTrainingsNames } from '@hooks/useCurrentData';
import { useEffect, useMemo } from 'react';
import { SELECT_DEFAULT } from '@constants/constants';

export const TrainingsSelect: React.FC<{ date: Moment | null; bordered?: boolean }> = ({
    date,
    bordered,
}) => {
    const userTrainings = useAppSelector(selectCalendarResponse);
    const trainingsList = useAppSelector(selectTrainingsList);
    const currentTrainings = useCurrentTrainingsNames(date, userTrainings);
    const action = useAppSelector(selectCalendarAction);
    const selected = useAppSelector(selectSelected);
    const dispatch = useDispatch();

    const options = useMemo(() => {
        return date
            ? [...trainingsList]
                  .filter((training) => !currentTrainings.has(training.name))
                  .map((item) => {
                      return { value: item.key, label: item.name };
                  })
            : [...trainingsList].map((item) => {
                  return { value: item.key, label: item.name };
              });
    }, [currentTrainings, date, trainingsList]);

    useEffect(() => {
        if (
            bordered &&
            action !== 'toEdit' &&
            !options.find((option) => option.value === selected)
        ) {
            dispatch(setSelected(SELECT_DEFAULT));
        }
    }, [action, bordered, dispatch, options, selected]);

    return (
        <Select
            className={`trainings-select ${!bordered ? 'trainings-select-unbordered' : ''}`}
            data-test-id='modal-create-exercise-select'
            defaultValue={SELECT_DEFAULT}
            disabled={bordered && action === 'toEdit'}
            options={options}
            onChange={(
                value,
                option: { label: string; value: string } | { label: string; value: string }[],
            ) => {
                dispatch(setSelected(value));
                dispatch(setCurrentTraining(!Array.isArray(option) ? option.label : ''));
                if (value) {
                    dispatch(setEditedTraining(null));
                }
            }}
            value={selected}
        />
    );
};
