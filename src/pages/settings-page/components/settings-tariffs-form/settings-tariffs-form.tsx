import { Button, Form, Radio, RadioChangeEvent } from 'antd';
import './settings-tariffs-form.scss';
import React, { useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTariffsList } from '@redux/profile/profileSlice';
import { useChangeTariffMutation } from '../../../../services/profileApi';

export const SettingsTariffsForm: React.FC<{
    setModalOpen: () => void;
    setDrawerClose: () => void;
}> = ({ setModalOpen, setDrawerClose }) => {
    const tariffs = useAppSelector(selectTariffsList);
    const [value, setValue] = useState(0);
    const [newTariff, setNewTariff] = useState('');
    const [changeTariff] = useChangeTariffMutation();

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        setNewTariff(e.target.name || '');
    };

    const onFinish = async () => {
        const { tariffId, days } = { tariffId: newTariff, days: value };

        try {
            await changeTariff({ tariffId, days }).unwrap();
            setDrawerClose();
            setModalOpen();
        } catch (error) {
            return;
        }
    };

    return (
        <>
            <div className='settings-tariffs-subtitle'>Стоимость тарифа</div>
            <Form className='settings-tariffs-form' onFinish={onFinish}>
                {tariffs.map((tarrif) => (
                    <div
                        className='settings-tariff-cost'
                        data-test-id='tariff-cost'
                        key={tarrif._id}
                    >
                        <Radio.Group name={tarrif._id} value={value} onChange={onChange}>
                            {tarrif.periods.map((period) => (
                                <Radio value={period.days} key={period.days}>
                                    {period.text}{' '}
                                    <span
                                        className='settings-tariff-cost-value'
                                        data-test-id={`tariff-${period.cost}`}
                                    >
                                        {`${period.cost}`.replace(/\./g, ',')}$
                                    </span>
                                </Radio>
                            ))}
                        </Radio.Group>
                    </div>
                ))}
                <div className='settings-tariffs-form-footer'>
                    <Button
                        htmlType='submit'
                        type='primary'
                        block={true}
                        disabled={!value}
                        data-test-id='tariff-submit'
                    >
                        Выбрать и оплатить
                    </Button>
                </div>
            </Form>
        </>
    );
};
