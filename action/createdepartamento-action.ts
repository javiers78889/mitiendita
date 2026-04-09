"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { CreateDepartamentoType } from "@/src/types/CreateDepartamentotype";
import { CreateDepartamentoSchema, ErrorSchema, SuccessSchema } from "@/src/zod";

export async function CreateDepartamento(data: CreateDepartamentoType) {
    const url = GetUrl("departamentos")
    const cookie = await Getjwt()

    const validate = CreateDepartamentoSchema.safeParse(data)

    if (!validate.success) throw new Error(validate.error.message)

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie?.value}`, "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "POST" })

    const json = await req.json()

    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }
    const validateSuccess = SuccessSchema.parse(json)


    return validateSuccess.message



}