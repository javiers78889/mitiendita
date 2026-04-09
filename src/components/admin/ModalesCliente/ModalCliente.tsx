"use client"
import { useEffect } from "react";
import { ClientDetailsSchemaType } from "@/src/zod";
import { useForm } from "react-hook-form";
import { UpdateClienteType } from "@/src/types/UpdateClienteDataType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateClienteData } from "@/action/updateclientedata-action";
import { toast } from "react-toastify";
import Modal from "../../utils/modals/Modal";


export function ModalCliente({ data }: { data: ClientDetailsSchemaType }) {
    const queryclient= useQueryClient()
    const { handleSubmit, reset, register, setValue, formState: { errors } } = useForm<UpdateClienteType>()

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UpdateClienteType) => UpdateClienteData(data),
        onSuccess: (message) => {
            toast.success(message)
            queryclient.invalidateQueries({queryKey:['cliente']})
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })
    useEffect(() => {
        reset()
    }, [data])
    return (
        <Modal action={handleSubmit((data) => {
            const form = { ...data };
            if (!form.password) {
                delete form.password;
            }
            mutate(form)


        })} placeholder="Editar" ispending={isPending}>

            <div>
                <label>Nombre</label>
                <input className="w-full p-2 mt-1 rounded-lg border" defaultValue={data.name}
                    disabled={isPending}
                    {...register("name", { required: "El nombre es necesario" })}
                />
                {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input className="w-full p-2 mt-1 rounded-lg border" defaultValue={data.email}
                    disabled={isPending}
                    {...register("email", { required: "El email es necesario" })}
                />
                {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
            </div>
            <div>
                <label>Contraseña</label>
                <input className="w-full p-2 mt-1 rounded-lg border"
                    disabled={isPending}
                    {...register("password")}
                />
            </div>

            <div>
                <label>Cédula</label>
                <input className="w-full p-2 mt-1 rounded-lg border" defaultValue={data.cedula}
                    disabled={isPending}
                    {...register("cedula", { required: "La cedula es necesaria" })}
                />
                {errors.cedula && <p className="text-red-500">{errors.cedula?.message}</p>}
            </div>

            <div>
                <label>Fecha de Nacimiento</label>
                <input type="date" className="w-full p-2 mt-1 rounded-lg border" defaultValue={data.birthdate.slice(0, 10)}
                    disabled={isPending}
                    {...register("birthdate", { required: "La fecha de nacimiento es necesaria" })}
                />
                {errors.birthdate && <p className="text-red-500">{errors.birthdate?.message}</p>}
            </div>

            <div>
                <label>Celular</label>
                <input className="w-full p-2 mt-1 rounded-lg border" defaultValue={data.cellphone}
                    disabled={isPending}
                    {...register("cellphone", { required: "El celular es necesario" })}
                />
                {errors.cellphone && <p className="text-red-500">{errors.cellphone?.message}</p>}
            </div>


        </Modal>
    );
}