"use client"
import { useForm } from "react-hook-form";
import { CreateDepartamentoType } from "@/src/types/CreateDepartamentotype";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDepartamento } from "@/action/createdepartamento-action";


import { toast } from "react-toastify";
import Modal from "../../utils/modals/Modal";


export function ModalDepartamento({ id }: { id: string }) {
    const queryclient = useQueryClient()
    const { handleSubmit, setValue, register, reset, formState: { errors } } = useForm<CreateDepartamentoType>()
    setValue("storeId", id)

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateDepartamentoType) => CreateDepartamento(data),
        onSuccess: (data) => {
            toast.success(data)
            queryclient.invalidateQueries({ queryKey: ["departamentos"] })
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    return (
        <Modal action={handleSubmit((data) => mutate(data))} placeholder="Add" ispending={isPending}>

            <div>
                <label >Nombre</label>
                <input
                    type="text"
                    disabled={isPending}
                    className="w-full p-2 mt-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-600"
                    {...register("name", { required: "Es necesario un nombre para el departamento" })}
                />
                {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
            </div>


        </Modal>
    )
}