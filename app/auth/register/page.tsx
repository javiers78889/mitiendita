"use client";

import { CreateAccount } from "@/action/createaccount-action";

import { Formulario } from "@/src/components/utils/formularios/Formulario";
import { Spinner } from "@/src/components/utils/Spinner/Spinner";
import { envs } from "@/src/config/envs.config";
import { RegisterFormtype } from "@/src/types/RegisterFormType copy";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";


export default function Page() {

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<RegisterFormtype & { captcha: string }>()

    const OnSubmit = async (data: RegisterFormtype & { captcha: string }) => {
        if (!data.captcha) {
            toast.error("Debes completar el reCAPTCHA")
            return;
        }
        mutate(data)
    }
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: CreateAccount,
        onSuccess: (data) => {
            toast.success(data)
        },
        onError: (data) => {
            toast.error(data.message)
        }
    })


    return (
        <>
            <Formulario OnSubmit={handleSubmit(OnSubmit)}>
                <h2>{isSuccess ? (<span className="font-black text-green-500 ">Verifique su correo para activar la cuenta</span>) : ""}</h2>
                <h1 className="font-bold text-2xl">CREAR CUENTA</h1>
                {/* Nombre */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700">Nombre</label>
                    <input
                        type="text"
                        placeholder="john doe"
                        disabled={isPending}
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        {...register("name", {
                            required: true, minLength: {
                                value: 4,
                                message: "El largo minimo para un nombre es de 4 caracteres"
                            }
                        })}
                    />
                    {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
                </div>
                {/* Cedula */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700">Cedula</label>
                    <input
                        type="text"
                        placeholder="0-000-000"
                        disabled={isPending}
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        {...register("cedula", {
                            required: true, pattern: {
                                value: /^\d-\d{3}-\d{3}$/,
                                message: "Cedula incorrecta",
                            },
                        })}
                    />
                    {errors.cedula && <p className="text-red-500">{errors.cedula?.message}</p>}
                </div>
                {/* Celular */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700">Celular</label>
                    <input
                        type="text"
                        placeholder="0000-0000"
                        disabled={isPending}
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        {...register("cellphone", {
                            required: true, pattern: {
                                value: /^\d{4}-\d{4}$/,
                                message: "Celular incorrecto",
                            },
                        })}
                    />
                    {errors.cellphone && <p className="text-red-500">{errors.cellphone?.message}</p>}
                </div>
                {/* Email */}
                <div className="flex flex-col">
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
                <div className="flex flex-col" >
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
                {/* Nacimiento */}
                <div className="flex flex-col" >
                    <label className="mb-1 font-semibold text-gray-700">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        disabled={isPending}
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none "
                        {...register("birthdate", { required: "La fecha de naciemiento es obligatoria" })}

                    />
                    {errors.birthdate && <p className="text-red-500">{errors.birthdate.message}</p>}
                </div>
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
                    onChange={(token) => {
                        if (token) setValue("captcha", token)
                    }}
                />



                {/* Botón */}
                {isPending ? (
                    <Spinner />
                )

                    : (

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            Enviar
                        </button>

                    )}
                <div className="flex items-center justify-center">
                    <span>tienes cuenta? <Link href="/auth/login" className="hover:text-blue-500">Inicia Sesion</Link></span>
                </div>
            </Formulario>

        </>

    );
}