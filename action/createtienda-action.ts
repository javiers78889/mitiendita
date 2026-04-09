"use server"
import { Getjwt } from "@/src/config/cookies.config"
import { GetUrl } from "@/src/config/getUrl.config"
import { CreateStoreType } from "@/src/types/CreateStoreType"
import { createStoreSchema, ErrorSchema, SuccessSchema } from "@/src/zod"

export async function CreateStore(data: CreateStoreType) {

    const url = GetUrl("store")
    const cookie = await Getjwt()

    const validate = createStoreSchema.safeParse(data)

    if (!validate.success) {
        validate.error.issues.map(n => {
            throw new Error(n.message)
        })
    }

    console.log(validate.data)
    const req = await fetch(url, { headers: { "Content-Type": "application/json", "authorization": `Bearer ${cookie?.value}` }, body: JSON.stringify(validate.data), method: "POST" })

    const json = await req.json()
    console.log(json)
    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }

    const success = SuccessSchema.safeParse(json);

    if (!success.success) throw new Error(success.error.message)




    return success.data.message
}