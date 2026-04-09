"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DeleStoreType } from "@/src/types/CreateStoreType";
import { toast } from "react-toastify";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TiendasType } from "@/src/zod";
import { DeleteStore } from "@/action/deletestore-action";
import Modal from "../../utils/modals/Modal";

export function ModalDeleteTienda({ n }: { n: TiendasType }) {

    const queryClient = useQueryClient();
    const [logo, setLogo] = useState(n.image)



    const { mutate, isPending } = useMutation({
        mutationFn: (data: DeleStoreType) => DeleteStore(data),
        onSuccess: (message) => {
            toast.success(message)
            reset()
            queryClient.invalidateQueries({ queryKey: ["tiendas"] });
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<DeleStoreType>()
    
    setValue("id", n.id)
    useEffect(() => {
        reset();

    }, [n])


    return (
        <Modal placeholder="Eliminar" action={handleSubmit((data) => mutate(data))} estilos="text-red-500 hover:text-amber-300" ispending={isPending} botonTexto="Eliminar" botonEstilos="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer">

            <div className="flex flex-col-reverse items-center  justify-center">
                <h2>{n.name}</h2>
                <Image src={logo} width={80} height={80} alt="Logo" />

            </div>

            <div>
                <label >¿Está seguro de querer eliminar esta tienda?. escriba su <span className="text-red-500 font-bold upp">Contaseña</span></label>
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
    );
}