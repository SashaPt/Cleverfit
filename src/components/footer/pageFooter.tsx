import React from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
const { Link } = Typography;

import './pageFooter.scss';
import Meta from 'antd/lib/card/Meta';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const PageFooter: React.FC = () => (
    <Footer id='footer'>
        <div className='_container'>
            <Space className='footer-content'>
                <Link className='footer-link' href='#'>
                    Смотреть отзывы
                </Link>
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
