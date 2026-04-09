"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { UpdateProductType } from "@/src/types/CreateProductType";
import { SuccessSchema, updateProductSchema } from "@/src/zod";


export async function UpdateProduct(data: UpdateProductType) {
    const { id } = data;
    const url = GetUrl(`productos/${id}`)
    const cookie = await Getjwt()

    const validate = updateProductSchema.safeParse(data);
    const updateObj = {
        name: validate.data?.name,
        description: validate.data?.description,
        image: validate.data?.image,
        quantity: validate.data?.quantity
    }

    if (!validate.success) throw new Error(validate.error.message)

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie.value}`, "Content-Type": "application/json" }, body: JSON.stringify(updateObj), method: "PATCH" })

    const json = await req.json()
    console.log(json)
    if (!req.ok) throw new Error("Error al intentar actualizar el producto")
    const success = SuccessSchema.parse(json)

    return success.message
}