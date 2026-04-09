"use client"

import { TiendasType } from "@/src/zod";
import Link from "next/link";
import { ModalEditTienda } from "../../ModalesTienda/ModalEditTienda";
import { ModalDeleteTienda } from "../../ModalesTienda/ModalDeleteTienda";

export function TableStoresFields({ n }: { n: TiendasType }) {

    return (
        < tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >

            <td className="p-4">
                <img
                    src={`${n.image ? (n.image) : "https://flowbite.com/docs/images/products/apple-watch.png "}`}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                />
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {n.name}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {n.province},{n.distrito}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white ">
                <iframe
                    width="50%"
                    height="100"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-full w-25"
                    src={`https://www.google.com/maps?q=${n.latitud},${n.longitud}&z=15&output=embed`}
                ></iframe>
            </td>



            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{n.status ? ("Activo") : "Inactivo"}</td>

            <td className="px-6 flex flex-col items-center justify-center gap-2 py-4 space-x-2">
                <Link href={`/secure/admin/tienda-details/${n.id}`} className="font-medium  hover:underline">
                    Ver
                </Link>

                <ModalEditTienda n={n} />

                <ModalDeleteTienda n={n} />


            </td>
        </tr>
    )
}