"use server"
import { cookies } from "next/headers";

export async function Logout() {

    const store = cookies();

    (await store).delete("token");
}