import './change-password.scss';
import { Button, Form, Input } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAccessToken, selectPassword, setPassword } from '@redux/auth/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Paths } from '../../../../routes/paths';
import { validatePassword } from '../../../../validators/auth-validators';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import { useChangePasswordMutation } from '../../../../services/authApi';
import { Loader } from '@components/loader/loader';
import { ChangePasswordData } from '../../../../types/auth/auth';
import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';

export const ChangePassword: React.FC = () => {
    const token = useAppSelector(selectAccessToken);
    const location = useLocation();
    const [isValid, setIsValid] = useState(false);
    const [changeForm] = useForm();
    const dispatch = useDispatch();
    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const passwordState = useAppSelector(selectPassword);
    const prevPath = location.state?.prevPath;

    if (token) {
        return <Navigate to={Paths.MAIN} />;
    }
    if (!prevPath) {
        return <Navigate to={Paths.AUTH} />;
    }

    const onChange = () => {
        const touched = changeForm.isFieldsTouched(true);
        const notErr = !changeForm.getFieldsError().some(({ errors }) => errors.length);
        const isFormValid = touched && notErr;
        setIsValid(isFormValid);
    };

    const onFinish = () => {
        const { password, confirmPassword } = changeForm.getFieldsValue();
        if (password && confirmPassword) {
            dispatch(setPassword(password));
            handleChangePassword({ password, confirmPassword });
        }
    };

    const handleChangePassword = async (value: ChangePasswordData) => {
        const { password, confirmPassword } = value;
        try {
            await changePassword({ password, confirmPassword }).unwrap();

            dispatch(
                push(Paths.RESULT + '/' + Paths.SUCCESS_CHANGE_PASSWORD, {
                    prevPath: location.pathname,
                }),
            );
        } catch (err) {
            dispatch(
                push(Paths.RESULT + '/' + Paths.ERROR_CHANGE_PASSWORD, {
                    prevPath: location.pathname,
                }),
            );
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (prevPath == Paths.RESULT + '/' + Paths.ERROR_CHANGE_PASSWORD) {
            handleChangePassword({ password: passwordState, confirmPassword: passwordState });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {isLoading && <Loader />}
            <Form
                form={changeForm}
                name='auth_change'
                className='change-form'
                onFinish={onFinish}
                onFieldsChange={onChange}
            >
                <Title level={3} style={{ textAlign: 'center', marginBottom: '32px', fontWeight: 500 }}>
                    Восстановление аккаунта
                </Title>
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
                    <Input.Password placeholder='Пароль' data-test-id='change-password' />
                </Form.Item>
                <Form.Item
                    name='confirmPassword'
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
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>

                <Button
                    type='primary'
                    htmlType='submit'
                    className='change-form-button'
                    size='large'
                    block={true}
                    data-test-id='change-submit-button'
                    disabled={!isValid}
                >
                    Сохранить
                </Button>
            </Form>
        </>
    );
};
