import './feedbacks-page.scss';
import { Button, Layout, Modal } from 'antd';
import { NoFeedbacks } from './components/no-feedbacks/no-feedbacks';
import React, { createRef, useEffect, useState } from 'react';
import * as results from '@pages/result-page/components/result/results';
import { PageSider } from '@components/sider/pageSider';
import { PageHeader } from '@components/header/pageHeader';
import { Content } from 'antd/lib/layout/layout';
import { useLazyGetFeedbacksQuery } from '../../services/feedbacksApi';
import { FeedbackSuccess } from '../../types/feedbacks/feedbacks';
import { Feedback } from './components/feedback/feedback';
import { Loader } from '@components/loader/loader';
import { WriteReview } from './components/write-review/write-review';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAdded } from '@redux/feedbacks/feedbacksSlice';
import { useSortedFeedbacks } from '@hooks/useSorted';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';
import { Paths } from '../../routes/paths';
import { Result } from '@pages/result-page';
import { useLocation } from 'react-router-dom';
import { FEEDBACKS_LIMIT } from '@constants/constants';
import { setAccessToken } from '@redux/auth/authSlice';

export const FeedbacksPage: React.FC = () => {
    const [getFeedbacks, { isLoading, isError, isSuccess }] = useLazyGetFeedbacksQuery();
    const [feedbacks, setFeedbacks] = useState<FeedbackSuccess[]>([]);
    const [height, setHeight] = useState('');
    const isAdded = useAppSelector(selectAdded);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const itemsRef = createRef<HTMLDivElement>();

    const updateFeedbacks = async () => {
        try {
            const resp = await getFeedbacks(null).unwrap();
            setFeedbacks(resp);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.statusCode === 403) {
                localStorage.removeItem('jwtToken');
                dispatch(setAccessToken(''));
                dispatch(push(Paths.AUTH));
            } else {
                setIsErrorModalOpen(true);
            }
        }
    };

    const sortedFeedbacks = useSortedFeedbacks(feedbacks || []);

    useEffect(() => {
        if (isSuccess && itemsRef && itemsRef.current) {
            const heightEl = itemsRef?.current?.scrollHeight;
            if (!height) {
                setHeight(`${heightEl}px`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsRef]);

    useEffect(() => {
        updateFeedbacks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdded]);

    return (
        <>
            {isLoading && <Loader />}
            <Layout className='feedbacks-page'>
                <PageSider />
                <Layout className='feedbacks-content'>
                    <PageHeader
                        isMain={false}
                        breadcrumbs={[
                            { id: 1, name: 'Главная', href: Paths.MAIN },
                            { id: 2, name: 'Отзывы пользователей', href: '' },
                        ]}
                    />
                    <Content>
                        {!isLoading &&
                            (sortedFeedbacks.length ? (
                                <div className='feedbacks-container _container'>
                                    <div
                                        className='feedbacks-items'
                                        ref={itemsRef}
                                        style={{ maxHeight: isItemsCollapsed ? 'unset' : height }}
                                    >
                                        {sortedFeedbacks.map((feedback, index) => {
                                            if (isItemsCollapsed && index >= FEEDBACKS_LIMIT) {
                                                return;
                                            }
                                            return <Feedback key={feedback.id} {...feedback} />;
                                        })}
                                    </div>
                                    <div className='feedbacks-buttons'>
                                        <WriteReview />
                                        <Button
                                            type='link'
                                            className='feedbacks-all-reviews-button'
                                            data-test-id='all-reviews-button'
                                            onClick={() => setIsItemsCollapsed(!isItemsCollapsed)}
                                        >
                                            {isItemsCollapsed
                                                ? 'Развернуть все отзывы'
                                                : 'Свернуть все отзывы'}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                !isError && <NoFeedbacks />
                            ))}
                        <Modal
                            className='feedbacks-error-modal'
                            centered={true}
                            open={isErrorModalOpen}
                            footer={[
                                <Button
                                    key='submit'
                                    type='primary'
                                    onClick={() => {
                                        setIsErrorModalOpen(false);
                                        dispatch(push(location.state?.prevPath));
                                    }}
                                    className='feedbacks-submit-button'
                                >
                                    Назад
                                </Button>,
                            ]}
                            closeIcon={false}
                            closable={false}
                            width={'fit-content'}
                            bodyStyle={{ padding: 0 }}
                        >
                            <Result {...results.resultGetFeedbacksError}></Result>
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
