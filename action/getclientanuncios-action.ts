"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { ListAnunciosSchema, TiendasListSchema } from "@/src/zod";


export async function GetAnuncios() {
    const url = GetUrl(`anuncios`);


    const cookies = await Getjwt();

    const token = `Bearer ${cookies?.value}`

    const req = await fetch(url, {
        headers: {
            "authorization": token
        }
    })

    if (!req.ok) throw new Error("Error al intentar Obtener Datos")
    const json = await req.json()
    const validate = ListAnunciosSchema.parse(json)
  
    return validate
}