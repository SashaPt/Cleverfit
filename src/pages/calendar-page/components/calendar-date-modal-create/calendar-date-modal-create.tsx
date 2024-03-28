import './calendar-date-modal-create.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import moment, { Moment } from 'moment';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
    selectCalendarResponse,
    selectCurrentTraining,
    selectIsMobile,
    selectModalLeft,
    selectModalTop,
    selectSelected,
    selectTrainingsList,
    setCalendarAction,
    setCurrentTraining,
    setEditedTraining,
    setSelected,
} from '@redux/calendar/calendarSlice';
import { Button, Modal, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useCurrentTrainingsNames } from '@hooks/useCurrentData';
import { ModalProps } from '../../../../types/common/common';

export const CalendarDateModalCreate: React.FC<{
    modalProps: ModalProps
    date: Moment;
    onBackClick: () => void;
    onAddClick: () => void;
    onSaveClick: () => void;
    disabledSave: boolean;
    saveLoading: boolean;
    children?: JSX.Element;
}> = ({
    modalProps,
    date,
    onBackClick,
    onAddClick,
    onSaveClick,
    disabledSave,
    saveLoading,
    children,
}) => {
    const currentTraining = useAppSelector(selectCurrentTraining);
    const trainingsList = useAppSelector(selectTrainingsList);
    const userTrainings = useAppSelector(selectCalendarResponse);
    const currentTrainings = useCurrentTrainingsNames(date, userTrainings);
    const selectDefault = 'Выбор типа тренировки';
    const selected = useAppSelector(selectSelected);
    const top = useAppSelector(selectModalTop);
    const left = useAppSelector(selectModalLeft);
    const isMobile = useAppSelector(selectIsMobile);
    const dispatch = useDispatch();
    return (
        <Modal
            className='calendar-date-modal calendar-date-modal-create'
            data-test-id='modal-create-exercise'
            open={modalProps.isOpen}
            mask={false}
            maskClosable={false}
            closable={false}
            getContainer={'.calendar-modals'}
            onCancel={() => {
                modalProps.onCloseClick();
                dispatch(setSelected(selectDefault));
            }}
            style={!isMobile ? { top, left } : {}}
            title={
                <div className='calendar-date-modal-header'>
                    <Button
                        data-test-id='modal-exercise-training-button-close'
                        className='calendar-modal-close-button'
                        onClick={() => {
                            onBackClick();
                            dispatch(setSelected(selectDefault));
                        }}
                        icon={<ArrowLeftOutlined style={{ fontSize: '16px' }} />}
                    />
                    <Select
                        data-test-id='modal-create-exercise-select'
                        defaultValue={selectDefault}
                        options={[...trainingsList]
                            .filter((training) => !currentTrainings.has(training.name))
                            .map((item) => {
                                return { value: item.key, label: item.name };
                            })}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(value, option: any) => {
                            dispatch(setSelected(value));
                            dispatch(setCurrentTraining(option?.label));
                            if (value) {
                                dispatch(setEditedTraining(null));
                            }
                        }}
                        value={selected}
                    />
                </div>
            }
            footer={[
                <Button
                    key='add'
                    block={true}
                    disabled={!currentTraining}
                    onClick={() => {
                        dispatch(setCalendarAction('toAdd'));
                        onAddClick();
                    }}
                >
                    Добавить упражнения
                </Button>,
                <Button
                    type='text'
                    key='submit'
                    block={true}
                    disabled={disabledSave}
                    loading={saveLoading}
                    style={{
                        color: saveLoading ? '#1d39c4' : disabledSave ? '#bfbfbf' : '#2f54eb',
                    }}
                    onClick={() => {
                        onSaveClick();
                        dispatch(setSelected(selectDefault));
                    }}
                >
                    {date.isSameOrBefore(moment()) ? 'Сохранить изменения' : 'Сохранить'}
                </Button>,
            ]}
        >
            {children}
        </Modal>
    );
};
