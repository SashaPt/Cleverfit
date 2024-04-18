import './no-feedbacks.scss';
import React from 'react';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { WriteReview } from '../write-review/write-review';

export const NoFeedbacks: React.FC = () => (
    <div className='no-feedbacks-wrapper _container'>
        <Card bordered={false} className='no-feedbacks-card'>
            <Meta
                title='Оставьте свой отзыв первым'
                description='Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и&nbsp;помогите им сделать правильный выбор.'
            />
        </Card>
        <WriteReview />
    </div>
);
