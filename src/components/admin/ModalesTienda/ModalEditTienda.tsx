"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateStoreType } from "@/src/types/CreateStoreType";
import { datosProvince } from "@/src/utils/province";
import { UploadImage } from "@/action/uploadimage-action";
import { toast } from "react-toastify";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetCategorias } from "@/action/getcategorias-action";
import { Spinner } from "../../utils/Spinner/Spinner";
import { TiendasType } from "@/src/zod";
import MapSelector from "../../utils/map/MapSelector";
import { UpdateStore } from "@/action/updatestore-action";
import Modal from "../../utils/modals/Modal";

export function ModalEditTienda({ n }: { n: TiendasType }) {


    const queryClient = useQueryClient();
    const [lat, setLat] = useState<number | null>(n.latitud);
    const [lng, setLng] = useState<number | null>(n.longitud);

    const [distrito, setDistrito] = useState<DistritoType[]>()
    const [corregimiento, setCorregimiento] = useState<string[]>()



    const [logo, setLogo] = useState(n.image)

    const { data, isLoading } = useQuery({
        queryKey: ['categorias'],
        queryFn: GetCategorias,

    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UpdateStoreType) => UpdateStore(data),
        onSuccess: (message) => {
            toast.success(message)
            reset()
            queryClient.invalidateQueries({ queryKey: ["tiendas"] });
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<UpdateStoreType>()


    const onChangeProvince = (name: string) => {
        const distrito = datosProvince.provincia.filter(n => (
            n.nombre == name))

        setDistrito(distrito[0].distrito)
    }
    const onChangeDistrito = (nombre: string) => {

        datosProvince.provincia.map(n => {
            const filtro = n.distrito.filter(i => (i.nombre == nombre))
            filtro.map(o => {
                setCorregimiento(o.corregimientos)
            })
        })
    }

    useEffect(() => {
        reset({
            id: n.id,
            name: n.name,
            description: n.description,
            cellphone: n.cellphone,
            image: n.image,
            foundationDate: new Date(n.foundationDate).toISOString().split("T")[0],
            province: n.province,
            distrito: n.distrito,
            corregimiento: n.corregimiento,
            lat: n.latitud,
            lng: n.longitud,
            categoryId: n.categoryId,
        });
        setValue("id", n.id)
        setValue("image", n.image)
        setValue("lat", n.latitud)
        setValue("lng", n.longitud)
        onChangeProvince(n.province)
        onChangeDistrito(n.distrito)
    }, [n])

    if (isLoading) return <Spinner />
    return (
        <Modal placeholder="Editar" action={handleSubmit((data) => mutate(data))} estilos="text-amber-500 hover:text-amber-300" ispending={isPending} botonTexto="Editar" botonEstilos="px-4 py-2 rounded-lg  text-white  transition cursor-pointer bg-amber-600 hover:bg-amber-500">

            <div>
                <Image className="rounded-full" src={logo} width={50} height={50} alt="Logo" />

            </div>

            <div>
                <label>Nombre</label>
                <input className="w-full p-2 mt-1 rounded-lg border"
                    type="text"
                    placeholder="Nombre de la tienda: Doom S.A ..."
                    disabled={isPending}
                    defaultValue={n.name}
                    {...register("name", { required: "El nombre de la tienda es obligatorio" })}
                />
                {errors.name && <p className="text-red-500">{errors.name?.message}</p>}

            </div>

            <div>
                <label>Celular</label>
                <input className="w-full p-2 mt-1 rounded-lg border"
                    type="text"
                    placeholder="0000-0000"
                    disabled={isPending}
                    defaultValue={n.cellphone}
                    {...register("cellphone", {
                        required: "El Celular de la tienda es obligatorio", pattern: {
                            value: /^\d{4}-\d{4}$/,
                            message: "Celular incorrecto",
                        }
                    })}
                />
                {errors.cellphone && <p className="text-red-500">{errors.cellphone?.message}</p>}

            </div>
            <div>
                <label>Categoria</label>
                <select className="w-full p-2 mt-1 rounded-lg border" {...register("categoryId", { required: "La Categoria es necesaria para ubicar el negocio" })} defaultValue={n.categoryId} disabled={isPending}>
                    <option value="">Seleccione una Categoria</option>
                    {data?.map(n => (
                        <option value={n.id} key={n.id}>{n.name}</option>
                    ))}
                </select>
                {errors.categoryId && <p className="text-red-500">{errors.categoryId?.message}</p>}
            </div>
            <div>
                <label>Descripcion</label>
                <textarea className="w-full p-2 mt-1 rounded-lg border"
                    defaultValue={n.description}
                    disabled={isPending}
                    maxLength={50}

                    {...register("description", {
                        required: "La descripción es necesaria para hacer visibles tus productos",
                        maxLength: { value: 50, message: "La descripción no puede tener más de 50 caracteres" }
                    })}

                />
                {errors.description && <p className="text-red-500">{errors.description?.message}</p>}
            </div>

            <div>
                <label>Logo de Tienda</label>
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
                            const url = await UploadImage(file);
                            setLogo(url)
                            setValue("image", url, { shouldValidate: true });
                        } catch (error) {
                            toast.error("La imagen no cumple con los requisitos necesarios");
                        }
                    }}
                />


            </div>
            <input
                type="hidden"
                {...register("image", { required: "El logo de la tienda es necesario" })}
            />

            {errors.image && <p className="text-red-500">{errors.image.message}</p>}

            <div>
                <label>Fundación de la tienda</label>
                <input type="date" className="w-full p-2 mt-1 rounded-lg border"
                    disabled={isPending}
                    defaultValue={new Date(n.foundationDate).toISOString().split("T")[0]}
                    {...register("foundationDate", { required: "La fecha de fundacion es necesaria" })}

                />
                {errors.foundationDate && <p className="text-red-500">{errors.foundationDate?.message}</p>}
            </div>
            <div>
                <label>Provincia</label>
                <select className="w-full p-2 mt-1 rounded-lg border" {...register("province", { required: "La provincia es necesaria para ubicar el negocio" })} defaultValue={n.province} disabled={isPending}>
                    <option value="">Seleccione Provincia</option>
                    {datosProvince.provincia.map(n => (
                        <option key={n.ced} onClick={() => onChangeProvince(n.nombre)} value={n.nombre}>{n.nombre}</option>
                    ))}
                </select>
                {errors.province && <p className="text-red-500">{errors.province?.message}</p>}
            </div>
            <div className="flex flex-col md:flex-row md:gap-2">


                <div>
                    <label>Distrito</label>
                    <select className="w-full p-2 mt-1 rounded-lg border" {...register("distrito", { required: "El distrito es necesario para ubicar el negocio" })} defaultValue={n.distrito} disabled={isPending} >
                        <option value="">Seleccione Distrito</option>

                        {distrito ? (
                            distrito.map(n => (

                                <option key={n.nombre} onClick={() => onChangeDistrito(n.nombre)} value={n.nombre}>{n.nombre}</option>
                            ))


                        ) : ("")}
                    </select>
                    {errors.distrito && <p className="text-red-500">{errors.distrito?.message}</p>}
                </div>
                <div>
                    <label>Corregimiento</label>
                    <select className="w-full p-2 mt-1 rounded-lg border"  {...register("corregimiento", { required: "El corregimiento es necesario para ubicar el negocio" })} defaultValue={n.corregimiento} disabled={isPending}>
                        <option value="">Seleccione Distrito</option>

                        {corregimiento ? (
                            corregimiento.map(n => (

                                <option key={n} onClick={() => ('')} value={n}>{n}</option>
                            ))


                        ) : ("")}
                    </select>
                    {errors.corregimiento && <p className="text-red-500">{errors.corregimiento?.message}</p>}
                </div>
            </div>


            <div>
                <label>Ubicación en mapa</label>
                <MapSelector

                    onSelect={(latitud, longitud) => {
                        setLat(latitud);
                        setLng(longitud);
                        setValue("lat", latitud);
                        setValue("lng", longitud);
                    }}
                    data={[n.latitud, n.longitud]}


                />

                <div className="mt-2 text-sm">
                    <p>Latitud: {lat ?? "—"}</p>
                    <p>Longitud: {lng ?? "—"}</p>
                </div>
            </div>

        </Modal>
    );
}