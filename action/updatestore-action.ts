
"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { UpdateStoreType } from "@/src/types/CreateStoreType";
import { createStoreSchema, SuccessSchema } from "@/src/zod";

export async function UpdateStore(data: UpdateStoreType) {
    const { id, name, description, cellphone, image, foundationDate, province, distrito, corregimiento, categoryId, lat, lng } = data;
    const obj = { name, description, cellphone, image, foundationDate, province, distrito, corregimiento, categoryId, lat, lng }
    const validate = createStoreSchema.safeParse(obj)
    if (!validate.success) throw new Error(validate.error.message)
    const url = GetUrl(`store/${id}`)
    const cookie = await Getjwt()
    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie.value}`, "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "PATCH" })

    const json = await req.json()
    console.log(json)
    if (!req.ok) throw new Error("Error al intentar actualizar la tienda")


    const success = SuccessSchema.parse(json)

    return success.message
}