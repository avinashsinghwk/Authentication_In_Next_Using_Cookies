import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import generateOtp from "@/utils/generateOtp";
import forgotPasswordEmailSend from "@/utils/email/sendEmail/forgotPasswordEmailSend";

export async function POST(req: NextRequest) {
    const { email } = await req.json()
    if (!email) {
        return NextResponse.json({
            success: false,
            message: 'Email not send'
        }, { status: 403 })

    }

    try {
        const isUser = await prisma.user.findFirst({ where: { email } })

        if (!isUser) {
            return NextResponse.json({
                success: false,
                message: 'This user is not present'
            }, { status: 403 })
        }

        const forgotPasswordOtp = generateOtp(5)
        const forgotPasswordOtpExpiresAt = `${Date.now() + (60 * 60 * 1000)}`

        const user = await prisma.user.update({
            where: { email }, data: {
                forgotPasswordOtp,
                forgotPasswordOtpExpiresAt
            }
        })

        try {
            await forgotPasswordEmailSend({ name: user.name, email: user.email, otp: forgotPasswordOtp })
        } catch (e) {
            console.log(`Error happened in sending email : ${e}`)
        }

        return NextResponse.json({
            success: true,
            message: 'Forgot password otp send'
        }, { status: 200 })


    } catch (e) {
        console.log(`Some error happened in resending verify email : ${e}`)
        return NextResponse.json({
            success: false,
            message: 'Unable to send'
        }, { status: 500 })
    }
}