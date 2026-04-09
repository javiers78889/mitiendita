"use client"
import { ProductType } from "@/src/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProductType } from "@/src/types/CreateProductType";
import { DeleteProduct } from "@/action/deleteproduct-action";
import Modal from "../../utils/modals/Modal";


export function ModalDeleteProduct({ n }: { n: ProductType }) {
    const queryClient = useQueryClient()
    const [logo, setLogo] = useState(n.image)
    const { handleSubmit, register, setValue, formState: { errors }, reset } = useForm<DeleteProductType>();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: DeleteProductType) => DeleteProduct(data),
        onSuccess: (success) => {
            toast.success(success)
            queryClient.invalidateQueries({ queryKey: ["productos", n.departmentId] })
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
        <Modal action={handleSubmit((data) => mutate(data))} placeholder="Eliminar" estilos="text-red-500 " ispending={isPending} botonTexto="Eliminar" botonEstilos="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer">
            <div className="flex flex-col-reverse items-center  justify-center">
                <h2>{n.name}</h2>
                <Image src={logo} width={80} height={80} alt="Logo" />

            </div>

            <div>
                <label >¿Está seguro de querer eliminar el articulo?. escriba su <span className="text-red-500 font-bold upp">Contaseña</span></label>
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