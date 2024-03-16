import './calendar-date-modal.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { Moment } from 'moment';
import { selectIsMobile, selectModalLeft, selectModalTop } from '@redux/calendar/calendarSlice';

export const CalendarDateModal: React.FC<{
    isOpen: boolean;
    onCloseClick: () => void;
    onCreateClick: () => void;
    disabled: boolean;
    currentDate: Moment;
    children: JSX.Element;
}> = ({ isOpen, onCloseClick, onCreateClick, disabled, currentDate, children }) => {
    const top = useAppSelector(selectModalTop);
    const left = useAppSelector(selectModalLeft);
    const isMobile = useAppSelector(selectIsMobile);

    return (
        <Modal
            className='calendar-date-modal'
            open={isOpen}
            data-test-id='modal-create-training'
            mask={false}
            maskClosable={false}
            closable={false}
            getContainer={'.calendar-modals'}
            onCancel={onCloseClick}
            style={!isMobile ? { top, left } : {}}
            title={
                <div className='calendar-date-modal-header'>
                    <div>Тренировки на {currentDate.format('DD.MM.YYYY')}</div>{' '}
                    <Button
                        className='calendar-modal-close-button'
                        data-test-id='modal-create-training-button-close'
                        onClick={onCloseClick}
                        icon={<CloseOutlined style={{ fontSize: '12px' }} />}
                    />
                </div>
            }
            footer={[
                <Button
                    type='primary'
                    key='create'
                    block={true}
                    className='calendar-date-modal-button'
                    onClick={onCreateClick}
                    disabled={disabled}
                >
                    Создать тренировку
                </Button>,
            ]}
        >
            {children}
        </Modal>
    );
};
