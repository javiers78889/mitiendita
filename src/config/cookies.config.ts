"use server"

import { cookies } from "next/headers";



export async function Getjwt() {
    const store = cookies();

    const token = (await store).get("token");

    if(!token) throw new Error("No hay token de sesion")
    return token

}