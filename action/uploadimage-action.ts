"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config"
import { UploadImageSchema } from "@/src/zod";

export async function UploadImage(file: File, remove?: boolean): Promise<string> {
    
    let url = GetUrl("cloudinary/upload")
    if (remove) {
        url = GetUrl("removebg")
    }

    const files = file;

    const formData = new FormData()
    const token = await Getjwt()

    formData.append('file', files)
    const req = await fetch(url, { headers: { "authorization": `Bearer ${token?.value}` }, body: formData, method: "POST" })

    const json = await req.json()
    const { data, success, error } = UploadImageSchema.safeParse(json)
    console.log(json)

    if (!req.ok) throw new Error("Error al intentar subir la imagen")


    if (!success) {

        throw new Error(error.message)


    }


    return data?.url


}