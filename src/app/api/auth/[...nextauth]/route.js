import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/libs/db'
import bcrypt from 'bcrypt'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "user" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                const userFound = await db.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if(!userFound) throw new Error("No se encontró el usuario")
                console.log(userFound)

                const matchPassword = await bcrypt.compare(credentials.password,userFound.password)

                if(!matchPassword) throw new Error("Password incorrecto")

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }