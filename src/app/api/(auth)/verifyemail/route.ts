import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function POST(req: NextRequest) {

    const { otp } = await req.json()
    const id = req.nextUrl.searchParams.get('id')

    if (!otp || !id) {
        return NextResponse.json({
            success: false,
            message: 'Send otp and id'
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

        if (!isUser.verifyOtp || !isUser.verifyOtpExpiresAt) {
            return NextResponse.json({
                success: false,
                message: 'Send otp again'
            }, { status: 401 })
        }

        if (isUser.verifyOtp == otp && Number(isUser.verifyOtpExpiresAt) > Date.now()) {

            const user = await prisma.user.update({
                where: { id },
                data: { isVerified: true, verifyOtp: null, verifyOtpExpiresAt: null }
            })

            return NextResponse.json({
                success: true,
                message: 'User verified',
                id: user.id
            }, { status: 200 })
            
        } else {
            return NextResponse.json({
                success: false,
                message: 'Send otp again'
            }, { status: 401 })
        }

    } catch (e) {
        console.log(`Some error happened in verifying email : ${e}`)
        return NextResponse.json({
            success: false,
            message: 'Unable to verify'
        }, { status: 500 })
    }
}