"use server"
import { GetUrl } from "@/src/config/getUrl.config";
import { LoginForm } from "@/src/types/LoginFormType";
import { ErrorSchema, LoginSchema, LoginTokenSchem } from "@/src/zod";
import { cookies } from "next/headers";

export async function LoginAction(data: LoginForm) {

    const url = GetUrl("auth/login")

    console.log(url)

    const validate = LoginSchema.safeParse(data)
    if (!validate.success) {
        validate.error.issues.map(n => {
            throw new Error(n.message)
        })
    }
    const LogData = {
        email: validate.data?.email,
        password: validate.data?.password
    }
    const req = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(LogData),
        method: "POST"
    })

    const json = await req.json()
    if (!req.ok) {
        const error = ErrorSchema.parse(json)
        throw new Error(error.message)
    }
    const token = LoginTokenSchem.safeParse(json)

    if (!token.success) throw new Error(token.error.message)
    const cookieStore = cookies()

        ; (await cookieStore).set("token", token.data.token)


    return "Acceso Aprobado"
}