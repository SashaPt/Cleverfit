import React from 'react';
import './pageHeader.scss';
import { Layout, Breadcrumb, Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { history } from '../../redux/configure-store';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/paths';
const { Header } = Layout;
const { Title } = Typography;

type Breadcrumb = {
    id: number;
    name: string | JSX.Element;
    href: string;
};

export const PageHeader: React.FC<{
    breadcrumbs: Breadcrumb[];
    isMain: boolean;
    isSettings?: boolean;
    isInline?: boolean;
}> = ({ breadcrumbs, isMain, isSettings, isInline }) => {
    const dispatch = useDispatch();

    return (
        <Header id='header'>
            <div className={`_container ${isInline ? 'header-inline' : ''}`}>
                <Breadcrumb>
                    {breadcrumbs.map((breadcrumb, index) => {
                        if (index !== breadcrumbs.length - 1) {
                            return (
                                <Breadcrumb.Item className='header-breadcrumbs' key={breadcrumb.id}>
                                    <Link to={breadcrumb.href}> {breadcrumb.name}</Link>
                                </Breadcrumb.Item>
                            );
                        } else {
                            return (
                                <Breadcrumb.Item className='header-breadcrumbs' key={breadcrumb.id}>
                                    <span> {breadcrumb.name}</span>
                                </Breadcrumb.Item>
                            );
                        }
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
                            data-test-id='header-settings'
                            onClick={() =>
                                dispatch(
                                    push(Paths.SETTINGS, {
                                        prevPath: history.location.pathname,
                                    }),
                                )
                            }
                        >
                            Настройки
                        </Button>
                    </div>
                )}
            </div>
        </Header>
    );
};
