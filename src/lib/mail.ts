import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        // from: 'resultplus@resend.dev',
        to: email,
        subject: '2FA Code',
        html: `<p>Your 2FA code: ${token}</p>`
    })
}


export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXTAUTH_URL}/new-password?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        // from: 'resultplus@resend.dev',
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <strong><a href="${resetLink}">here</a></strong> to reset your password.</p>`
    })

}


export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXTAUTH_URL}/new-verification?token=${token}`

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        // from: 'resultplus@resend.dev',
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <strong><a href="${confirmLink}">here</a></strong> to confirm email.</p>`
    })

}







