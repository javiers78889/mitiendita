"use server"

import { GetUrl } from "@/src/config/getUrl.config"
import { AnunciosPubList, ErrorSchema } from "@/src/zod"

export default async function GetAnuncios() {

    const url = GetUrl("anuncios/public")

    const req = await fetch(url)

    const json = await req.json()
    console.log(json)

    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }

    const validate = AnunciosPubList.safeParse(json)
    if (!validate.success) throw new Error(validate.error.message)

    return validate.data

}