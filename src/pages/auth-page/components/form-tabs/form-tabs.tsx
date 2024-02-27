import { Tabs } from 'antd';
import { push } from 'redux-first-history';
import { Paths } from '../../../../routes/paths';
import { useDispatch } from 'react-redux';
import './form-tabs.scss';
import { useLocation } from 'react-router-dom';

export const FormTabs: React.FC<{ active: string }> = ({ active }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const onChange = (key: string) => {
        if (key === 'login') {
            dispatch(push(Paths.AUTH, {
                prevPath: location.pathname,
            }));
        } else {
            dispatch(push(Paths.AUTH + '/' + Paths.REGISTRATION, {
                prevPath: location.pathname,
            }));
        }
    };
    return (
        <Tabs
            defaultActiveKey={active}
            animated={false}
            size='large'
            tabBarGutter={0}
            centered={true}
            tabBarStyle={{ color: '#262626' }}
            className='auth-tabs'
            onChange={onChange}
            items={[
                {
                    label: `Вход`,
                    key: 'login',
                    children: ``,
                },
                {
                    label: `Регистрация`,
                    key: 'registration',
                    children: ``,
                },
            ]}
        />
    );
};
