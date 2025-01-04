import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcryptjs from 'bcryptjs'
import generateOtp from "@/utils/generateOtp";
import verifyEmailSend from "@/utils/email/sendEmail/verifyEmailSend";

export async function POST(req: NextRequest){
    const {email, password, name} = await req.json()


    if(!email || !password || !name){
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
    
        if(isUser){
            return NextResponse.json({
                success: false,
                message: 'This user is already present' 
            }, {status: 411})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verifyOtp = generateOtp(5)
        const verifyOtpExpiresAt = `${Date.now() + (60 * 60 * 1000)}`

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                verifyOtp,
                verifyOtpExpiresAt
            }
        })

        try{
            await verifyEmailSend({name, email, otp:verifyOtp})
        } catch(e){
            console.log(`Error happened in sending email : ${e}`)
        }

        return NextResponse.json({
            success: true,
            message: 'Signup successfull',
            id: user.id 
        }, {status: 201})

    } catch (e) {
        console.log(`Some error happened : ${e}`)
        return NextResponse.json({
            success: false,
            message: 'Unable to singup' 
        }, {status: 500}) 
    }

}