import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import './result.scss';
import { IResult } from './result.interface';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';

export const Result: React.FC<IResult> = ({
    icon,
    title,
    description,
    buttonName,
    buttonData,
    buttonNavigate,
}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <Card className={`result include-${buttonData}`} bordered={false}>
            <Meta
                avatar={icon}
                title={title}
                description={description}
                className='result-content'
            />
            {buttonName && (
                <Button
                    type='primary'
                    className='result-button'
                    data-test-id={buttonData}
                    onClick={() =>
                        dispatch(
                            push(buttonNavigate, {
                                prevPath: location.pathname,
                            }),
                        )
                    }
                >
                    {buttonName}
                </Button>
            )}
        </Card>
    );
};
