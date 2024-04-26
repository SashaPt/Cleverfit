import './settings-page.scss';
import { Button, Layout, Modal, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageSider } from '@components/sider/pageSider';
import { PageHeader } from '@components/header/pageHeader';
import { Content } from 'antd/lib/layout/layout';
import { ArrowLeftOutlined, CheckCircleFilled, CheckOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import { WriteReview } from '@pages/feedbacks-page/components/write-review/write-review';
import { Paths } from '../../routes/paths';
import { TariffCard } from './components/tariff-card/tariff-card';
import tariffFree from '/tariff_free.png';
import tariffPro from '/tariff_pro.png';
import { SettingsItems } from './components/settings-items/settings-items';
import { selectUser, setTariffsList } from '@redux/profile/profileSlice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SettingsDrawer } from './components/settings-drawer/settings-drawer';
import { useLazyGetTariffsQuery } from '../../services/profileApi';
import { setAccessToken } from '@redux/auth/authSlice';
import { useDateFormat } from '@hooks/useDateFormat';
import { useParseDate } from '@hooks/useParseDate';
import { DM_FORMAT } from '@constants/constants';

export const SettingsPage: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const prevPath = location.state?.prevPath;
    const user = useAppSelector(selectUser);
    const [getTariffs] = useLazyGetTariffsQuery();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const experiedDate = useDateFormat(useParseDate(user?.tariff?.expired || ''), DM_FORMAT);

    const updateTariffs = async () => {
        try {
            const resp = await getTariffs(null).unwrap();
            dispatch(setTariffsList(resp));
            // eslint-disable-next-line no-empty
        } catch {}
    };

    const onCancel = () => {
        setIsModalOpen(false);
        localStorage.removeItem('jwtToken');
        dispatch(setAccessToken(''));
        dispatch(push(Paths.AUTH));
    };

    useEffect(() => {
        updateTariffs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Layout className='settings-page'>
                <PageSider />
                <Layout className='settings-content'>
                    <PageHeader
                        isMain={false}
                        isSettings={false}
                        isInline={true}
                        breadcrumbs={[
                            {
                                id: 1,
                                name: (
                                    <Button
                                        type='text'
                                        className='settings-back-button'
                                        data-test-id='settings-back'
                                        icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
                                        onClick={() => {
                                            dispatch(push(prevPath));
                                        }}
                                    >
                                        Настройки
                                    </Button>
                                ),
                                href: '',
                            },
                        ]}
                    />
                    <Content>
                        <div className='_container'>
                            <div className='settings-container'>
                                <div className='settings-title'>Мой тариф</div>
                                <div className='settings-cards'>
                                    <TariffCard
                                        title='FREE tarif'
                                        img={<img alt='tariff' src={tariffFree} />}
                                        onDetailsClick={() => setIsDrawerOpen(true)}
                                        buttonAction={[
                                            <div className='settings-card-action'>
                                                активен <CheckOutlined />
                                            </div>,
                                        ]}
                                    />
                                    <TariffCard
                                        cardData='pro-tariff-card'
                                        title='PRO tarif'
                                        img={
                                            <img
                                                className={`${
                                                    user?.tariff
                                                        ? 'settings-pro'
                                                        : 'settings-pro-disabled'
                                                }`}
                                                alt='tariff'
                                                src={tariffPro}
                                            />
                                        }
                                        onDetailsClick={() => setIsDrawerOpen(true)}
                                        buttonAction={[
                                            !user?.tariff ? (
                                                <Button
                                                    type='primary'
                                                    data-test-id='activate-tariff-btn'
                                                    className='settings-tariff-button'
                                                    onClick={() => setIsDrawerOpen(true)}
                                                >
                                                    Активировать
                                                </Button>
                                            ) : (
                                                <div className='settings-card-action'>
                                                    активен
                                                    <br />
                                                    до {experiedDate}
                                                </div>
                                            ),
                                        ]}
                                    />
                                </div>
                                <SettingsItems />
                                <div className='settings-buttons'>
                                    <WriteReview />
                                    <Button
                                        type='link'
                                        className='settings-feedbacks-button'
                                        onClick={() => dispatch(push(Paths.FEEDBACKS))}
                                    >
                                        Смотреть все отзывы
                                    </Button>
                                </div>
                                <SettingsDrawer
                                    modalProps={{
                                        isOpen: isDrawerOpen,
                                        onCloseClick: () => setIsDrawerOpen(false),
                                    }}
                                    setModalOpen={() => setIsModalOpen(true)}
                                />
                            </div>
                            <Modal
                                className='settings-modal'
                                data-test-id='tariff-modal-success'
                                bodyStyle={{ padding: 0 }}
                                open={isModalOpen}
                                footer={null}
                                centered={true}
                                onCancel={onCancel}
                            >
                                <Result
                                    icon={<CheckCircleFilled />}
                                    title={<>Чек для оплаты у&nbsp;вас&nbsp;на&nbsp;почте</>}
                                    subTitle={
                                        <>
                                            Мы отправили инструкцию для оплаты вам на&nbsp;e-mail{' '}
                                            <b>{user?.email}</b>. После подтверждения оплаты войдите
                                            в&nbsp;приложение заново.
                                        </>
                                    }
                                ></Result>
                                <div className='settings-modal-note'>
                                    Не пришло письмо? Проверьте папку&nbsp;Спам.
                                </div>
                            </Modal>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
