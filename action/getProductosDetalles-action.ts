"use server"

import { GetUrl } from "@/src/config/getUrl.config"
import { TiendaProductoDetalleSchema } from "@/src/zod"

export async function GetProductosDetalles(id: string, page: number, search?: string, busquedaDepartamento?: number) {
    const param = new URLSearchParams({ page: page.toString() })
    if (search?.trim()) {
        param.set("search", search.trim())
    }

    if (busquedaDepartamento && busquedaDepartamento > 0) {
        param.set("departamento", busquedaDepartamento.toString())
    }

    const url = GetUrl(`productos/store/${id}?${param}`)


    const req = await fetch(url)

    const json = await req.json()
    const validate = TiendaProductoDetalleSchema.safeParse(json)

    if (!validate.success) {
        const error = validate.error.message
        throw new Error(error)
    }
    console.log(json)
    return validate.data
}