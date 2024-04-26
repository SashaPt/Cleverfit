import './partner-modal.scss';
import React from 'react';
import { ModalProps } from '../../../../types/common/common';
import { Modal } from 'antd';
import { PartnerCard } from '../partner-card/partner-card';
import { TrainingPartner } from '../../../../types/training/training';

export const PartnerModal: React.FC<{
    modalProps: ModalProps;
    partner: TrainingPartner | null;
}> = ({ modalProps, partner }) => (
    <>
        {partner && modalProps.isOpen && (
            <Modal
                className='partner-modal'
                data-test-id='partner-modal'
                open={modalProps.isOpen}
                onCancel={modalProps.onCloseClick}
                maskClosable={true}
                centered={true}
                footer={null}
                bodyStyle={{ padding: 0 }}
            >
                <PartnerCard
                    partner={partner}
                    isJoint={true}
                    isInModal={true}
                    onDelete={modalProps.onCloseClick}
                />
            </Modal>
        )}
    </>
);
