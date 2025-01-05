import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken"
import prisma from "@/utils/db"
import User from "@/components/User"

interface CustomJwtPayload extends JwtPayload { id: string; }

export default async function UserPage() {

    try {
        const nextAuthcookie = (await cookies()).get('nextAuthCookie')?.value
        const { id } = jwt.verify(nextAuthcookie as string, process.env.JWT_SECRET || '') as CustomJwtPayload
        const user = await prisma.user.findFirst({where: {id}})
        if(user){
            return <User success={true} name={user.name} id={user.id} email={user.email}/>
        }
    } catch (e) {
        return <User success={false} name='' id='' email='' />
    }     
}