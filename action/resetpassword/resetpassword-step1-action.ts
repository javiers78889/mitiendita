"use server"

import { GetUrl } from "@/src/config/getUrl.config";
import { ResetPasswordStep1type } from "@/src/types/ResetPasswordType";
import { ResetPasswordStep1Schema, SuccessSchema } from "@/src/zod";

export async function ResetPasswordStep1(data: ResetPasswordStep1type) {
    const url = GetUrl("auth/resetpassword-step1")
    const validate = ResetPasswordStep1Schema.safeParse(data);

    if (!validate.success) throw new Error(validate.error.message)

    const req = await fetch(url, { headers: { "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "POST" })
    const json = await req.json()

    console.log(json)

    if (!req.ok) throw new Error("Error al intentar validar el correo")
    const success = SuccessSchema.parse(json)

    return success.message
}