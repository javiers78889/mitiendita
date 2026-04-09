"use server"


import { GetUrl } from "@/src/config/getUrl.config"
import { ValidateAccountType } from "@/src/types/ValidateAccountType"
import { ErrorSchema, SuccessSchema, validateAccountSchema } from "@/src/zod"
import { cookies } from "next/headers"


export async function ValidateAccount(data: ValidateAccountType) {
    const store = cookies();


    const url = GetUrl("auth/activate-accoount")
    const validate = validateAccountSchema.safeParse(data)

    if (!validate.success) throw new Error(validate.error.message)

    const req = await fetch(url, { headers: { "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "POST" })

    const json = await req.json()
     console.log(json)

    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        
       
        throw new Error(error.message)

    }

    (await store).get("token");

    const success = SuccessSchema.parse(json)

    return success.message


}