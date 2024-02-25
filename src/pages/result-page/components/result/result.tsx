import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import './result.scss';
import { IResult } from './result.interface';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAccessToken } from '@redux/auth/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from '../../../../routes/paths';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';

export const Result: React.FC<IResult> = (result) => {
    const token = useAppSelector(selectAccessToken);
    const location = useLocation();
    const dispatch = useDispatch();

    const prevPath: string = location.state?.prevPath;

    if (token) {
        return <Navigate to={Paths.MAIN} />;
    }
    if (!prevPath) {
        return <Navigate to={Paths.AUTH} />;
    }
    return (
        <>
            <Card className='result' bordered={false}>
                <Meta
                    avatar={result.icon}
                    title={result.title}
                    description={result.description}
                    className='result-content'
                />
                <Button
                    type='primary'
                    block={true}
                    className='result-button'
                    data-test-id={result.buttonData}
                    onClick={() =>
                        dispatch(push(result.buttonNavigate, {
                            prevPath: location.pathname,
                        }))
                    }
                >
                    {result.buttonName}
                </Button>
            </Card>
        </>
    );
};
