"use client"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const { register, handleSubmit,formState: {errors} } = useForm();

    const router = useRouter()

    const onSubmit = handleSubmit(async data=> {

        if(data.password!==data.confirmPassword) {
            return alert("Las contraseñas no coinciden")
        }

        const res = await fetch('/api/auth/register',
    {
        method: 'POST',
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password:data.password
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    //const resJSON = await res.json()
    //console.log(resJSON)

    if(res.ok){
        console.log("Register ok")
        router.push('/auth/login')
    }

    })

    console.log(errors)

    return (
        <div className='="h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form className="w-1/4" onSubmit={onSubmit}>
                <h1 className='text-slate-200 my-4 font-bold'>Registro</h1>
                <label htmlFor="username" 
                    className='text-slate-500 mb-2 text-sm block'
                >
                    Username
                </label>
                <input
                    type="text"
                    {...register("username",{
                        required: {
                            value:true,
                            message: "El nombre de usuario es requerido"
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Nombre de usuario'
                />
                {
                    errors.username && (
                        <span className="text-red-500 text-sm">
                            {errors.username.message}
                        </span>
                    )
                }
                <label htmlFor="email" 
                    className='text-slate-500 mb-2 text-sm block'
                >
                    Email
                </label>
                <input
                    type="email"
                    {...register("email",{
                        required: {
                            value:true,
                            message: "El email es requerido"
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Email'
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
                    Password
                </label>
                <input
                    type="password"
                    {...register("password",{
                        required: {
                            value:true,
                            message: "El password es requerido"
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Password'
                />
                {
                    errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )
                }
                <label htmlFor="confirmPassword" 
                    className='text-slate-500 mb-2 text-sm block'
                >
                    Confirm password
                </label>
                <input
                    type="password"
                    {...register("confirmPassword",{
                        required: {
                            value:true,
                            message: "Confirmar password es requerido"
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='Confirmar password'
                />
                {
                    errors.confirmPassword && (
                        <span className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </span>
                    )
                }

                <button
                    className='w-full bg-blue-500 text-white p-3 mt-2 rounded-lg'
                >
                    Registrar
                </button>

            </form>

        </div>
    )
}

export default RegisterPage