import { MainPage } from '@pages/main-page';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.js';
import { selectAccessToken } from '@redux/auth/authSlice';
import { Paths } from './paths';

const PrivateRoute = () => {
    const token = useAppSelector(selectAccessToken);
    if (token) {
        return <MainPage />;
    } else {
        return <Navigate to={Paths.AUTH} />;
    }
};

export default PrivateRoute;
