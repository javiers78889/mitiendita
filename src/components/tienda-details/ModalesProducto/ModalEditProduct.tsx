import { ProductType } from "@/src/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UploadImage } from "@/action/uploadimage-action";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductType } from "@/src/types/CreateProductType";
import { UpdateProduct } from "@/action/updateproduct-action";
import Modal from "../../utils/modals/Modal";


export function ModalEditProduct({ n }: { n: ProductType }) {
    const queryClient = useQueryClient()
    const [logo, setLogo] = useState(n.image)
    const [remove, setRemove] = useState<boolean>(false)
    const { handleSubmit, register, setValue, formState: { errors }, reset } = useForm<UpdateProductType>();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UpdateProductType) => UpdateProduct(data),
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
        <Modal action={handleSubmit((data) => mutate(data))} placeholder="Editar" estilos="text-amber-500 " ispending={isPending} botonTexto="Editar" botonEstilos="px-4 py-2 rounded-lg  text-white  transition cursor-pointer bg-amber-600 hover:bg-amber-500">
            <div className="flex flex-col-reverse items-center  justify-center">
                <h2>Foto del producto</h2>
                <Image src={logo} width={80} height={80} alt="Logo" />

            </div>

            <div>
                <label >Nombre</label>
                <input
                    type="text"
                    disabled={isPending}
                    className="w-full p-2 mt-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-600"
                    defaultValue={n.name}
                    {...register("name", { required: "El nombre del producto es necesario" })}
                />
                {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
            </div>


            <div>
                <label className="text-gray-700 dark:text-gray-300 text-sm">Cantidad</label>
                <input
                    type="number"
                    defaultValue={n.quantity}
                    disabled={isPending}
                    min={1}
                    className="w-full p-2 mt-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-600"
                    {...register("quantity", {
                        required: true,
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: "La cantidad mínima es 1"
                        }
                    })}
                />
                {errors.quantity && <p className="text-red-500">{errors.quantity?.message}</p>}
            </div>


            <div>
                <label className="text-gray-700 dark:text-gray-300 text-sm">Descripción</label>
                <textarea
                    defaultValue={n.description}
                    disabled={isPending}
                    className="w-full p-2 mt-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-600"
                    {...register("description", { required: "La descripcion del producto es necesario" })}
                ></textarea>
                {errors.description && <p className="text-red-500">{errors.description?.message}</p>}
            </div>
            <div>
                <label>Imagen del Producto</label>
                <input
                    type="file"
                    accept="image/*"
                    disabled={isPending}
                    className="w-full p-2 mt-1 rounded-lg border dark:bg-gray-700 dark:border-gray-600
                           file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2
                           file:rounded-lg file:mr-4 file:cursor-pointer
                           outline-none focus:ring-2 focus:ring-blue-600"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        try {
                            const url = await UploadImage(file, remove);
                            setLogo(url)
                            setValue("image", url, { shouldValidate: true });
                        } catch (error) {
                            toast.error("La imagen no cumple con los requisitos necesarios");
                        }
                    }}
                />
            </div>
            <div className="flex flex-row-reverse justify-center gap-5">
                <label>Remover fondo de la imagen</label>
                <input type="checkbox" className="cursor-pointer" onChange={(e) => { setRemove(!remove), console.log(remove) }} defaultChecked={remove} />
            </div>
            <div>
                <p className="text-sm text-amber-300">Nota: Si va a remover el fondo marque la casilla antes de subir la imagen</p>
            </div>
            <input
                type="hidden"
                defaultValue={n.image}
                {...register("image", { required: "El logo de la tienda es necesario" })}
            />

            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </Modal>
    )
}