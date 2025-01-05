import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()


    if (!email || !password) {
        return NextResponse.json({
            success: false,
            message: 'Send all the credentials'
        }, { status: 411 })
    }

    try {
        const isUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!isUser) {
            return NextResponse.json({
                success: false,
                message: 'This user is not present'
            }, { status: 403 })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, isUser.password)

        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: 'Wrong Password'
            }, { status: 403 })
        }

        if (!isUser.isVerified) {
            return NextResponse.json({
                success: false,
                message: 'Verify your email first',
                id: isUser.id
            }, { status: 411 })
        }

        const response = NextResponse.json({
            success: true,
            message: 'Signin successfull',
            id: isUser.id
        }, { status: 200 })

        const nextAuthCookie = jwt.sign({ id: isUser.id }, process.env.JWT_SECRET || '')

        response.cookies.set('nextAuthCookie', nextAuthCookie, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 })

        return response;

    } catch (e) {
        console.log(`Some error happened : ${e}`)
        return NextResponse.json({
            success: false,
            message: 'Unable to singin'
        }, { status: 500 })
    }
}