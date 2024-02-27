export interface AuthState {
    email: string;
    password: string;
    accessToken: string;
}

export interface LoginData {
    email: string;
    password: string;
    remember?: boolean;
}

export interface LoginSuccess {
    accessToken: string;
}

export interface RegistrationData {
    email: string;
    password: string;
    'confirm-password'?: string;
}

export interface CheckEmailData {
    email: string;
}

export interface CheckEmailSuccess {
    email: string;
    message: string;
}

export interface ConfirmEmailData {
    email: string;
    code: string;
}

export interface ConfirmEmailSuccess {
    email: string;
    message: string;
}

export interface ChangePasswordData {
    password: string;
    confirmPassword: string;
}

export interface ChangePasswordSuccess {
    message: string;
}
