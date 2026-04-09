"use client"

import { ResetPasswordStep1 } from "@/action/resetpassword/resetpassword-step1-action";
import { Formulario } from "@/src/components/utils/formularios/Formulario";
import { Spinner } from "@/src/components/utils/Spinner/Spinner";
import { ResetPasswordStep1type } from "@/src/types/ResetPasswordType";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page() {
    const navigate = useRouter()
    const { handleSubmit, register, reset, formState: { errors } } = useForm<ResetPasswordStep1type>()
    const { mutate, isPending, isSuccess, isError, error, data } = useMutation({
        mutationFn: ResetPasswordStep1
    })
    useEffect(() => {
        if (!isSuccess) {
            toast.error(error?.message)
        }
        else {
            toast.success(data)
            navigate.push("/auth/forgot-password/step-2")
        }

    }, [isSuccess, isError])
    return (
        <Formulario OnSubmit={handleSubmit((data) => mutate(data))}>
            <div className="flex flex-col dark:text-black">
                <label className="mb-1 font-semibold text-gray-700">Ingrese su correo para solicitar un cambio de contraseña</label>
                <input
                    type="email"
                    disabled={isPending}
                    placeholder="expample@gmail.com"
                    {...register("email", { required: "El email es necesario para la solicitud" })}
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"

                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
                {isPending ? (<Spinner size={20} />) : (
                    "Solicitar"
                )}

            </button>
        </ Formulario>
    )
}