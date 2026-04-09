"use client"
import { useForm } from "react-hook-form";
import { UpdateDepartamentoType } from "@/src/types/CreateDepartamentotype";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DepartamentosType } from "@/src/zod";
import { useEffect } from "react";
import { UpdateDepartamentos } from "@/action/updatedepartamentos-action";
import Modal from "../../utils/modals/Modal";


export function ModalEditDepartamento({ n }: { n: DepartamentosType }) {
    const queryclient = useQueryClient()
    const { handleSubmit, setValue, register, reset, formState: { errors } } = useForm<UpdateDepartamentoType>()


    const { mutate, isPending } = useMutation({
        mutationFn: (data: UpdateDepartamentoType) => UpdateDepartamentos(data),
        onSuccess: (data) => {
            toast.success(data)
            queryclient.invalidateQueries({ queryKey: ["departamentos"] })
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
        <Modal action={handleSubmit((data) => mutate(data))} ispending={isPending} estilos="text-amber-500 " placeholder="Editar" botonTexto="Editar" botonEstilos="px-4 py-2 rounded-lg  text-white  transition cursor-pointer bg-amber-600 hover:bg-amber-500">
            <div>
                <h2 className="text-xl">Departamento: <span className="text-amber-500 uppercase">{n.name}</span></h2>
            </div>

            <div>
                <label >Nombre</label>
                <input
                    type="text"
                    disabled={isPending}
                    defaultValue={n.name}
                    className="w-full p-2 mt-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-600"
                    {...register("name", { required: "Es necesario un nombre para el departamento" })}
                />
                {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
            </div>


        </Modal>
    )
}