import './settings-drawer.scss';
import React from 'react';
import moment from 'moment';
import { Drawer, List } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { selectUser } from '@redux/profile/profileSlice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SettingsTariffsForm } from '../settings-tariffs-form/settings-tariffs-form';

export const SettingsDrawer: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    setModalOpen: () => void;
}> = ({ isOpen, onClose, setModalOpen }) => {
    const user = useAppSelector(selectUser);

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
    return (
        <Drawer
            className='settings-drawer'
            open={isOpen}
            onClose={onClose}
            destroyOnClose={true}
            data-test-id='tariff-sider'
            title='Сравнить тарифы'
        >
            {user?.tariff && (
                <div className='settings-pro-activated'>
                    Ваш PRO tarif активен до{' '}
                    {moment(new Date(Date.parse(user.tariff.expired || ''))).format('DD.MM')}
                </div>
            )}
            <div className='settings-options'>
                <div className='settings-options-items'>
                    <div className='settings-options-item'>FREE</div>
                    <div className='settings-options-item settings-options-item-pro'>
                        PRO
                        {user?.tariff ? (
                            <CheckCircleOutlined
                                style={{
                                    color: '#52c41a',
                                    fontSize: '14px',
                                    marginRight: '-7px',
                                    marginLeft: '4px',
                                }}
                            />
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
                                <CheckCircleFilled style={{ color: '#262626', fontSize: '18px' }} />
                            ) : (
                                <ClockCircleOutlined
                                    style={{ color: '#bfbfbf', fontSize: '18px' }}
                                />
                            )}

                            {item.pro ? (
                                <CheckCircleFilled style={{ color: '#262626', fontSize: '18px' }} />
                            ) : (
                                <ClockCircleOutlined
                                    style={{ color: '#bfbfbf', fontSize: '18px' }}
                                />
                            )}
                        </List.Item>
                    )}
                />
            </div>
            {!user?.tariff && <SettingsTariffsForm setModalOpen={setModalOpen} setDrawerClose={onClose}/>}
        </Drawer>
    );
};
