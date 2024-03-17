import { CheckCircleFilled, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { IResult } from './result.interface';
import errorAvatar from '/error_avatar.svg';
import { Paths } from '../../../../routes/paths';

const resultLoginError: IResult = {
    icon: <WarningFilled style={{ color: '#faad14', fontSize: '80px' }} />,
    title: 'Вход не выполнен',
    description: 'Что-то пошло не так. Попробуйте еще раз',
    buttonName: 'Повторить',
    buttonData: 'login-retry-button',
    buttonNavigate: Paths.AUTH,
};
const resultRegistrationError: IResult = {
    icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '80px' }} />,
    title: 'Данные не сохранились',
    description: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
    buttonName: 'Повторить',
    buttonData: 'registration-retry-button',
    buttonNavigate: Paths.AUTH + '/' + Paths.REGISTRATION,
};
const resultRegistrationEmailError: IResult = {
    icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '80px' }} />,
    title: 'Данные не сохранились',
    description:
        'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
    buttonName: 'Назад к регистрации',
    buttonData: 'registration-back-button',
    buttonNavigate: Paths.AUTH + '/' + Paths.REGISTRATION,
};
const resultRegistrationSuccess: IResult = {
    icon: <CheckCircleFilled style={{ color: '#52c41a', fontSize: '80px' }} />,
    title: 'Регистрация успешна',
    description:
        'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
    buttonName: 'Войти',
    buttonData: 'registration-enter-button',
    buttonNavigate: Paths.AUTH,
};
const resultCheckError: IResult = {
    icon: <img src={errorAvatar} />,
    title: 'Что-то пошло не так',
    description: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
    buttonName: 'Назад',
    buttonData: 'check-back-button',
    buttonNavigate: Paths.AUTH,
};
const resultCheckEmailError: IResult = {
    icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '80px' }} />,
    title: 'Такой e-mail не зарегистрирован',
    description:
        'Мы не нашли в базе вашего e-mail. Попробуйте войти\u00A0с\u00A0другим\u00A0e\u2011mail.',
    buttonName: 'Попробовать снова',
    buttonData: 'check-retry-button',
    buttonNavigate: Paths.AUTH,
};
const resultChangeError: IResult = {
    icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '80px' }} />,
    title: 'Данные не сохранились',
    description: 'Что-то пошло не так. Попробуйте ещё раз',
    buttonName: 'Повторить',
    buttonData: 'change-retry-button',
    buttonNavigate: Paths.AUTH + '/' + Paths.CHANGE_PASSWORD,
};
const resultChangeSuccess: IResult = {
    icon: <CheckCircleFilled style={{ color: '#52c41a', fontSize: '80px' }} />,
    title: 'Пароль успешно изменен',
    description: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
    buttonName: 'Вход',
    buttonData: 'change-entry-button',
    buttonNavigate: Paths.AUTH,
};
const resultWriteReviewSuccess: IResult = {
    icon: <CheckCircleFilled style={{ color: '#52c41a', fontSize: '80px' }} />,
    title: 'Отзыв успешно опубликован',
    description: '',
    buttonName: '',
    buttonData: '',
    buttonNavigate: '',
};
const resultWriteReviewError: IResult = {
    icon: <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '80px' }} />,
    title: 'Данные не сохранились',
    description: 'Что-то пошло не так. Попробуйте ещё раз.',
    buttonName: '',
    buttonData: '',
    buttonNavigate: '',
};
const resultGetFeedbacksError: IResult = {
    icon: <img src={errorAvatar} />,
    title: 'Что-то пошло не так',
    description: 'Произошла ошибка, попробуйте\u00A0ещё\u00A0раз.',
    buttonName: '',
    buttonData: 'check-back-button',
    buttonNavigate: '',
};

const resultGetCalendarError: IResult = {
    icon: <img src={errorAvatar} />,
    title: 'Что-то пошло не так',
    description: 'Произошла ошибка, попробуйте\u00A0ещё\u00A0раз.',
    buttonName: '',
    buttonData: 'check-back-button',
    buttonNavigate: '',
};

export {
    resultLoginError,
    resultRegistrationError,
    resultRegistrationEmailError,
    resultRegistrationSuccess,
    resultCheckError,
    resultCheckEmailError,
    resultChangeError,
    resultChangeSuccess,
    resultWriteReviewSuccess,
    resultWriteReviewError,
    resultGetFeedbacksError,
    resultGetCalendarError,
};
