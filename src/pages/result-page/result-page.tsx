import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAccessToken } from '@redux/auth/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Paths } from '../../routes/paths';
import { Layout } from 'antd';
import './result-page.scss';

export const ResultPage: React.FC = () => {
    const token = useAppSelector(selectAccessToken);
    const location = useLocation();

    const prevPath: string = location.state?.prevPath;

    if (token) {
        return <Navigate to={Paths.MAIN} />;
    }
    if (!prevPath) {
        return <Navigate to={Paths.AUTH} />;
    }
    return (
        <Layout className='result-page'>
            <div className='_container'>
                <Outlet />
            </div>
        </Layout>
    );
};
