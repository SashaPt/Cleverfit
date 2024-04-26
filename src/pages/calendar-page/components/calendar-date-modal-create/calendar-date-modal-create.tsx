import './calendar-date-modal-create.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import moment, { Moment } from 'moment';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
    selectCurrentTraining,
    selectIsMobile,
    selectModalLeft,
    selectModalTop,
    setCalendarAction,
    setSelected,
} from '@redux/calendar/calendarSlice';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { ModalProps } from '../../../../types/common/common';
import { TrainingsSelect } from '../trainings-select/trainings-select';
import { SELECT_DEFAULT} from '@constants/constants';

export const CalendarDateModalCreate: React.FC<{
    modalProps: ModalProps;
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
                dispatch(setSelected(SELECT_DEFAULT));
            }}
            style={!isMobile ? { top, left } : {}}
            title={
                <div className='calendar-date-modal-header'>
                    <Button
                        data-test-id='modal-exercise-training-button-close'
                        className='calendar-modal-close-button'
                        onClick={() => {
                            onBackClick();
                            dispatch(setSelected(SELECT_DEFAULT));
                        }}
                        icon={<ArrowLeftOutlined style={{ fontSize: '16px' }} />}
                    />
                    <TrainingsSelect date={date} />
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
                        dispatch(setSelected(SELECT_DEFAULT));
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
