import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import generateOtp from "@/utils/generateOtp";
import verifyEmailSend from "@/utils/email/sendEmail/verifyEmailSend";

export async function POST(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json({
            success: false,
            message: 'Id not found'
        }, { status: 403 })
    }

    try {
        const isUser = await prisma.user.findFirst({ where: { id } })

        if (!isUser) {
            return NextResponse.json({
                success: false,
                message: 'This user is not present'
            }, { status: 403 })
        }

        if (isUser.isVerified) {
            return NextResponse.json({
                success: false,
                message: 'This user is already verified'
            }, { status: 403 })
        }

        const verifyOtp = generateOtp(5)
        const verifyOtpExpiresAt = `${Date.now() + (60 * 60 * 1000)}`

        const user = await prisma.user.update({
            where: { id }, data: {
                verifyOtp,
                verifyOtpExpiresAt
            }
        })

        try {
            await verifyEmailSend({ name: user.name, email: user.email, otp: verifyOtp })
        } catch (e) {
            console.log(`Error happened in sending email : ${e}`)
        }

        return NextResponse.json({
            success: true,
            message: 'Verify email otp resend'
        }, { status: 200 })


    } catch (e) {
        console.log(`Some error happened in resending verify email : ${e}`)
        return NextResponse.json({
            success: false,
            message: 'Unable to send'
        }, { status: 500 })
    }
}