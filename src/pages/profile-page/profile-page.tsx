import './profile-page.scss';
import { Alert, Button, DatePicker, Form, Input, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageSider } from '@components/sider/pageSider';
import { PageHeader } from '@components/header/pageHeader';
import { Content } from 'antd/lib/layout/layout';
import { UploadImage } from './components/upload-image/upload-image';
import { useForm } from 'antd/lib/form/Form';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { validateEmail, validatePassword } from '../../validators/auth-validators';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUser, selectUserImage, setIsUserQueried } from '@redux/profile/profileSlice';
import { useUpdateUserMutation } from '../../services/profileApi';
import { UserData } from '../../types/profile/profile';
import { ProfileErrorModal } from './components/profile-error-modal/profile-error-modal';
import { useDispatch } from 'react-redux';
import { DATE_FORMAT } from '@constants/constants';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
});

export const ProfilePage: React.FC = () => {
    const [profileForm] = useForm();
    const [isValid, setIsValid] = useState(false);
    const [isUploadError, setIsUploadError] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [updateUser] = useUpdateUserMutation();
    const user = useAppSelector(selectUser);
    const userImage = useAppSelector(selectUserImage);
    const dispatch = useDispatch();

    const handleUpdateUser = async (values: UserData) => {
        try {
            await updateUser(values).unwrap();
            setIsAlertVisible(true);
            setIsValid(false);
            setIsUploadError(true);
            dispatch(setIsUserQueried(true));
            profileForm.resetFields(['password', 'confirm-password']);
        } catch {
            setIsErrorModalOpen(true);
        }
    };

    const onChange = () => {
        const notErr = !profileForm.getFieldsError().some(({ errors }) => errors.length);
        const isFormValid = notErr;
        setIsValid(isFormValid);
    };

    const onFinish = (values: UserData) => {
        const { email, firstName, lastName, birthday, password } = values;
        handleUpdateUser({
            email,
            firstName,
            lastName,
            birthday: birthday ? birthday : undefined,
            password: password ? password : undefined,
            imgSrc: userImage,
        });
    };

    useEffect(() => {
        if (user) {
            const { email, firstName, lastName, birthday } = user;
            profileForm.setFieldsValue({
                email,
                firstName,
                lastName,
                birthday: birthday ? moment(new Date(Date.parse(birthday))) : '',
                password: '',
            });
        }
    }, [profileForm, user]);

    return (
        <>
            <Layout className='profile-page'>
                <PageSider menuActive='profile' />
                <Layout className='profile-content'>
                    <PageHeader
                        isMain={false}
                        isSettings={true}
                        isInline={true}
                        breadcrumbs={[{ id: 1, name: 'Профиль', href: '' }]}
                    />
                    <Content>
                        <div className='_container'>
                            <div className='profile-container'>
                                <Form
                                    layout='vertical'
                                    className='profile-form'
                                    form={profileForm}
                                    onFieldsChange={onChange}
                                    onFinish={onFinish}
                                >
                                    <div className='profile-block'>
                                        <div className='profile-subtitle'>Личная информация</div>
                                        <div className='profile-form-block'>
                                            <Form.Item name='imgSrc' className='profile-img'>
                                                <UploadImage
                                                    setError={() => setIsUploadError(true)}
                                                    setSuccess={() => setIsUploadError(false)}
                                                />
                                            </Form.Item>
                                            <div className='profile-inputs'>
                                                <Form.Item
                                                    name='firstName'
                                                    className='profile-input-wrapper'
                                                >
                                                    <Input
                                                        placeholder='Имя'
                                                        data-test-id='profile-name'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name='lastName'
                                                    className='profile-input-wrapper'
                                                >
                                                    <Input
                                                        placeholder='Фамилия'
                                                        data-test-id='profile-surname'
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name='birthday'
                                                    className='profile-input-wrapper'
                                                >
                                                    <DatePicker
                                                        placeholder='Дата рождения'
                                                        locale={locale}
                                                        format={DATE_FORMAT}
                                                        data-test-id='profile-birthday'
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='profile-block'>
                                        <div className='profile-subtitle'>
                                            Приватность и авторизация
                                        </div>
                                        <div className='profile-info'>
                                            <Form.Item
                                                name='email'
                                                className='profile-input-wrapper'
                                                rules={[
                                                    { validator: validateEmail },
                                                    {
                                                        required: true,
                                                        message: 'Введите, пожалуйста, email!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    addonBefore='e-mail:'
                                                    data-test-id='profile-email'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name='password'
                                                className='profile-input-wrapper'
                                                help={
                                                    <div
                                                        style={{
                                                            fontSize: '12px',
                                                            marginBottom: '12px',
                                                        }}
                                                    >
                                                        Пароль не менее 8 символов, с заглавной
                                                        буквой и цифрой
                                                    </div>
                                                }
                                                rules={[{ validator: validatePassword }]}
                                            >
                                                <Input.Password
                                                    autoComplete='off'
                                                    placeholder='Пароль'
                                                    data-test-id='profile-password'
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name='confirm-password'
                                                className='profile-input-wrapper'
                                                rules={[
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (
                                                                !value ||
                                                                getFieldValue('password') === value
                                                            ) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(
                                                                new Error('Пароли не совпадают'),
                                                            );
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password
                                                    placeholder='Повторите пароль'
                                                    data-test-id='profile-repeat-password'
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <Form.Item>
                                        <Button
                                            className='profile-button-submit'
                                            htmlType='submit'
                                            type='primary'
                                            data-test-id='profile-submit'
                                            disabled={!isValid && isUploadError}
                                        >
                                            Сохранить изменения
                                        </Button>
                                    </Form.Item>
                                </Form>
                                {isAlertVisible && (
                                    <Alert
                                        className='profile-alert'
                                        data-test-id='alert'
                                        message='Данные профиля успешно обновлены'
                                        type='success'
                                        showIcon
                                        closable
                                        onClose={() => setIsAlertVisible(false)}
                                    />
                                )}
                                <ProfileErrorModal
                                    modalProps={{
                                        isOpen: isErrorModalOpen,
                                        onCloseClick: () => setIsErrorModalOpen(false),
                                    }}
                                    isToSave={true}
                                />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
