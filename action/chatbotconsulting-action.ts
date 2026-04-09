"use server"

import { GetUrl } from "@/src/config/getUrl.config"
import { ProductosDisponibleSchema, ProductosDisponibleSchemaList, ProductosDisponibleSchemaType, ProductosDisponibleType, SuccessSchema } from "@/src/zod"


export async function ChatBotConsulting(input: string): Promise<ProductosDisponibleSchemaType | string> {
    const url = GetUrl("chat/context")

    const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input })
    })

    if (!req.ok) throw new Error("Error al intentar consultar al agente")

    const json = await req.text()
    const inicio = json.indexOf("[")
    const fin = json.lastIndexOf("]")
    const limpio = inicio !== -1 && fin !== -1
        ? json.slice(inicio, fin + 1)
        : json

    const producto = JSON.parse(limpio)

    console.log(producto)
    const validate = ProductosDisponibleSchemaList.safeParse(producto)

    if (!validate.success) {

        const success = SuccessSchema.safeParse(producto)

        if (!success.success) throw new Error("errro")

        return success.data.message
    }

    return validate.data
}