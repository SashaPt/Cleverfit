import VerificationInput from 'react-verification-input';
import './confirm-email.scss';
import { Card, Form } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAccessToken, selectEmail } from '@redux/auth/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from '../../../../routes/paths';
import { useDispatch } from 'react-redux';
import { useConfirmEmailMutation } from '../../../../services/authApi';
import useForm from 'antd/lib/form/hooks/useForm';
import { history } from '../../../../redux/configure-store';
import { push } from 'redux-first-history';
import { useState } from 'react';
import { Loader } from '@components/loader/loader';

export const ConfirmEmail: React.FC = () => {
    const token = useAppSelector(selectAccessToken);
    const location = useLocation();
    const [confirmForm] = useForm();
    const dispatch = useDispatch();
    const [confirmEmail, { isLoading }] = useConfirmEmailMutation();
    const [isValid, setIsValid] = useState(true);
    const email = useAppSelector(selectEmail);
    const prevPath = location.state?.prevPath;

    if (token) {
        return <Navigate to={Paths.MAIN} />;
    }
    if (!prevPath) {
        return <Navigate to={Paths.AUTH} />;
    }

    const onComplete = async () => {
        const code = confirmForm.getFieldValue('verification');
        try {
            await confirmEmail({ email, code }).unwrap();

            dispatch(
                push(Paths.AUTH + '/' + Paths.CHANGE_PASSWORD, {
                    prevPath: history.location.pathname,
                }),
            );
        } catch (err) {
            confirmForm.resetFields(['verification']);
            setIsValid(false);
        }
    };
    const onChange = () => {
        setIsValid(true);
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Card className='confirm-card' bordered={false}>
                    <Meta
                        avatar={
                            <ExclamationCircleFilled
                                style={{ color: '#2f54eb', fontSize: '80px' }}
                            />
                        }
                        title={
                            <p style={{ margin: 0 }}>
                                Введите код <br />
                                для восстановления аккауанта
                            </p>
                        }
                        description={
                            <span>
                                Мы отправили вам на e-mail <b>{email}</b> шестизначный код. Введите
                                его в поле ниже.
                            </span>
                        }
                        className='confirm-content'
                    />
                    <Form
                        name='confirm_email'
                        className={`confirm-form ${isValid ? '' : 'confirm-invalid'}`}
                        form={confirmForm}
                    >
                        <Form.Item name='verification'>
                            <VerificationInput
                                inputProps={{ 'data-test-id': 'verification-input' }}
                                placeholder=''
                                onComplete={onComplete}
                                onChange={onChange}
                            />
                        </Form.Item>
                    </Form>
                    <span className='confirm-note'>
                        Не пришло письмо? Проверьте папку&nbsp;Спам.
                    </span>
                </Card>
            )}
        </>
    );
};
