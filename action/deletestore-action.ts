"use server"

import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { DeleStoreType } from "@/src/types/CreateStoreType";
import { DeleteProductSchema, ErrorSchema, SuccessSchema } from "@/src/zod";

export async function DeleteStore(data: DeleStoreType) {

    const url = GetUrl("store")
    const cookie = await Getjwt()
    const validate = DeleteProductSchema.safeParse(data)
    if (!validate.success) throw Error(validate.error.message)

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie.value}`, "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "DELETE" })
    const json = await req.json()
    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }

    const success = SuccessSchema.parse(json)


    return success.message
}