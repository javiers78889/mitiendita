"use server"

import { Getjwt } from "@/src/config/cookies.config"
import { GetUrl } from "@/src/config/getUrl.config"
import { productosSchema, ProductPaginationSchema } from "@/src/zod"

export async function GetProductByDepartamento(departamentoId: number, page?: number) {
    const params = new URLSearchParams({
        departamento: departamentoId.toString(),
        page: page?.toString() ?? ""
    })
    const url = GetUrl(`productos?${params.toString()}`)
    console.log(url)
    const cookie = await Getjwt()

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie?.value}` } })



    const json = await req.json()

    const validate = ProductPaginationSchema.safeParse(json)

    if (!validate.success) return {
        productos: [],
        totalpages: 0
    }

    return validate.data
}