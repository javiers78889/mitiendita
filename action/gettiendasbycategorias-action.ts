"use server"

import { GetUrl } from "@/src/config/getUrl.config"
import { FilterByCategoryType } from "@/src/types/FilterbyCategorytype"
import { TiendasListSchema } from "@/src/zod"

export async function GetTiendasByCategorias(data: FilterByCategoryType) {


    const { id, provincia, distrito, corregimiento, search, page } = data
    const params = new URLSearchParams({
        provincia: provincia?.toString() ?? "",
        distrito: distrito?.toString() ?? "",
        corregimiento: corregimiento?.toString() ?? "",
        search: search?.toString() ?? "",
        page: page?.toString()
    })
    const url = GetUrl(`store/category/${id}?${params.toString()}`)


    const req = await fetch(url)

    const json = await req.json()
    if (!req.ok) throw new Error("Error al intentar obtener productos")

    const validate = TiendasListSchema.parse(json)

    return validate
}