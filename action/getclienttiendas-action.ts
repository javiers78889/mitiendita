"use server"
import { Getjwt } from "@/src/config/cookies.config";
import { GetUrl } from "@/src/config/getUrl.config";
import { ClientDetailsSchema, TiendasListSchema } from "@/src/zod";


export async function GetTiendas(page?: number) {
    const url = GetUrl(`store?page=${page}`);

    console.log(url)
    const cookies = await Getjwt();

    const token = `Bearer ${cookies?.value}`

    const req = await fetch(url, {
        headers: {
            "authorization": token
        }
    })
    const json = await req.json()

    if (!req.ok) {
        return {
            data: [],
            lastPage: 0

        }
    }


    const validate = TiendasListSchema.safeParse(json)


    if (!validate.success) {
        validate.error.issues.map(n => {
            throw new Error(n.message)
        })
    }

    return validate.data
}