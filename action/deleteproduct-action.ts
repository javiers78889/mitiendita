"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { DeleteProductType } from "@/src/types/CreateProductType";
import { DeleteProductSchema, ErrorSchema, SuccessSchema } from "@/src/zod";

export async function DeleteProduct(data: DeleteProductType) {

    const url = GetUrl("productos")
    const cookie = await Getjwt()
    const validate = DeleteProductSchema.safeParse(data)


    if (!validate.success) throw new Error(validate.error.message)

    const req = await fetch(url, { headers: { "authorization": `Bearer ${cookie.value}`, "Content-Type": "application/json" }, body: JSON.stringify(validate.data), method: "DELETE" })
    const json = await req.json()
    if (!req.ok) {
        
        const error = ErrorSchema.parse(json)
        
        throw new Error(error.message)
    }
    console.log("asdasdadsa",json)
    const sucess = SuccessSchema.parse(json)
    return sucess.message;
}