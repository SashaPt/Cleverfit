export type AuthState = {
    email: string;
    password: string;
    accessToken: string;
}

export type LoginData = {
    email: string;
    password: string;
    remember?: boolean;
}

export type LoginSuccess = {
    accessToken: string;
}

export type RegistrationData = {
    email: string;
    password: string;
    'confirm-password'?: string;
}

export type CheckEmailData = {
    email: string;
}

export type CheckEmailSuccess = {
    email: string;
    message: string;
}

export type ConfirmEmailData = {
    email: string;
    code: string;
}

export type ConfirmEmailSuccess = {
    email: string;
    message: string;
}

export type ChangePasswordData = {
    password: string;
    confirmPassword: string;
}

export type ChangePasswordSuccess = {
    message: string;
}
