'use client'
import NormalInput from "@/components/NormalInput"
import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function verifyemailPage() {
    const [otp, setOtp] = useState(0)
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter()

    if (!id) {
        toast.error("Id of the user is not found")
    }

    const verifyemailSubmitBtnClick = async () => {
        if (otp == 0) {
            toast.error("Fill the otp first")
        } else {
            try {
                const res = await axios.post(`${process.env.DOMAIN || ''}/api/verifyemail?id=${id}`, {
                    otp
                })
                if (res.data.success) {
                    toast.success(res.data.message)
                    router.push(`/signin`)
                }
            } catch (e: any) {
                if (e.response.data.message == `This user is already verified`) {
                    router.push('/signin')
                }
                else if (e.response.data.message == `This user is not present`) {
                    router.push('/signup')
                }
                toast.error(e.response.data.message)
            }
        }
    }

    const verifyemailResendBtnClick = async () => {
        try {
            const res = await axios.post(`${process.env.DOMAIN || ''}/api/resendverifyemailotp?id=${id}`,)
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (e: any) {
            if (e.response.data.message == `This user is already verified`) {
                router.push('/signin')
            }
            else if (e.response.data.message == `This user is not present`) {
                router.push('/signup')
            }
            toast.error(e.response.data.message)
        }
    }

    return <div className="h-screen w-full bg-gray-800 flex flex-col gap-10 items-center justify-center">
        <h2 className="text-6xl font-bold">Verify your email</h2>
        <div className=" w-1/4 flex flex-col gap-6">
            <NormalInput type="number" placeholder="Enter your otp" onChange={(e) => { setOtp(Number(e.target.value)) }} />
            <div className="flex justify-between">
                <button onClick={verifyemailSubmitBtnClick} className="w-40 flex justify-center items-center py-2 font-bold bg-blue-500 hover:bg-blue-600 rounded-lg">Submit</button>
                <button onClick={verifyemailResendBtnClick} className="w-40 flex justify-center items-center py-2 font-bold bg-red-500 hover:bg-red-600 rounded-lg">Resend</button>
            </div>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </div>
}