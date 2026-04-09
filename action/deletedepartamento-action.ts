"use server"

import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { DeleteDepartamentoType } from "@/src/types/CreateDepartamentotype";
import { DeleteDepartamentoSchema, ErrorSchema, SuccessSchema } from "@/src/zod";


export async function DeleteDepartamento(data: DeleteDepartamentoType) {

    const url = GetUrl("departamentos")
    const cookies = await Getjwt()

    const validate = DeleteDepartamentoSchema.safeParse(data)

    if (!validate.success) throw new Error(validate.error.message[0])

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookies.value}`, "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "DELETE" })
    const json = await req.json()
    console.log(json)
    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }
    const success = SuccessSchema.parse(json)
    return success.message;
}