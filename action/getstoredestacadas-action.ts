"use server"

import { GetUrl } from "@/src/config/getUrl.config"
import { DestacadosArraySchema, ErrorSchema } from "@/src/zod"

export async function GetStoreDestacadas() {
    const url = GetUrl("destacados")

    const req = await fetch(url)

    const json = await req.json()

    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }
    const validate = DestacadosArraySchema.safeParse(json)

    if (!validate.success) throw new Error(validate.error.message)
    console.log(validate.data)

    return validate.data
}