"use server"

import { Getjwt } from "@/src/config/cookies.config"
import { GetUrl } from "@/src/config/getUrl.config"
import { UpdateClienteType } from "@/src/types/UpdateClienteDataType"
import { SuccessSchema, UpdateAccountSchema } from "@/src/zod"

export async function UpdateClienteData(data: UpdateClienteType) {
    const url = GetUrl("user")
    const cookie = await Getjwt()

    const validate = UpdateAccountSchema.safeParse(data)

    if (!validate.success) throw new Error(validate.error.message)

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie.value}`, "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "PATCH" })
    const json = await req.json()
    if (!req.ok) throw new Error("Error al intentar actualizar sus datos")

    const success = SuccessSchema.parse(json)

    return success.message
}