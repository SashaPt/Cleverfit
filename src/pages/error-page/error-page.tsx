import './error-page.scss';
import { Button, Layout, Result } from 'antd';
import React from 'react';
import { PageSider } from '@components/sider/pageSider';
import { Content } from 'antd/lib/layout/layout';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/paths';

export const ErrorPage: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <Layout className='error-page'>
            <PageSider />
            <Layout className='error-content'>
                <Content>
                    <div className='_container'>
                        <div className='error-container'>
                            <Result
                                status='404'
                                title='Такой страницы нет'
                                subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                                extra={
                                    <Button
                                        type='primary'
                                        onClick={() => dispatch(push(Paths.MAIN))}
                                    >
                                        На главную
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
