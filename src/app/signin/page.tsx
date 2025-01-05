'use client'
import LabelledInput from "@/components/LabelledInput"
import Link from "next/link"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function SigninPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignin = async () => {
        setEmail(email.trim())
        setPassword(password.trim())
        if (email == '' || password == '') {
            toast.error("Fill the all credentials")
        } else {
            try {
                const res = await axios.post(`${process.env.DOMAIN || ''}/api/signin`, {
                    email,
                    password
                })
                if (res.data.success) {
                    toast.success(res.data.message)
                    router.push(`/user`)
                }
            } catch (e: any) {
                if(e.response.data.message == 'Verify your email first'){
                    router.push(`/verifyemail?id${e.response.data.id}`)
                }
                toast.error(e.response.data.message)
            }
        }
    }

    const onforgotBtnClick = async () => {
        router.push('/forgotPassword')
    }

    return <div className="p-5 h-screen flex flex-col justify-center items-center bg-gray-800">
        <h2 className="text-6xl font-bold mb-6 text-center">SignIn Page</h2>
        <div className="mb-4 w-1/3">
            <LabelledInput type="email" label="E-mail" placeholder="Enter your email" id="signinEmail" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col items-end w-1/3 mb-4">
            <LabelledInput type="password" label="Password" placeholder="Enter your password" id="signinPassword" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={onforgotBtnClick} className="text-blue-600 hover:underline" > Forgot Password? </button>
        </div>

        <p className="text-white font-bold text-base"> Don't have an account? <Link className="text-lg text-blue-600" href="/signup"> Signup </Link> </p>
        <button onClick={handleSignin} className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8" > Log In </button>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </div>
}