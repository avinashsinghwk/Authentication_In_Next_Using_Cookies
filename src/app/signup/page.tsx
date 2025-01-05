'use client'
import LabelledInput from "@/components/LabelledInput"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const router = useRouter()

    const handleSignup = async () => {
        setEmail(email.trim())
        setPassword(password.trim())
        setName(name.trim())
        if (email == '' || password == '' || name == '') {
            toast.error("Fill the all credentials")
        } else {
            try {
                const res = await axios.post(`${process.env.DOMAIN || ''}/api/signup`, {
                    email,
                    password,
                    name
                })
                if(res.data.success){
                    toast.success(res.data.message)
                    router.push(`/verifyemail?id=${res.data.id}`)
                }
            } catch (e: any) {
                toast.error(e.response.data.message)
            }
        }

    }

    return <div className="p-5 h-screen flex flex-col justify-center items-center bg-gray-800">
        <h2 className="text-6xl font-bold mb-6 text-center">SignUp Page</h2>
        <div className="mb-4 w-1/3">
            <LabelledInput type="text" label="Name" placeholder="Enter your name" id="signupName" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4 w-1/3">
            <LabelledInput type="email" label="E-mail" placeholder="Enter your email" id="signupEmail" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6 w-1/3">
            <LabelledInput type="password" label="Password" placeholder="Enter your password" id="signupPassword" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p className="text-white font-bold text-base"> Already have an account? <Link className="text-lg text-blue-600" href="/signin"> Signin </Link> </p>
        <button onClick={handleSignup} className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8" > Sign Up </button>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </div>

}