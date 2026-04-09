"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { ListDepartamentos } from "@/src/zod";

export async function GetTiendaDepartamentos(storeId: string) {

    const url = GetUrl(`departamentos/${storeId}`)

    const cookies = await Getjwt()

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookies?.value}` } })

    if (!req.ok) throw new Error("Error al intentar obtener los departamentos de esta tienda");

    const json = await req.json()
    const validate = ListDepartamentos.safeParse(json);

    if (!validate.success) {
        validate.error.issues.map(n => {
            throw new Error(n.message)
        })
    }

    return validate.data
}