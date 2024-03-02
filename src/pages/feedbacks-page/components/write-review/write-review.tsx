import './write-review.scss';
import React, { useState } from 'react';
import * as results from '@pages/result-page/components/result/results';
import useForm from 'antd/lib/form/hooks/useForm';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Form, Modal, Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useWriteFeedbackMutation } from '../../../../services/feedbacksApi';
import { Loader } from '@components/loader/loader';
import { Result } from '@pages/result-page';
import { useDispatch } from 'react-redux';
import { setAdded } from '@redux/feedbacks/feedbacksSlice';

export const WriteReview: React.FC = () => {
    const [reviewForm] = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [rateValue, setRateValue] = useState<number | undefined>();
    const [writeFeedback, { isLoading }] = useWriteFeedbackMutation();
    const dispatch = useDispatch();

    const resetForm = () => {
        setRateValue(undefined);
        reviewForm.resetFields();
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        try {
            const { message, rating } = reviewForm.getFieldsValue();
            await writeFeedback({ message, rating }).unwrap();
            resetForm();
            setIsSuccessModalOpen(true);
            dispatch(setAdded({ message, rating }));
        } catch (error) {
            setIsErrorModalOpen(true);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <Button
                type='primary'
                className='write-review-button'
                data-test-id='write-review'
                onClick={() => setIsModalOpen(true)}
            >
                Написать отзыв
            </Button>
            <Modal
                title='Ваш отзыв'
                className='write-review-modal'
                open={isModalOpen}
                centered={true}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        onClick={handleOk}
                        disabled={!rateValue && rateValue !== 0}
                        className='write-review-submit-button'
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>,
                ]}
            >
                <Form form={reviewForm} className='write-review-form'>
                    <Form.Item name='rating' rules={[{ required: true, message: '' }]}>
                        <Rate
                            onChange={(value) => {
                                setRateValue(value);
                            }}
                            value={rateValue}
                            character={({ index = 0 }) =>
                                rateValue && index < rateValue ? (
                                    <StarFilled style={{ fontSize: '24px' }} />
                                ) : (
                                    <StarOutlined style={{ fontSize: '24px' }} />
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item name='message'>
                        <TextArea
                            placeholder='Autosize height based on content lines'
                            autoSize={{ minRows: 2 }}
                            className='write-review-textarea'
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                className='write-review-error-modal'
                centered={true}
                open={isErrorModalOpen}
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        onClick={() => {
                            setIsErrorModalOpen(false);
                            setIsModalOpen(true);
                        }}
                        className='write-review-submit-button'
                        data-test-id='write-review-not-saved-modal'
                    >
                        Написать отзыв
                    </Button>,
                    <Button
                        key='close'
                        type='default'
                        onClick={() => {
                            setIsErrorModalOpen(false);
                        }}
                        className='write-review-close-button'
                    >
                        Закрыть
                    </Button>,
                ]}
                closeIcon={false}
                closable={false}
                width={'fit-content'}
                bodyStyle={{ padding: 0 }}
            >
                <Result {...results.resultWriteReviewError}></Result>
            </Modal>
            <Modal
                className='write-review-success-modal'
                centered={true}
                open={isSuccessModalOpen}
                footer={[
                    <Button
                        key='submit'
                        type='primary'
                        onClick={() => setIsSuccessModalOpen(false)}
                        className='write-review-submit-button'
                    >
                        Отлично
                    </Button>,
                ]}
                closeIcon={false}
                closable={false}
                width={'fit-content'}
                bodyStyle={{ padding: 0 }}
            >
                <Result {...results.resultWriteReviewSuccess}></Result>
            </Modal>
        </>
    );
};
