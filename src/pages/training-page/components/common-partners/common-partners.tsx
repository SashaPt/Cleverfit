import './common-partners.scss';
import React, { useState } from 'react';
import { Typography } from 'antd';
import { selectPartners } from '@redux/training/trainingSlice';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { PartnerCard } from '../partner-card/partner-card';
import { PartnerModal } from '../partner-modal/partner-modal';
import { TrainingPartner } from '../../../../types/training/training';
import { isArrayWithItems } from '@utils/utils';
const { Title } = Typography;

export const CommonPartners: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPartner, setModalPartner] = useState<TrainingPartner | null>(null);
    const partners = useAppSelector(selectPartners);

    return (
        <>
            <div className='common-partners'>
                <Title level={4} className='common-partners-title'>
                    Мои партнёры по тренировкам
                </Title>
                {!isArrayWithItems(partners) ? (
                    <div className='common-partners-empty'>
                        У вас пока нет партнёров для совместных тренировок
                    </div>
                ) : (
                    <div className='common-partners-cards'>
                        {partners.map((partner, index) => (
                            <div
                                key={partner.id}
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setModalPartner(partner);
                                }}
                            >
                                <PartnerCard partner={partner} index={index} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <PartnerModal
                modalProps={{
                    isOpen: isModalOpen,
                    onCloseClick: () => setIsModalOpen(false),
                }}
                partner={modalPartner}
            />
        </>
    );
};
