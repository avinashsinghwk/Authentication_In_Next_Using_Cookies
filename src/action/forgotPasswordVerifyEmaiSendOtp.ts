'use server'
import prisma from "@/utils/db"
import generateOtp from "@/utils/generateOtp"
import forgotPasswordEmailSend from "@/utils/email/sendEmail/forgotPasswordEmailSend"

export default async function forgotPasswordVerifyEmaiSendOtp({email}: {email: string}) {
    if (email.trim() == '') {
        throw new Error('Send Email')
    }
    try {
        const isUser = await prisma.user.findFirst({ where: { email } })
        if (!isUser) {
            throw new Error('This user is not registered')
        }

        if (!isUser.isVerified) {
            throw new Error('This user is not verified')
        }

        const forgotPasswordOtp = generateOtp(5)
        const forgotPasswordOtpExpiresAt = `${Date.now() + (60 * 60 * 1000)}`
        const user = await prisma.user.update({
            where: {
                email
            },
            data: {
                forgotPasswordOtp,
                forgotPasswordOtpExpiresAt
            }
        })

        try {
            await forgotPasswordEmailSend({ name: user.name, email, otp: forgotPasswordOtp })
        } catch (e) {
            console.log(`Error happened in sending email : ${e}`)
        }

        return {
            success: true,
            id: user.id,
            message: 'Otp is send to your email'
        }


    } catch (e: any) {
        console.log('Some error happened in this action : ', e)
        throw new Error(e.message)
    }
}