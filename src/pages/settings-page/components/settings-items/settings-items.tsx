import './settings-items.scss';
import React from 'react';
import { SettingsItem } from '../settings-item/settings-item';

export const SettingsItems: React.FC = () => (
    <div className='settings-items'>
        <SettingsItem
            title='Открыт для совместных тренировок'
            tooltipText={
                <>
                    включеная функция <br />
                    позволит участвовать <br />в совместных тренировках
                </>
            }
            userInfo='readyForJointTraining'
            switchData='tariff-trainings'
            iconData='tariff-trainings-icon'
        />
        <SettingsItem
            title='Уведомления'
            tooltipText={
                <>
                    включеная функция <br />
                    позволит получать <br />
                    уведомления об активностях
                </>
            }
            userInfo='sendNotification'
            switchData='tariff-notifications'
            iconData='tariff-notifications-icon'
        />
        <SettingsItem
            title='Тёмная тема'
            tooltipText={
                <>
                    темная тема <br />
                    доступна для <br />
                    PRO tarif
                </>
            }
            userInfo='darkMode'
            switchData='tariff-theme'
            iconData='tariff-theme-icon'
        />
    </div>
);
