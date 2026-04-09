export type ResetPasswordStep1type = {
    email: string
}

export type ResetPasswordStep2type = {
    token: string
}

export type ResetPasswordStep3type = {
    password: string,
    passwordConfirm: string
}