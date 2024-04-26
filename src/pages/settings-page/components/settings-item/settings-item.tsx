import './settings-item.scss';
import React from 'react';
import { Switch, Tooltip } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUser, setIsUserQueried } from '@redux/profile/profileSlice';
import { useUpdateUserMutation } from '../../../../services/profileApi';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

export const SettingsItem: React.FC<{
    title: string;
    tooltipText: JSX.Element;
    userInfo: string;
    switchData: string;
    iconData: string;
}> = ({ title, tooltipText, userInfo, switchData,iconData }) => {
    const [updateUser] = useUpdateUserMutation();
    const user = useAppSelector(selectUser);
    const dispatch = useDispatch();

    const onChange = async (checked: boolean) => {
        if (user) {
            try {
                await updateUser({
                    ...user,
                    readyForJointTraining:
                        userInfo === 'readyForJointTraining' ? checked : user.readyForJointTraining,
                    sendNotification:
                        userInfo === 'sendNotification' ? checked : user.sendNotification,
                }).unwrap();
                dispatch(setIsUserQueried(true));
                // eslint-disable-next-line no-empty
            } catch {}
        }
    };

    return (
        <div className='settings-item'>
            <div className={`settings-item-name ${userInfo === 'darkMode' && !user?.tariff ? 'settings-item-name-disabled' : ''}`}>
                <span className='settings-item-text'>{title}</span>
                <Tooltip
                    overlayInnerStyle={{ marginLeft: '-14px' }}
                    placement='bottomLeft'
                    color='#000'
                    title={tooltipText}
                >
                    <ExclamationCircleOutlined style={{ color: '#8c8c8c' }} data-test-id={iconData}/>
                </Tooltip>
            </div>
            {user && (
                <Switch
                    data-test-id={switchData}
                    defaultChecked={
                        userInfo === 'readyForJointTraining'
                            ? user.readyForJointTraining
                            : userInfo === 'sendNotification'
                            ? user.sendNotification
                            : false
                    }
                    disabled={userInfo === 'darkMode' && !user.tariff}
                    onChange={onChange}
                />
            )}
        </div>
    );
};
