import './search-partners.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import React, { useEffect, useState } from 'react';
import { selectJointUsers } from '@redux/training/trainingSlice';
import { PartnerCard } from '../partner-card/partner-card';
import { Button, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TrainingPartner } from '../../../../types/training/training';
import { useSortedPartners } from '@hooks/useSorted';
const { Search } = Input;

export const SearchPartners: React.FC<{
    onBackClick: () => void;
    onCreateClick: () => void;
}> = ({ onBackClick, onCreateClick }) => {
    const jointUsers = useAppSelector(selectJointUsers);
    const sortedUsers = useSortedPartners(jointUsers);
    const [searchValue, setSearchValue] = useState('');
    const [searchedUsers, setSearchedUsers] = useState<TrainingPartner[]>(sortedUsers);

    const onSearch = (value: string) => {
        setSearchValue(value);
        const filtered = [...sortedUsers].filter((user) =>
            (user.name || 'Пользователь').toLowerCase().includes(value.toLowerCase()),
        );
        setSearchedUsers(filtered);
    };

    useEffect(() => {
        if (sortedUsers) {
            setSearchedUsers(sortedUsers);
        }
    }, [sortedUsers]);

    return (
        <>
            <div className='search-partners'>
                <div className='search-partners-line'>
                    <Button
                        className='search-partners-back'
                        type='text'
                        icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
                        onClick={onBackClick}
                    >
                        Назад
                    </Button>
                    <Search
                        data-test-id='search-input'
                        placeholder='Поиск по имени'
                        allowClear
                        onSearch={onSearch}
                    />
                </div>
                <List
                    className='search-partners-cards'
                    dataSource={searchedUsers}
                    pagination={{
                        defaultPageSize: 12,
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                    }}
                    renderItem={(user, index) => (
                        <List.Item>
                            <PartnerCard
                                key={user.id}
                                partner={user}
                                index={index}
                                isJoint={true}
                                searchValue={searchValue}
                                onCreateClick={onCreateClick}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
};
