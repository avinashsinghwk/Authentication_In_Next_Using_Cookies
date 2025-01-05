import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
    const { email, otp, password } = await req.json()
    if (!email || !otp || !password || email == '' || otp == '' || password == '') {
        return NextResponse.json({ success: false, message: 'Send email, otp and password' }, { status: 403 })
    }
    try {
        const isUser = await prisma.user.findFirst({ where: { email } })
        if (!isUser) {
            return NextResponse.json({ success: false, message: 'This user is not registered' }, { status: 404 })
        }

        if (!isUser.isVerified) {
            return NextResponse.json({ success: false, message: 'This user is not verified' }, { status: 411 })
        }

        if (isUser.forgotPasswordOtp == otp && Number(isUser.forgotPasswordOtpExpiresAt) > Date.now()) {
            const hashedPassword = await bcryptjs.hash(password, 10)

            const user = await prisma.user.update({
                where: { email },
                data: { password: hashedPassword, forgotPasswordOtp: null, forgotPasswordOtpExpiresAt: null }
            })

            return NextResponse.json({
                success: true,
                message: 'Password Changed Successfully',
                id: user.id
            }, { status: 200 })

        } else {
            return NextResponse.json({
                success: false,
                message: 'Wrong otp'
            }, { status: 401 })
        }


    } catch (e) {
        console.log(e)
        return NextResponse.json({success: false, message: 'Unable to complete this action'}, {status: 500})
    }
}