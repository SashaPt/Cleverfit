import { Card, Rate, Typography } from 'antd';
import './feedback.scss';
import React from 'react';
import Meta from 'antd/lib/card/Meta';
import { FeedbackSuccess } from '../../../../types/feedbacks/feedbacks';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useDateFormat } from '@hooks/useDateFormat';
const { Text } = Typography;

export const Feedback: React.FC<FeedbackSuccess> = ({
    fullName,
    imageSrc,
    message,
    rating,
    createdAt,
}) => {
    const date = useDateFormat(new Date(Date.parse(createdAt)));

    return (
        <Card className='feedback-card' bordered={false}>
            <Meta
                title={fullName || 'Пользователь'}
                avatar={
                    imageSrc ? (
                        <img className='feedback-avatar' src={imageSrc} />
                    ) : (
                        <UserOutlined className='feedback-avatar' style={{ fontSize: '20px' }} />
                    )
                }
            />
            <div className='feedback-content'>
                <div className='feedback-info'>
                    <Rate
                        value={rating}
                        disabled
                        character={({ index = 0 }) =>
                            rating && index < rating ? (
                                <StarFilled style={{ fontSize: '16px' }} />
                            ) : (
                                <StarOutlined style={{ fontSize: '16px' }} />
                            )
                        }
                    />
                    <div className='feedback-date'>{date}</div>
                </div>
                <Text className='feedback-text'>{message}</Text>
            </div>
        </Card>
    );
};
