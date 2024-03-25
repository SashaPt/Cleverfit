import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Space, MenuProps, Modal } from 'antd';
import logoBig from '/logo_big.svg';
import logoSmart from '/logo_smart.svg';
import logoMobile from '/logo_mobile.svg';
import './pageSider.scss';
import {
    CalendarOutlined,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import * as results from '@pages/result-page/components/result/results';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/paths';
import { setAccessToken } from '@redux/auth/authSlice';
import { Link } from 'react-router-dom';
import { useLazyGetUserTrainingsQuery } from '../../services/calendarApi';
import { Loader } from '@components/loader/loader';
import { Result } from '@pages/result-page';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectIsCalendarQueried,
    setIsCalendarQueried,
    setCalendarResponse,
} from '@redux/calendar/calendarSlice';
import { useLazyGetUserQuery } from '../../services/profileApi';
import {
    selectIsUserQueried,
    setImage,
    setIsUserQueried,
    setUser,
} from '@redux/profile/profileSlice';
const { Sider } = Layout;

const ExitSvg = () => (
    <svg
        width='16'
        height='16'
        viewBox='0 0 36 36'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path d='M8.42946 16.6364V13.2052C8.42946 13.0525 8.25669 12.9641 8.13616 13.0605L2.06919 17.8579C2.04763 17.8749 2.0302 17.8965 2.01821 17.9212C2.00623 17.9459 2 17.973 2 18.0005C2 18.028 2.00623 18.0551 2.01821 18.0798C2.0302 18.1045 2.04763 18.1261 2.06919 18.1431L8.13616 22.9445C8.25268 23.0369 8.42946 22.9525 8.42946 22.7998V19.3686H24V16.6364H8.42946Z' />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.4116 2.0918H31.6071C32.2299 2.0918 32.7321 2.59403 32.7321 3.2168V32.7882C32.7321 33.411 32.2299 33.9132 31.6071 33.9132H10.4116C9.78884 33.9132 9.2866 33.411 9.2866 32.7882V26.0382C9.2866 25.9498 9.35893 25.8775 9.44732 25.8775H11.858C11.9464 25.8775 12.0187 25.9498 12.0187 26.0382V31.1811H30V19.3686V16.6364V4.82394H12.0187V9.9668C12.0187 10.0552 11.9464 10.1275 11.858 10.1275H9.44732C9.35893 10.1275 9.2866 10.0552 9.2866 9.9668V3.2168C9.2866 2.59403 9.78884 2.0918 10.4116 2.0918Z'
        />
    </svg>
);

const ExitIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ExitSvg} {...props} />
);

export const PageSider: React.FC<{ menuActive?: string }> = ({ menuActive }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [collapsedMobile, setCollapsedMobile] = useState(true);

    const isCalendarQueried = useAppSelector(selectIsCalendarQueried);
    const isUserQueried = useAppSelector(selectIsUserQueried);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [getTrainings, { isLoading: isCalendarLoading }] = useLazyGetUserTrainingsQuery();
    const [getUser] = useLazyGetUserQuery();
    const dispatch = useDispatch();

    const queryCalendar = async () => {
        try {
            const resp = await getTrainings(null).unwrap();
            dispatch(setCalendarResponse(resp));
            dispatch(push(Paths.CALENDAR));
        } catch (error) {
            setIsErrorModalOpen(true);
        } finally {
            dispatch(setIsCalendarQueried(false));
        }
    };

    const queryUser = async () => {
        try {
            const resp = await getUser(null).unwrap();
            dispatch(setUser(resp));
            dispatch(setImage(resp.imgSrc || ''));
        } catch (error) {
            console.log(error);
        } finally {
            setIsUserQueried(false);
        }
    };

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key == 'calendar') {
            dispatch(setIsCalendarQueried(true));
        } else if (e.key == 'profile') {
            dispatch(push(Paths.PROFILE));
        }
    };

    const onExitClick = () => {
        localStorage.removeItem('jwtToken');
        dispatch(setAccessToken(''));
        dispatch(push(Paths.AUTH));
    };

    useEffect(() => {
        if (isCalendarQueried) {
            queryCalendar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCalendarQueried]);

    useEffect(() => {
        dispatch(setIsUserQueried(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isUserQueried) {
            setTimeout(() => queryUser(), 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserQueried]);

    return (
        <>
            {isCalendarLoading && <Loader />}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme='light'
                id='sider'
                width={208}
                collapsedWidth={64}
            >
                <div>
                    <Link to={Paths.MAIN}>
                        <img
                            src={collapsed ? logoSmart : logoBig}
                            className='logo'
                            alt='Cleverfit logo'
                        />
                    </Link>
                    <Menu
                        theme='light'
                        mode='inline'
                        style={{ color: '#262626' }}
                        defaultSelectedKeys={[`${menuActive}`]}
                        onClick={onClick}
                        items={[
                            {
                                key: 'calendar',
                                icon: <CalendarOutlined />,
                                label: 'Календарь',
                            },
                            {
                                key: '2',
                                icon: <HeartFilled />,
                                label: 'Тренировки',
                            },
                            {
                                key: '3',
                                icon: <TrophyFilled />,
                                label: 'Достижения',
                            },
                            {
                                key: 'profile',
                                icon: <IdcardOutlined />,
                                label: 'Профиль',
                            },
                        ]}
                    />
                </div>
                <Button
                    type='text'
                    icon={<ExitIcon />}
                    className='exit-btn btn'
                    style={{ color: '#262626', textAlign: 'left' }}
                    onClick={onExitClick}
                >
                    Выход
                </Button>
                <Space
                    className='trigger'
                    data-test-id='sider-switch'
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {})}
                </Space>
            </Sider>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsedMobile}
                theme='light'
                id='sider-mobile'
                width={106}
                collapsedWidth={0}
            >
                <div>
                    <Link to={Paths.MAIN}>
                        <img src={logoMobile} className='logo' alt='Cleverfit logo' />
                    </Link>
                    <Menu
                        theme='light'
                        mode='inline'
                        style={{ color: '#262626' }}
                        defaultSelectedKeys={[`${menuActive}`]}
                        onClick={onClick}
                        items={[
                            {
                                key: 'calendar',
                                label: 'Календарь',
                            },
                            {
                                key: '2',
                                label: 'Тренировки',
                            },
                            {
                                key: '3',
                                label: 'Достижения',
                            },
                            {
                                key: 'profile',
                                label: 'Профиль',
                            },
                        ]}
                    />
                </div>
                <Button
                    type='text'
                    className='exit-btn btn'
                    style={{ color: '#262626' }}
                    onClick={onExitClick}
                >
                    Выход
                </Button>
                <Space
                    className='trigger trigger-mobile'
                    data-test-id='sider-switch-mobile'
                    onClick={() => setCollapsedMobile(!collapsedMobile)}
                >
                    {React.createElement(
                        collapsedMobile ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {},
                    )}
                </Space>
            </Sider>
            <Modal
                className='calendar-error-modal'
                centered={true}
                open={isErrorModalOpen}
                data-test-id='modal-no-review'
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        onClick={() => {
                            setIsErrorModalOpen(false);
                            dispatch(push(Paths.MAIN));
                        }}
                        className='calendar-submit-button'
                    >
                        Назад
                    </Button>,
                ]}
                closeIcon={false}
                closable={false}
                width={'fit-content'}
                bodyStyle={{ padding: 0 }}
            >
                <Result {...results.resultGetCalendarError}></Result>
            </Modal>
        </>
    );
};
