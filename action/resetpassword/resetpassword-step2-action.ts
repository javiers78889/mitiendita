"use server"

import { GetUrl } from "@/src/config/getUrl.config"
import { ResetPasswordStep2type } from "@/src/types/ResetPasswordType"
import { ResetPasswordStep2Schema } from "@/src/zod"
import { cookies } from "next/headers"


export async function ResetPasswordStep2(data: ResetPasswordStep2type) {
    const url = GetUrl("auth/resetpassword-step2")


    const validate = ResetPasswordStep2Schema.safeParse(data)

    if (!validate.success) throw new Error(validate.error.message)


    const req = await fetch(url, { headers: { "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "POST" })

    const json = await req.json()


    if (!req.ok) throw new Error("Error al intentar validar el tokenF")
    const validateJson = ResetPasswordStep2Schema.safeParse(json)

    if (!validateJson.success) throw new Error(validateJson.error.message)
    const cookie = cookies()
        ; (await cookie).set("token", validateJson.data.token)


    return "Token aprobado"
}