"use server"
import { Getjwt } from "@/src/config/cookies.config"
import { GetUrl } from "@/src/config/getUrl.config"
import { TiendasSchema } from "@/src/zod"

export async function GetTiendaDetails(id: string) {
    const url = GetUrl(`store/${id}`)
    const cookie = await Getjwt()

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie?.value}` } })

    if (!req.ok) throw new Error("Error al intentar consultar la data de la tienda")
    const json = await req.json()

    const validate = TiendasSchema.safeParse(json)

    if (!validate.success) throw new Error(validate.error.message)


    return validate.data
}