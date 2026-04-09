"use client"
import { useForm } from "react-hook-form";
import {  DeleteDepartamentoType } from "@/src/types/CreateDepartamentotype";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DepartamentosType } from "@/src/zod";
import { DeleteDepartamento } from "@/action/deletedepartamento-action";
import { useEffect } from "react";
import Modal from "../../utils/modals/Modal";


export function ModalDeleteDepartamento({ n }: { n: DepartamentosType }) {
    const queryclient = useQueryClient()
    const { handleSubmit, setValue, register, reset, formState: { errors } } = useForm<DeleteDepartamentoType>()


    const { mutate, isPending } = useMutation({
        mutationFn: (data: DeleteDepartamentoType) => DeleteDepartamento(data),
        onSuccess: (data) => {
            toast.success(data)
            console.log(n.id)
            queryclient.invalidateQueries({ queryKey: ["departamentos"] })
            queryclient.invalidateQueries({ queryKey: ["productos", n.id] })
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    setValue("id", n.id)
    useEffect(() => {
        reset()
    }, [n])


    return (
        <Modal action={handleSubmit((data) => mutate(data))} estilos="text-red-500 " placeholder="Eliminar" ispending={isPending} botonTexto="Eliminar" botonEstilos="px-4 py-2 rounded-lg  text-white  transition cursor-pointer bg-red-600 hover:bg-red-500">

            <div>
                <h2 className="text-xl">Departamento: <span className="text-amber-500 uppercase">{n.name}</span></h2>
            </div>

            <div>
                <label >¿Está seguro de querer eliminar el departamento?. escriba su <span className="text-red-500 font-bold upp">Contaseña</span></label>
                <input
                    type="password"
                    placeholder="********"
                    defaultValue={""}
                    disabled={isPending}
                    className="w-full p-2 mt-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-600"

                    {...register("password", { required: "La contraseña es necesario" })}
                />
                {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
            </div>


        </Modal>
    )
}