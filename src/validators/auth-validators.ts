import { Rule } from 'antd/lib/form';
import {
    EMAIL_REGEX,
    LOWER_CASE_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
} from '../constants/constants';

export const validateEmail = (_rule: Rule, value: string) => {
    const emailRegex = EMAIL_REGEX;
    if (value && !emailRegex.test(value)) {
        return Promise.reject(new Error('Введите, пожалуйста, корректный email!'));
    } else {
        return Promise.resolve();
    }
};
export const validatePassword = (_rule: Rule, value: string) => {
    const notLength = value ? value.length < 8 : false;
    const notCase = value ? !(UPPER_CASE_REGEX.test(value) && LOWER_CASE_REGEX.test(value)) : false;
    const notNums = value ? !NUMBERS_REGEX.test(value) : false;
    if (value && (notLength || notCase || notNums)) {
        return Promise.reject(new Error());
    } else {
        return Promise.resolve();
    }
};
