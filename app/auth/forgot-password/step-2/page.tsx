"use client"
import { ResetPasswordStep2 } from "@/action/resetpassword/resetpassword-step2-action";
import { Formulario } from "@/src/components/utils/formularios/Formulario";
import { Spinner } from "@/src/components/utils/Spinner/Spinner";
import { ResetPasswordStep2type } from "@/src/types/ResetPasswordType";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";



export default function Page() {
    const navigate = useRouter()
    const { handleSubmit, reset, register, formState: { errors } } = useForm<ResetPasswordStep2type>()
    const { mutate, isPending, isSuccess, isError, data, error } = useMutation({
        mutationFn: ResetPasswordStep2
    })
    useEffect(() => {
        if (!isSuccess) {
            toast.error(error?.message)
            reset()
        }
        else {
            toast.success(data)
            navigate.push("/auth/forgot-password/step-3")
        }
    }, [isSuccess, isError])
    return (
        <Formulario OnSubmit={handleSubmit((data) => mutate(data))}>
            <div className="flex flex-col dark:text-black">
                <label className="mb-1 font-semibold text-gray-700">Ingrese el token para habilitar el reset de la contraseña</label>
                <input
                    type="text"
                    disabled={isPending}
                    placeholder="000000"
                    className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    {...register("token", { required: "El token es necesario para poder activar la cuenta" })}
                />
                {errors.token && <p className="text-red-500">{errors.token.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
                {isPending ? (<Spinner size={20} />) : (
                    "Validar"
                )}

            </button>
        </Formulario>
    )
}