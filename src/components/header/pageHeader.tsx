import React from 'react';
import './pageHeader.scss';
import { Layout, Breadcrumb, Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

type Breadcrumb = {
    id: number;
    name: string;
    href: string;
};

export const PageHeader: React.FC<{
    breadcrumbs: Breadcrumb[];
    isMain: boolean;
    isSettings?: boolean;
}> = ({ breadcrumbs, isMain, isSettings }) => (
    <Header id='header'>
        <div className='_container'>
            <Breadcrumb>
                {breadcrumbs.map((breadcrumb) => {
                    return (
                        <Breadcrumb.Item className='header-breadcrumbs' key={breadcrumb.id}>
                            <Link to={breadcrumb.href}> {breadcrumb.name}</Link>
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
            {(isMain || isSettings) && (
                <div className='header-content'>
                    {isMain && (
                        <Title className='header-title'>
                            Приветствуем тебя в&nbsp;CleverFit&nbsp;— приложении, <br />
                            которое поможет тебе добиться своей мечты!
                        </Title>
                    )}
                    <Button
                        type='text'
                        icon={<SettingOutlined />}
                        className='settings-btn btn'
                        style={{ color: '#262626' }}
                    >
                        Настройки
                    </Button>
                </div>
            )}
        </div>
    </Header>
);
