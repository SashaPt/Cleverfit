import React from 'react';
import { Button, Card, Col, Layout, Row, Space, Typography } from 'antd';
const { Content } = Layout;
const { Text, Title } = Typography;
import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';

import './main-page.css';

import { PageHeader } from '@components/header/pageHeader';
import { PageSider } from '@components/sider/pageSider';
import { PageFooter } from '@components/footer/pageFooter';

export const MainPage: React.FC = () => {
    return (
        <>
            <Layout className='main-page'>
                <PageSider></PageSider>
                <Layout className='main-content'>
                    <PageHeader></PageHeader>
                    <Content>
                        <div className='_container'>
                            <Space className='main-container'>
                                <Card className='main-card main-card-blue' bordered={false}>
                                    <Text>
                                        С CleverFit ты сможешь: <br />
                                        — планировать свои тренировки на&nbsp;календаре, выбирая тип
                                        и&nbsp;уровень нагрузки; <br />
                                        — отслеживать свои достижения в&nbsp;разделе статистики,
                                        сравнивая свои результаты с нормами и&nbsp;рекордами; <br />
                                        — создавать свой профиль, где ты&nbsp;можешь загружать свои фото,
                                        видео и отзывы о тренировках; <br />— выполнять расписанные
                                        тренировки для разных частей тела, следуя подробным
                                        инструкциям и&nbsp;советам профессиональных тренеров.
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
                    <PageFooter></PageFooter>
                </Layout>
            </Layout>
        </>
    );
};
