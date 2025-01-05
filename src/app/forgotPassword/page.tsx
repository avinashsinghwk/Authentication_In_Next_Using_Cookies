'use client'
import forgotPasswordVerifyEmaiSendOtp from "@/action/forgotPasswordVerifyEmaiSendOtp";
import NormalInput from "@/components/NormalInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function forgotpasswordPage() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(0)
    const [password, setPassword] = useState('')

    const otpInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const btnResendRef = useRef<HTMLButtonElement>(null)
    const btnSubmitEmailRef = useRef<HTMLButtonElement>(null)
    const btnSubmitEmailOtpRef = useRef<HTMLButtonElement>(null)

    const router = useRouter()

    const forgotPasswordResendBtnClick = async () => {
        try {
            const res = await axios.post(`${process.env.DOMAIN || ''}/api/resendforgotpasswordotp`, {
                email
            })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (e: any) {
            if (e.response.data.message == `This user is not present`) {
                router.push('/signup')
            }
            toast.error(e.response.data.message)
        }
    }

    const forgotPasswordSubmitEmailBtnClick = async () => {
        try {
            const res = await forgotPasswordVerifyEmaiSendOtp({ email })
            if (res.success) {
                toast.success(res.message)
                otpInputRef.current?.classList.remove('hidden')
                btnResendRef.current?.classList.remove('hidden')
                passwordInputRef.current?.classList.remove('hidden')
                btnSubmitEmailRef.current?.classList.add('hidden')
                btnSubmitEmailOtpRef.current?.classList.remove('hidden')
            }
        } catch (e: any) {
            if (e.message == 'This user is not registered') {
                router.push(`/signup`)
            }
            console.log(e)
            toast.error(e.message)
        }
    }

    const forgotPasswordSubmitEmailOtpBtnClick = async () => {
        if (!email || !password || !otp) {
            toast.error('Fill the all credentials')
        } {
            try {
                const res = await axios.post(`${process.env.DOMAIN || ''}/api/forgotpassword`, { email, password, otp })
                if (res.data.success) {
                    toast.success(res.data.message)
                    router.push('/signin')
                }

            } catch (e: any) {
                toast.error(e.response.data.message)
            }
        }
    }

    return <div className="bg-gray-800 h-screen flex items-center justify-center flex-col gap-9">
        <h2 className="text-4xl text-gray-600 font-bold">Enter your email to reset your password</h2>
        <div className="w-1/3">

            <div className="flex flex-col gap-9">
                <NormalInput type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />

                <div ref={otpInputRef} className="hidden">
                    <NormalInput type="number" placeholder="Enter your otp" onChange={(e) => setOtp(Number(e.target.value))} />
                </div>

                <div ref={passwordInputRef} className="hidden">
                    <NormalInput type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
            </div>

            <div className="flex justify-between mt-10">
                <button ref={btnSubmitEmailRef} onClick={forgotPasswordSubmitEmailBtnClick} className="w-40 flex justify-center items-center py-2 font-bold bg-blue-500 hover:bg-blue-600 rounded-lg">Submit</button>

                <button ref={btnSubmitEmailOtpRef} onClick={forgotPasswordSubmitEmailOtpBtnClick} className="w-40 flex justify-center items-center py-2 font-bold bg-blue-500 hover:bg-blue-600 rounded-lg hidden">Submit</button>

                <button ref={btnResendRef} onClick={forgotPasswordResendBtnClick} className="w-40 flex justify-center items-center py-2 font-bold bg-red-500 hover:bg-red-600 rounded-lg hidden">Resend</button>
            </div>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </div>
} 