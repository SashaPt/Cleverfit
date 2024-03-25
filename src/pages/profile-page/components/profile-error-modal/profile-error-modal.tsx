import './profile-error-modal.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';

export const ProfileErrorModal: React.FC<{
    isOpen: boolean;
    onCloseClick: () => void;
    isToSave?: boolean;
}> = ({ isOpen, onCloseClick, isToSave }) => {
    return (
        <Modal
            className='profile-error-modal'
            open={isOpen}
            footer={null}
            centered={true}
            width={'fit-content'}
            closable={false}
            bodyStyle={{ padding: 0 }}
        >
            <Card
                className='profile-error-modal-card'
                bordered={false}
                bodyStyle={{ padding: 0 }}
                actions={[
                    <Button
                        type='primary'
                        key='close'
                        className='profile-error-modal-button'
                        data-test-id={isToSave ? 'error-close' : 'big-file-error-close'}
                        onClick={onCloseClick}
                    >
                        Закрыть
                    </Button>,
                ]}
            >
                <Meta
                    avatar={<CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '22px' }} />}
                    title={
                        isToSave ? 'При сохранении данных произошла ошибка' : 'Файл слишком большой'
                    }
                    description={
                        isToSave
                            ? 'Придётся попробовать ещё раз'
                            : 'Выберите файл размером до 5 МБ.'
                    }
                ></Meta>
            </Card>
        </Modal>
    );
};
