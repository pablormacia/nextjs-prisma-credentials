"use client"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import { useState } from 'react';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const [error,setError] = useState("")
    const onSubmit = handleSubmit(async data => {
        //console.log(data)
        const res = await signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:false
        })

        if(res.error){
            setError(res.error)
        }else{
            router.push('/dashboard')
            router.refresh()
        }
    })

    return (
        <div className='="h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form className="w-1/4" onSubmit={onSubmit}>
                {
                    error && (
                        <p className='bg-red-500 text-lg text-white p-3 rounded mb-2'>{error}</p>
                    )
                }
                <h1 className='text-slate-200 my-4 font-bold'>Iniciar sesión</h1>
                <label htmlFor="username"
                    className='text-slate-500 mb-2 text-sm block'
                >
                    email
                </label>
                <input
                    type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "El email es requerido"
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='user@youremail.com'
                />
                {
                    errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message}
                        </span>
                    )
                }
                <label htmlFor="password"
                    className='text-slate-500 mb-2 text-sm block'
                >
                    password
                </label>
                <input
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "El password es requerido"
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='*****'
                />
                {
                    errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )
                }
                <button
                    className='w-full bg-blue-500 text-white p-3 mt-2 rounded-lg'
                >
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
}

export default LoginPage