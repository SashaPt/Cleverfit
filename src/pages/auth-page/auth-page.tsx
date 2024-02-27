import React from 'react';
import { Layout } from 'antd';
import './auth-page.scss';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAccessToken } from '@redux/auth/authSlice';
import { Navigate } from 'react-router-dom';
import { Paths } from '../../routes/paths';

export const AuthPage: React.FC = () => {
    const token = useAppSelector(selectAccessToken);

    if (token) {
        return <Navigate to={Paths.MAIN} />;
    }
    return (
        <Layout className='auth-page'>
            <div className='_container'>
                <Outlet />
            </div>
        </Layout>
    );
};
