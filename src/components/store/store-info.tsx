import { productoDetalleType } from "@/src/zod";
import Image from "next/image";


export function StoreInfo({ n }: { n: productoDetalleType }) {
    return (

        <div className="w-xs ease-out transform hover:scale-105 hover:shadow-2xl">

            <div className="relative w-full h-48 border-b border-gray-200">
                <Image
                    src={n.image}
                    alt="{tienda.name}"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-4  ">
                <h3 className="text-lg font-semibold">{n.name}</h3>

            </div>

        </div>
    )
}