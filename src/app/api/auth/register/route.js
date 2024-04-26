import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import db from '@/libs/db'

export async function POST(request) {
    try {
        const data = await request.json()

        const emailFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        const userFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        })

        if (userFound || emailFound) {
            return NextResponse.json({
                message: "El usuario ya existe"
            }, {
                status: 400
            })
        }

        console.log(data)
        data.password = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({ data })

        const { password: _, ...user } = newUser

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        },{
            status:500
        })
    }
}