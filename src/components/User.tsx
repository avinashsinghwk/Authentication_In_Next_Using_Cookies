"use client"
import axios from "axios"
import { useRouter } from "next/navigation"

interface UserType{
    name: string,
    id: string,
    email: string,
    success: Boolean
}
export default function User({name, id, email, success}: UserType){
    const router = useRouter()

    const logoutBtnClick = async () => {
        const res = await axios.get(`${process.env.DOMAIN || ''}/api/logout`)
        router.push('/signin')
    }

    if(!success){
        router.push('/signup')
        return <div></div>
    }

    return <div className="h-screen flex flex-col justify-center items-center bg-gray-800 gap-8">
        <h2 className="text-6xl font-bold mb-6 text-center">Welcom to the page</h2>

        <h4 className="text-3xl font-bold text-green-700">Hello, {name}</h4>
        <p className="text-lg font-bold text-yellow-500">id : ( {id} )</p>
        <p className="text-xl font-bold text-red-500">id : ( {email} )</p>

        <button onClick={logoutBtnClick} className="w-40 flex justify-center items-center py-2 font-bold bg-purple-500 hover:bg-purple-600 rounded-lg">Logout</button>
        </div>
}