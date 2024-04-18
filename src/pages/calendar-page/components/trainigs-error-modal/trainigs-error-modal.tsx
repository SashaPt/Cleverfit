import './trainigs-error-modal.scss';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { ModalProps } from '../../../../types/common/common';
import { Button, Card, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';

export const TrainingsErrorModal: React.FC<{
    modalProps: ModalProps;
    onRefreshClick: () => void;
    isToSave?: boolean;
}> = ({ modalProps, onRefreshClick, isToSave }) => (
    <Modal
        className={`trainings-error-modal ${isToSave ? 'trainings-error-modal-save' : ''}`}
        open={modalProps.isOpen}
        footer={null}
        centered={true}
        width={'fit-content'}
        closable={false}
        bodyStyle={{ padding: 0 }}
    >
        {!isToSave && (
            <Button
                data-test-id='modal-error-user-training-button-close'
                className='trainings-error-modal-close'
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '28px',
                    zIndex: 2,
                }}
                onClick={modalProps.onCloseClick}
                icon={<CloseOutlined style={{ fontSize: '12px' }} />}
            />
        )}
        <Card
            className='trainings-error-modal-card'
            bordered={false}
            bodyStyle={{ padding: 0 }}
            actions={[
                <Button
                    type='primary'
                    key='refresh'
                    className='trainings-error-modal-button'
                    data-test-id='modal-error-user-training-button'
                    onClick={onRefreshClick}
                >
                    {isToSave ? 'Закрыть' : 'Обновить'}
                </Button>,
            ]}
        >
            <Meta
                avatar={
                    <CloseCircleOutlined
                        style={{ color: isToSave ? '#ff4d4f' : '#2f54eb', fontSize: '24px' }}
                    />
                }
                title={
                    <div data-test-id='modal-error-user-training-title'>
                        {isToSave
                            ? 'При сохранении данных произошла ошибка '
                            : 'При открытии данных произошла\u00A0ошибка'}
                    </div>
                }
                description={
                    <div data-test-id='modal-error-user-training-subtitle'>
                        {isToSave ? 'Придётся попробовать ещё раз' : 'Попробуйте ещё раз.'}
                    </div>
                }
            ></Meta>
        </Card>
    </Modal>
);
