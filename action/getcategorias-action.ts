"use server"
import { GetUrl } from "@/src/config/getUrl.config";
import { categoriaListSchema } from "@/src/zod";

export async function GetCategorias() {
    const url = GetUrl("categorias");


    const req = await fetch(url)
    if (!req.ok) throw new Error("Error al intentar obtener las categorias")

    const json = await req.json()
    const validate = categoriaListSchema.safeParse(json)

    if (!validate.success) throw new Error("Error con las categorias")

  

    return validate.data
}