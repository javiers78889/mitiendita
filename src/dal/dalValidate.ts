"use server"

import { Getjwt } from "../config/cookies.config"
import { GetUrl } from "../config/getUrl.config"
import { SuccessSchema } from "../zod"

export async function dalValidate() {
    const url = GetUrl("auth/validate-token")
    const cookie = await Getjwt()

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie?.value}` }, method: "POST" })

    const json = await req.json()
    if (!req.ok) throw new Error("Token invalido")
    const success = SuccessSchema.safeParse(json)

    if (!success.success) throw new Error("token vencido")



    return success.success


}