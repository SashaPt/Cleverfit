import { Rule } from "antd/lib/form";

export const validateEmail = (_rule: Rule, value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (value && !emailRegex.test(value)) {
        return Promise.reject(new Error('Введите, пожалуйста, корректный email!'));
    } else {
        return Promise.resolve();
    }
};
export const validatePassword = (_rule: Rule, value: string) => {
    const notLength = value ? value.length < 8 : false;
    const notCase = value ? !(/[A-Z]/.test(value) && /[a-z]/.test(value)) : false;
    const notNums = value ? !/[0-9]/.test(value) : false;
    if (value && (notLength || notCase || notNums)) {
        return Promise.reject(
            new Error('Пароль не менее 8 символов, с заглавной буквой и цифрой'),
        );
    } else {
        return Promise.resolve('Пароль не менее 8 символов, с заглавной буквой и цифрой');
    }
};