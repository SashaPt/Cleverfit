import './tariff-card.scss';
import React from 'react';
import { Button, Card } from 'antd';

export const TariffCard: React.FC<{
    title: string;
    img: React.ReactNode;
    buttonAction: React.ReactNode[];
    cardData?: string;
    onDetailsClick: () => void;
}> = ({ title, img, onDetailsClick, buttonAction, cardData }) => (
    <Card
        className='tariff-card'
        data-test-id={cardData || 'card'}
        title={
            <div className='tariff-header'>
                {title}
                <Button className='tariff-details-button' type='link' onClick={onDetailsClick}>
                    Подробнее
                </Button>
            </div>
        }
        bordered={false}
        bodyStyle={{ padding: 0 }}
        cover={img}
        actions={buttonAction}
    ></Card>
);
