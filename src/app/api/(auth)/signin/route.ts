import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest){
    const {email, password} = await req.json()


    if(!email || !password){
        return NextResponse.json({
            success: false,
            message: 'Send all the credentials' 
        }, {status: 411})
    }

    try {
        const isUser = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!isUser){
            return NextResponse.json({
                success: false,
                message: 'This user is not present' 
            }, {status: 403})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, isUser.password)

        if(!isPasswordCorrect){
            return NextResponse.json({
                success: false,
                message: 'Wrong Password' 
            }, {status: 403})
        }

        if(!isUser.isVerified){
            return NextResponse.json({
                success: false,
                message: 'Verify your email first' 
            }, {status: 411})
        }

        return NextResponse.json({
            success: true,
            message: 'Signin successfull',
            id: isUser.id 
        }, {status: 200})


    } catch (e) {
        console.log(`Some error happened : ${e}`)
        return NextResponse.json({
            success: false,
            message: 'Unable to singin' 
        }, {status: 500}) 
    }
}