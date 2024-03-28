import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import './registration.scss';
import logoAuth from '/logo_auth.svg';
import { GooglePlusOutlined } from '@ant-design/icons';
import { FormTabs } from '../form-tabs/form-tabs';
import { validateEmail, validatePassword } from '../../../../validators/auth-validators';
import { RegistrationData } from '../../../../types/auth/auth';
import useForm from 'antd/lib/form/hooks/useForm';
import { useRegisterMutation } from '../../../../services/authApi';
import { Loader } from '../../../../components/loader/loader';
import { Paths } from '../../../../routes/paths';
import { push } from 'redux-first-history';
import { useDispatch } from 'react-redux';
import { selectEmail, selectPassword, setEmail, setPassword } from '@redux/auth/authSlice';
import { history } from '../../../../redux/configure-store';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const Registration: React.FC = () => {
    const [registrationForm] = useForm();
    const [register, { isLoading }] = useRegisterMutation();
    const [isValid, setIsValid] = useState(false);
    const authEmail = useAppSelector(selectEmail);
    const authPassword = useAppSelector(selectPassword);
    const location = useLocation();
    const dispatch = useDispatch();

    const prevPath = location.state?.prevPath;

    const onChange = () => {
        const touched = registrationForm.isFieldsTouched(true);
        const notErr = !registrationForm.getFieldsError().some(({ errors }) => errors.length);
        const isFormValid = touched && notErr;
        setIsValid(isFormValid);
    };

    const onFinish = async (value: RegistrationData) => {
        const { email: emailValue, password: passwordValue } = value;
        if (emailValue && passwordValue) {
            dispatch(setEmail(emailValue));
            dispatch(setPassword(passwordValue));
        }
        const [email, password] =
            emailValue && passwordValue ? [emailValue, passwordValue] : [authEmail, authPassword];
        try {
            await register({ email, password }).unwrap();

            dispatch(
                push(`${Paths.RESULT}/${Paths.SUCCESS}`, {
                    prevPath: history.location.pathname,
                }),
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.status === 409) {
                dispatch(
                    push(Paths.RESULT + '/' + Paths.ERROR_USER_EXIST, {
                        prevPath: history.location.pathname,
                    }),
                );
            } else {
                dispatch(
                    push(Paths.RESULT + '/' + Paths.ERROR, {
                        prevPath: history.location.pathname,
                    }),
                );
            }
        }
    };

    useEffect(() => {
        if (prevPath == '/result/error') {
            onFinish({ email: authEmail, password: authPassword });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            <Form
                form={registrationForm}
                name='auth_registration'
                className='registration-form'
                onFinish={onFinish}
                onFieldsChange={onChange}
            >
                <img src={logoAuth} className='logo' alt='Cleverfit logo' />
                <FormTabs active='registration' />

                <Form.Item
                    name='email'
                    rules={[
                        {
                            validator: validateEmail,
                        },
                        { required: true, message: 'Введите, пожалуйста, email!' },
                    ]}
                >
                    <Input addonBefore='e-mail:' data-test-id='registration-email' />
                </Form.Item>
                <Form.Item
                    name='password'
                    help={
                        <div style={{ fontSize: '12px' }}>
                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </div>
                    }
                    rules={[
                        { required: true, message: 'Введите, пожалуйста, пароль' },
                        { validator: validatePassword },
                    ]}
                >
                    <Input.Password placeholder='Пароль' data-test-id='registration-password' />
                </Form.Item>
                <Form.Item
                    name='confirm-password'
                    rules={[
                        { required: true, message: 'Повторите, пожалуйста, пароль' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder='Повторите пароль'
                        data-test-id='registration-confirm-password'
                    />
                </Form.Item>

                <Form.Item className='registration-form-button-wrapper'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='registration-form-button'
                        size='large'
                        block={true}
                        disabled={!isValid}
                        data-test-id='registration-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        className='registration-form-google'
                        size='large'
                        icon={<GooglePlusOutlined />}
                        block={true}
                    >
                        Регистрация через Google
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
