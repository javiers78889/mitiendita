"use server"


import { GetUrl } from "@/src/config/getUrl.config";
import { RegisterFormtype } from "@/src/types/RegisterFormType copy";
import { CreateAccountSchema, ErrorSchema, SuccessSchema } from "@/src/zod";

export async function CreateAccount(data: RegisterFormtype) {

    const url = GetUrl("user")
    const { name, cedula, email, cellphone, password, birthdate, captcha } = data

    const validate = CreateAccountSchema.safeParse(data)


    if (!validate.success) {
        validate.error.issues.map(n => {

            throw new Error(n.message)
        })
    }
    const obj = {
        name:validate.data?.name.replace(/\\/g, "\\\\"), cedula:validate.data?.cedula.replace(/\\/g, "\\\\"), cellphone:validate.data?.cellphone.replace(/\\/g, "\\\\"), email:validate.data?.email.replace(/\\/g, "\\\\"), password:validate.data?.password.replace(/\\/g, "\\\\"), birthdate:validate.data?.birthdate
    }
    console.log(validate.data)

    const req = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(obj), method: "POST"
    })

    const json = await req.json()
    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }

    const Success = SuccessSchema.safeParse(json)

    if (!Success.success) throw new Error("Data erronea")


    return Success.data.message




}
