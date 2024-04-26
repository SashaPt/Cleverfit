import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Space, MenuProps, Modal, Badge } from 'antd';
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
    setPathToNavigate,
    selectPathToNavigate,
    selectIsMobile,
} from '@redux/calendar/calendarSlice';
import { selectMyInvites, selectPartners } from '@redux/training/trainingSlice';
import { PARTNERS_LIMIT } from '@constants/constants';
import { useInitQueries } from '@hooks/useInitQueries';
import { useMobile } from '@hooks/useMobile';
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
    const isMobile = useAppSelector(selectIsMobile);
    const pathToNavigate = useAppSelector(selectPathToNavigate);
    const myInvites = useAppSelector(selectMyInvites);
    const partners = useAppSelector(selectPartners);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [getTrainings, { isLoading: isCalendarLoading }] = useLazyGetUserTrainingsQuery();
    const dispatch = useDispatch();

    useInitQueries();
    useMobile();

    const queryCalendar = async () => {
        try {
            const resp = await getTrainings(null).unwrap();
            dispatch(setCalendarResponse(resp));
            dispatch(push(pathToNavigate));
        } catch (error) {
            setIsErrorModalOpen(true);
        } finally {
            dispatch(setIsCalendarQueried(false));
        }
    };

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key == 'calendar') {
            dispatch(setIsCalendarQueried(true));
            dispatch(setPathToNavigate(Paths.CALENDAR));
        } else if (e.key == 'profile') {
            dispatch(push(Paths.PROFILE));
        } else if (e.key == 'training') {
            dispatch(setIsCalendarQueried(true));
            dispatch(setPathToNavigate(Paths.TRAINING));
        } else if (e.key == 'achievements') {
            dispatch(setIsCalendarQueried(true));
            dispatch(setPathToNavigate(Paths.ACHIEVEMENTS));
        }
    };

    const onTriggerClick = () => {
        if (isMobile) {
            setCollapsedMobile(!collapsedMobile);
        } else {
            setCollapsed(!collapsed);
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

    return (
        <>
            {isCalendarLoading && <Loader />}
            <Sider
                trigger={null}
                collapsible
                collapsed={isMobile ? collapsedMobile : collapsed}
                theme='light'
                id={isMobile ? 'sider-mobile' : 'sider'}
                width={isMobile ? 106 : 208}
                collapsedWidth={isMobile ? 0 : 64}
            >
                <div>
                    <Link to={Paths.MAIN}>
                        <img
                            src={isMobile ? logoMobile : collapsed ? logoSmart : logoBig}
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
                                icon: !isMobile && <CalendarOutlined />,
                                label: 'Календарь',
                            },
                            {
                                key: 'training',
                                icon: !isMobile && (
                                    <>
                                        {partners.length < PARTNERS_LIMIT && myInvites.length ? (
                                            <Badge
                                                data-test-id='notification-about-joint-training'
                                                count={myInvites.length}
                                            >
                                                <HeartFilled style={{ fontSize: '16px' }} />
                                            </Badge>
                                        ) : (
                                            <HeartFilled />
                                        )}
                                    </>
                                ),
                                label: isMobile ? (
                                    <>
                                        {partners.length < PARTNERS_LIMIT && myInvites.length ? (
                                            <Badge
                                                data-test-id='notification-about-joint-training'
                                                count={myInvites.length}
                                            >
                                                Тренировки
                                            </Badge>
                                        ) : (
                                            'Тренировки'
                                        )}
                                    </>
                                ) : (
                                    'Тренировки'
                                ),
                            },
                            {
                                key: 'achievements',
                                icon: !isMobile && <TrophyFilled />,
                                label: <div data-test-id='sidebar-achievements'>Достижения</div>,
                            },
                            {
                                key: 'profile',
                                icon: !isMobile && <IdcardOutlined />,
                                label: 'Профиль',
                            },
                        ]}
                    />
                </div>
                <Button
                    type='text'
                    icon={!isMobile && <ExitIcon />}
                    className='exit-btn btn'
                    style={{ color: '#262626', textAlign: isMobile ? 'center' : 'left' }}
                    onClick={onExitClick}
                >
                    Выход
                </Button>
                <Space
                    className={`trigger ${isMobile ? 'trigger-mobile' : ''}`}
                    data-test-id={isMobile ? 'sider-switch-mobile' : 'sider-switch'}
                    onClick={onTriggerClick}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {})}
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
