import React from 'react';
import { Layout, Breadcrumb, Button, Space, Typography } from 'antd';
const { Header } = Layout;
const { Title } = Typography;
import { SettingOutlined } from '@ant-design/icons';
import './pageHeader.scss';

export const PageHeader: React.FC = () => (
    <Header id='header'>
        <div className='_container'>
            <Breadcrumb>
                <Breadcrumb.Item className='header-breadcrumbs'>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <Space className='header-content'>
                <Title className='header-title'>
                    Приветствуем тебя в&nbsp;CleverFit&nbsp;— приложении, <br />
                    которое поможет тебе добиться своей мечты!
                </Title>
                <Button
                    type='text'
                    icon={<SettingOutlined />}
                    className='settings-btn btn'
                    style={{ color: '#262626' }}
                >
                    Настройки
                </Button>
            </Space>
        </div>
    </Header>
);
