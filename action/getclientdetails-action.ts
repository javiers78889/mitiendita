"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { ClientDetailsSchema } from "@/src/zod";


export async function GetClientDetails() {
    const url = GetUrl("user");
    const cookies = await Getjwt();

    const token = `Bearer ${cookies?.value}`

    const req = await fetch(url, {
        headers: {
            "authorization": token
        }
    })

    if (!req.ok) throw new Error("Error al intentar Obtener Datos")
    const json = await req.json()

    const validate = ClientDetailsSchema.safeParse(json)

    if (!validate.success) {
        validate.error.issues.map(n => {
            throw new Error(n.message)
        })
    }
  
    return validate.data
}