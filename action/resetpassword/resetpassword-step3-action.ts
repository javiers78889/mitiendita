"use server"

import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { ResetPasswordStep3type } from "@/src/types/ResetPasswordType";
import { ErrorSchema, ResetPasswordStep3Schema, SuccessSchema } from "@/src/zod";
import { cookies } from "next/headers";

export async function ResetPasswordStep3(data: ResetPasswordStep3type) {
    const url = GetUrl("auth/resetpassword-step3")
    const cookie = await Getjwt()
    const token = cookie.value;
    console.log(token)
    const validate = ResetPasswordStep3Schema.safeParse(data)
    if (!validate.success) {
        validate.error.issues.map(n => {
            throw new Error(n.message)
        })
    }
    const obj = {
        password: validate.data?.password
    }
    const req = await fetch(url, { headers: { "Content-Type": "application/json", "authorization": `Bearer ${token}` }, body: JSON.stringify(obj), method: "PATCH" })
    const json = await req.json()
    console.log(json)
    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }
    const success = SuccessSchema.parse(json)
    const removecookie = cookies()
        ; (await removecookie).delete("token")

    return success.message

}