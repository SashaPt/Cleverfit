import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.scss';
import logoAuth from '/logo_auth.svg';
import useForm from 'antd/lib/form/hooks/useForm';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Loader } from '../../../../components/loader/loader';
import { useDispatch } from 'react-redux';
import { FormTabs } from '../form-tabs/form-tabs';
import { useCheckEmailMutation, useLoginMutation } from '../../../../services/authApi';
import { selectEmail, setAccessToken, setEmail } from '@redux/auth/authSlice';
import { push } from 'redux-first-history';
import { Paths } from '../../../../routes/paths';
import { LoginData } from '../../../../types/auth/auth';
import { history } from '../../../../redux/configure-store';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { EMAIL_REGEX } from '@constants/constants';
import { BASE_URL } from '../../../../http';

export const Login: React.FC = () => {
    const [loginForm] = useForm();
    const [login, { isLoading }] = useLoginMutation();
    const [checkEmail, { isLoading: isLoadingCheckEmail }] = useCheckEmailMutation();
    const location = useLocation();
    const dispatch = useDispatch();
    const emailState: string = useAppSelector(selectEmail);
    const emailValue = Form.useWatch('email', loginForm);
    const prevPath = location.state?.prevPath;

    const [isEmailError, setIsEmailError] = useState(false);

    const onFinish = async (value: LoginData) => {
        const { email, password } = value;

        try {
            const response = await login({ email, password }).unwrap();
            if (response && response.accessToken) {
                if (value.remember) {
                    localStorage.setItem('jwtToken', response.accessToken);
                    localStorage.setItem('email', email);
                } else {
                    localStorage.setItem('jwtToken', '');
                }
                dispatch(setAccessToken(response.accessToken));
                dispatch(push(Paths.MAIN, { prevPath: history.location.pathname }));
            }
        } catch (err: unknown) {
            dispatch(
                push(Paths.RESULT + '/' + Paths.ERROR_LOGIN, {
                    prevPath: history.location.pathname,
                }),
            );
        }
    };

    const onGoogleLogin = () => {
        window.location.href = `${BASE_URL}/auth/google`;
    };

    const onForgot = () => {
        if (!emailValue) {
            setIsEmailError(true);
        } else {
            dispatch(setEmail(emailValue));
            handleCheckEmail(emailValue);
        }
    };

    const handleCheckEmail = async (email: string) => {
        try {
            await checkEmail({ email }).unwrap();

            dispatch(
                push(Paths.AUTH + '/' + Paths.CONFIRM_EMAIL, {
                    prevPath: history.location.pathname,
                }),
            );

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.status === 404 && err.data.message === 'Email не найден') {
                dispatch(
                    push(Paths.RESULT + '/' + Paths.ERROR_CHECK_EMAIL_NO_EXIST, {
                        prevPath: history.location.pathname,
                    }),
                );
            } else {
                dispatch(
                    push(Paths.RESULT + '/' + Paths.ERROR_CHECK_EMAIL, {
                        prevPath: history.location.pathname,
                    }),
                );
            }
        }
    };

    const onCheckEmail = () => {
        const email = loginForm.getFieldValue('email');
        const emailRegex = EMAIL_REGEX;
        if (email && emailRegex.test(email)) {
            setIsEmailError(false);
        } else {
            setIsEmailError(true);
        }
    };

    useEffect(() => {
        if (prevPath == Paths.RESULT + '/' + Paths.ERROR_CHECK_EMAIL) {
            handleCheckEmail(emailState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {(isLoading || isLoadingCheckEmail) && <Loader />}
            <Form
                form={loginForm}
                name='auth_login'
                className='login-form'
                initialValues={{ remember: false }}
                onFieldsChange={onCheckEmail}
                onFinish={onFinish}
            >
                <img src={logoAuth} className='logo' alt='Cleverfit logo' />

                <FormTabs active='login' />
                <Form.Item
                    name='email'
                    rules={[
                        {
                            type: 'email',
                            message: 'Введите, пожалуйста, корректый email!',
                        },
                        { required: true, message: 'Введите, пожалуйста, email!' },
                    ]}
                >
                    <Input addonBefore='e-mail:' data-test-id='login-email' />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[
                        { required: true, message: 'Введите, пожалуйста, пароль!' },
                        { min: 8, message: '' },
                    ]}
                >
                    <Input.Password
                        placeholder='Пароль'
                        data-test-id='login-password'
                        autoComplete='on'
                    />
                </Form.Item>
                <Form.Item className='form-item-container'>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button
                        type='link'
                        className='login-form-forgot'
                        size='large'
                        data-test-id='login-forgot-button'
                        onClick={onForgot}
                        disabled={isEmailError}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item className='login-form-button-wrapper'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                        size='large'
                        block={true}
                        data-test-id='login-submit-button'
                    >
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        className='login-form-google'
                        htmlType='button'
                        size='large'
                        icon={<GooglePlusOutlined />}
                        block={true}
                        onClick={onGoogleLogin}
                    >
                        Войти через Google
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
