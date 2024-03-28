import './settings-drawer.scss';
import React from 'react';
import { Drawer, List } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { selectUser } from '@redux/profile/profileSlice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SettingsTariffsForm } from '../settings-tariffs-form/settings-tariffs-form';
import { ModalProps } from '../../../../types/common/common';
import { useDateFormat } from '@hooks/useDateFormat';
import { useParseDate } from '@hooks/useParseDate';
import { DM_FORMAT } from '@constants/constants';

const settingsOptionsData = [
    {
        title: 'Статистика за месяц',
        free: true,
        pro: true,
    },
    {
        title: 'Статистика за всё время',
        free: false,
        pro: true,
    },
    {
        title: 'Совместные тренировки',
        free: true,
        pro: true,
    },
    {
        title: 'Участие в марафонах',
        free: false,
        pro: true,
    },
    {
        title: 'Приложение iOS',
        free: false,
        pro: true,
    },
    {
        title: 'Приложение Android',
        free: false,
        pro: true,
    },
    {
        title: 'Индивидуальный Chat GPT',
        free: false,
        pro: true,
    },
];

export const SettingsDrawer: React.FC<{
    modalProps: ModalProps;
    setModalOpen: () => void;
}> = ({ modalProps, setModalOpen }) => {
    const user = useAppSelector(selectUser);
    const experiedDate = useDateFormat(useParseDate(user?.tariff?.expired || ''), DM_FORMAT);
    return (
        <Drawer
            className='settings-drawer'
            open={modalProps.isOpen}
            onClose={modalProps.onCloseClick}
            destroyOnClose={true}
            data-test-id='tariff-sider'
            title='Сравнить тарифы'
        >
            {user?.tariff && (
                <div className='settings-pro-activated'>
                    Ваш PRO tarif активен до {experiedDate}
                </div>
            )}
            <div className='settings-options'>
                <div className='settings-options-items'>
                    <div className='settings-options-item'>FREE</div>
                    <div className='settings-options-item settings-options-item-pro'>
                        PRO
                        {user?.tariff ? (
                            <CheckCircleOutlined className='settings-options-item-icon' />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <List
                    className='settings-options-list'
                    itemLayout='horizontal'
                    dataSource={settingsOptionsData}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} />

                            {item.free ? (
                                <CheckCircleFilled className='settings-options-list-icon-check' />
                            ) : (
                                <CloseCircleOutlined className='settings-options-list-icon-close' />
                            )}

                            {item.pro ? (
                                <CheckCircleFilled className='settings-options-list-icon-check' />
                            ) : (
                                <CloseCircleOutlined className='settings-options-list-icon-close' />
                            )}
                        </List.Item>
                    )}
                />
            </div>
            {!user?.tariff && (
                <SettingsTariffsForm
                    setModalOpen={setModalOpen}
                    setDrawerClose={modalProps.onCloseClick}
                />
            )}
        </Drawer>
    );
};
