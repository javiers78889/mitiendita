"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { ErrorSchema, TiendaDetalleSchema } from "@/src/zod";

export async function GetTiendaDetalle(id: string) {
    const url = GetUrl(`store/details/${id}`)


    const req = await fetch(url)

    const json = await req.json()

    if (!req.ok) {
        const error = ErrorSchema.safeParse(json)
        throw new Error(error.error?.message)
    }

    const data = TiendaDetalleSchema.safeParse(json)

    if (!data.success) throw new Error(data.error.message)

    return data.data

}