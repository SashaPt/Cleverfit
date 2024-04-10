import './common-trainings-banner.scss';
import React from 'react';
import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch } from 'react-redux';
import {
    setJointQueriedType,
    setIsJointUsersQueried,
    setIsPartnersQueried,
} from '@redux/training/trainingSlice';

export const CommonTrainingsBanner: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <Card
            className='common-trainings-banner'
            actions={[
                <Button
                    key='rand'
                    type='link'
                    className='common-trainings-button-rand'
                    onClick={() => {
                        dispatch(setIsJointUsersQueried(true));
                        dispatch(setIsPartnersQueried(true));
                        dispatch(setJointQueriedType('rand'));
                    }}
                >
                    Случайный выбор
                </Button>,
                <Button
                    key='my'
                    type='text'
                    className='common-trainings-button-my'
                    onClick={() => {
                        dispatch(setIsJointUsersQueried(true));
                        dispatch(setIsPartnersQueried(true));
                        dispatch(setJointQueriedType('my'));
                    }}
                >
                    Выбор друга по моим тренировкам
                </Button>,
            ]}
        >
            <Meta
                title={
                    <>
                        Хочешь тренироваться с&nbsp;тем, кто разделяет твои цели и&nbsp;темп? <br />
                        Можешь найти друга для совместных тренировок среди других пользователей.
                    </>
                }
                description={
                    <>
                        Можешь воспользоваться случайным выбором или выбрать друга с&nbsp;похожим
                        на&nbsp;твой уровень и&nbsp;вид тренировки, и&nbsp;мы&nbsp;найдем тебе
                        идеального спортивного друга.
                    </>
                }
            ></Meta>
        </Card>
    );
};
