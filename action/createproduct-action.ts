"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { CreateProductType } from "@/src/types/CreateProductType";
import { createProductSchema, DepartamentosType, ErrorSchema, SuccessSchema } from "@/src/zod";

export async function CreateProduct(data: CreateProductType) {

    const url = GetUrl("productos")
    const cookie = await Getjwt()
    const validate = createProductSchema.safeParse(data)

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