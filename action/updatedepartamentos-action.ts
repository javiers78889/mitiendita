"use server"

import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { UpdateDepartamentoType } from "@/src/types/CreateDepartamentotype";
import { ErrorSchema, SuccessSchema, UpdateDepartamentoSchema } from "@/src/zod";

export async function UpdateDepartamentos(data: UpdateDepartamentoType) {
    const url = GetUrl("departamentos")
    const cookie = await Getjwt()
    console.log(data)
    const validate = UpdateDepartamentoSchema.safeParse(data)

    if (!validate.success) {
        validate.error.issues.map(n => {
            throw new Error(n.message)
        })
    }
    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie.value}`, "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "PATCH" })

    const json = await req.json()

    if (!req.ok) {
        console.log(json)
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }

    const success = SuccessSchema.parse(json)


    return success.message

}