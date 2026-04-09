"use client";

import { LoginAction } from "@/action/login-action";
import { Formulario } from "@/src/components/utils/formularios/Formulario";
import { Spinner } from "@/src/components/utils/Spinner/Spinner";
import { LoginForm } from "@/src/types/LoginFormType";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function Page() {
    const navigate= useRouter()
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<LoginForm & { captcha?: string }>()
    const OnSubmit = async (data: LoginForm & { captcha?: string }) => {
        if (!data.captcha) {
            toast.error("Debes completar el reCAPTCHA")
            return;
        }
        mutate(data)
    }
    const { mutate, isPending } = useMutation({
        mutationFn: LoginAction,
        onSuccess: () => {
            toast.success("Acceso Aprobado")
            navigate.push("/secure/admin")
        },
        onError: (data) => {
            toast.error(data.message)
        }
    })


    return (

        <Formulario OnSubmit={handleSubmit(OnSubmit)}>
            <h1 className="font-bold text-2xl dark:text-black">INICIA SESIÓN</h1>
            {/* Nombre */}

            {/* Email */}
            <div className="flex flex-col dark:text-black">
                <label className="mb-1 font-semibold text-gray-700">Email</label>
                <input
                    type="email"
                    placeholder="tu@email.com"
                    disabled={isPending}
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    {...register("email", {
                        required: true, pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Email inválido",
                        },
                    })}
                />
                {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col dark:text-black" >
                <label className="mb-1 font-semibold text-gray-700">Contraseña</label>
                <input
                    type="password"
                    placeholder="********"
                    disabled={isPending}
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none "
                    {...register("password", { required: true, minLength: { value: 6, message: "Minimo 6 caracteres debe tener el password" } })}

                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
                onChange={(token) => {
                    if (token) setValue("captcha", token)
                }}
            />
            <Link href={'/auth/forgot-password/step-1'} className="dark:text-black">Olvidé mi contraseña</Link>


            {isPending?(
                <Spinner size={50}/>
            ):(


                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                    Enviar
                </button>

            )}
            <div className="flex items-center justify-center dark:text-black">
                <span>No tienes cuenta? <Link href="/auth/register" className="hover:text-blue-500">Crear Cuenta</Link></span>
            </div>
        </Formulario>

    );
}