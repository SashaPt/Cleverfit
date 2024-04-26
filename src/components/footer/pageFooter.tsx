import './pageFooter.scss';
import React from 'react';
import { Button, Card, Space } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import Meta from 'antd/lib/card/Meta';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/paths';
import { history } from '../../redux/configure-store';

export const PageFooter: React.FC = () => {
    const dispatch = useDispatch();
    const onButtonClick = () => {
        dispatch(
            push(Paths.FEEDBACKS, {
                prevPath: history.location.pathname,
            }),
        );
    };
    return (
        <Footer id='footer'>
            <div className='_container'>
                <Space className='footer-content'>
                    <Button
                        type='link'
                        className='footer-link'
                        onClick={onButtonClick}
                        data-test-id='see-reviews'
                    >
                        Смотреть отзывы
                    </Button>
                    <Card
                        className='footer-card'
                        style={{ width: 240 }}
                        bordered={false}
                        actions={[
                            <Button type='text' icon={<AndroidFilled />} className='footer-btn'>
                                Android OS
                            </Button>,
                            <Button type='text' icon={<AppleFilled />} className='footer-btn'>
                                Apple iOS
                            </Button>,
                        ]}
                    >
                        <Meta
                            title={<a href='#'>Скачать на телефон</a>}
                            description='Доступно в PRO-тарифе'
                        ></Meta>
                    </Card>
                </Space>
            </div>
        </Footer>
    );
};
