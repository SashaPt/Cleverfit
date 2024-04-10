import './main-page.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Layout, Row, Space, Typography } from 'antd';
import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { PageHeader } from '@components/header/pageHeader';
import { PageSider } from '@components/sider/pageSider';
import { PageFooter } from '@components/footer/pageFooter';
import { Loader } from '@components/loader/loader';
import { useDispatch } from 'react-redux';
import { setIsCalendarQueried, setPathToNavigate } from '@redux/calendar/calendarSlice';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/paths';
import { setIsUserQueried } from '@redux/profile/profileSlice';
const { Content } = Layout;
const { Text, Title } = Typography;

export const MainPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        dispatch(setIsUserQueried(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            <Layout className='main-page'>
                <PageSider />
                <Layout className='main-content'>
                    <PageHeader
                        isMain={true}
                        breadcrumbs={[{ id: 1, name: 'Главная', href: '' }]}
                    />
                    <Content>
                        <div className='_container'>
                            <Space className='main-container'>
                                <Card className='main-card main-card-blue' bordered={false}>
                                    <Text>
                                        С CleverFit ты сможешь: <br />
                                        — планировать свои тренировки на&nbsp;календаре, выбирая тип
                                        и&nbsp;уровень нагрузки; <br />— отслеживать свои достижения
                                        в&nbsp;разделе статистики, сравнивая свои результаты с
                                        нормами и&nbsp;рекордами; <br />— создавать свой профиль,
                                        где ты&nbsp;можешь загружать свои фото, видео и отзывы о
                                        тренировках; <br />— выполнять расписанные тренировки для
                                        разных частей тела, следуя подробным инструкциям
                                        и&nbsp;советам профессиональных тренеров.
                                    </Text>
                                </Card>
                            </Space>
                            <Space className='main-container' direction='vertical'>
                                <Card className='main-card main-card-black' bordered={false}>
                                    <Title level={2}>
                                        CleverFit — это не просто приложение, а твой личный помощник
                                        в&nbsp;мире фитнеса. Не откладывай на&nbsp;завтра — начни
                                        тренироваться уже сегодня!
                                    </Title>
                                </Card>
                                <Row className='main-cards'>
                                    <Col>
                                        <Card
                                            title='Расписать тренировки'
                                            bordered={false}
                                            bodyStyle={{ padding: 0 }}
                                            actions={[
                                                <Button
                                                    type='text'
                                                    icon={<HeartFilled />}
                                                    className='card-btn'
                                                    data-test-id='menu-button-training'
                                                    onClick={() => {
                                                        dispatch(setIsCalendarQueried(true));
                                                        dispatch(setPathToNavigate(Paths.TRAINING));
                                                    }}
                                                >
                                                    Тренировки
                                                </Button>,
                                            ]}
                                        ></Card>
                                    </Col>
                                    <Col>
                                        <Card
                                            title='Назначить календарь'
                                            bordered={false}
                                            bodyStyle={{ padding: 0 }}
                                            actions={[
                                                <Button
                                                    type='text'
                                                    icon={<CalendarOutlined />}
                                                    className='card-btn'
                                                    data-test-id='menu-button-calendar'
                                                    onClick={() => {
                                                        dispatch(setIsCalendarQueried(true));
                                                        dispatch(setPathToNavigate(Paths.CALENDAR));
                                                    }}
                                                >
                                                    Календарь
                                                </Button>,
                                            ]}
                                        ></Card>
                                    </Col>
                                    <Col>
                                        <Card
                                            title='Заполнить профиль'
                                            bordered={false}
                                            bodyStyle={{ padding: 0 }}
                                            actions={[
                                                <Button
                                                    type='text'
                                                    icon={<IdcardOutlined />}
                                                    className='card-btn'
                                                    onClick={() => dispatch(push(Paths.PROFILE))}
                                                    data-test-id='menu-button-profile'
                                                >
                                                    Профиль
                                                </Button>,
                                            ]}
                                        ></Card>
                                    </Col>
                                </Row>
                            </Space>
                        </div>
                    </Content>
                    <PageFooter />
                </Layout>
            </Layout>
        </>
    );
};
