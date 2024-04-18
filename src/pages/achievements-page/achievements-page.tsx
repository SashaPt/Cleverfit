import './achievements-page.scss';
import { PageSider } from '@components/sider/pageSider';
import { Layout, Tabs } from 'antd';
import { PageHeader } from '@components/header/pageHeader';
import { Content } from 'antd/lib/layout/layout';
import { useLazyGetTrainingsListQuery } from '../../services/calendarApi';
import { useEffect, useState } from 'react';
import { Loader } from '@components/loader/loader';
import { setTrainingsList } from '@redux/calendar/calendarSlice';
import { useDispatch } from 'react-redux';
import { Statistics } from './components/statistics/statistics';
import { Paths } from '../../routes/paths';

const tabs = [
    {
        label: 'За неделю',
        key: 'week',
    },
    {
        label: 'За месяц',
        key: 'month',
    },
    {
        label: 'За всё время (PRO)',
        key: 'all',
        disabled: true,
    },
];

export const AchievementsPage: React.FC = () => {
    const [getTrainings, { isLoading }] = useLazyGetTrainingsListQuery();
    const [period, setPeriod] = useState('week');
    const dispatch = useDispatch();

    const getTrainingsList = async () => {
        try {
            const resp = await getTrainings(null).unwrap();
            dispatch(setTrainingsList(resp));
        } catch (error) {
            return;
        }
    };

    const onChange = (activeKey: string) => {
        setPeriod(activeKey);
    };

    useEffect(() => {
        getTrainingsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            <Layout className='achievements-page'>
                <PageSider menuActive='achievements' />
                <Layout className='achievements-content'>
                    <PageHeader
                        isMain={false}
                        isSettings={true}
                        breadcrumbs={[
                            { id: 1, name: 'Главная', href: Paths.MAIN },
                            { id: 2, name: 'Достижения', href: '' },
                        ]}
                    />
                    <Content>
                        <div className='_container '>
                            <div className='achievements-container'>
                                <Tabs
                                    className='achievements-tabs'
                                    animated={false}
                                    defaultActiveKey='1'
                                    onChange={onChange}
                                    items={tabs}
                                />
                                <div className='achievements-statistics'>
                                    <Statistics period={period} />
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
