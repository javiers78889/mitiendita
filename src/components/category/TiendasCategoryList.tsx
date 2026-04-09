import { TiendasListType } from "@/src/zod";
import Image from "next/image";
import Link from "next/link";

export function TiendasCategoryList({ data }: { data: TiendasListType }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data && data.data.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                    No se encontraron tiendas.
                </p>
            ) : (
                data && data.data.map((tienda) => (
                    <Link
                        key={tienda.id} href={`/main/store/${tienda.id}`}
                        className=" rounded-lg overflow-hidden bg-white shadow hover:shadow-xl  cursor-pointer hover:scale-110 transition-transform"
                    >
                        <div className="relative w-full h-48 border-b border-gray-200">
                            <Image
                                src={tienda.image}
                                alt={tienda.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4  ">
                            <h3 className="text-lg font-semibold">{tienda.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{tienda.description}</p>
                            <p className="mt-2 text-sm text-gray-400">
                                {tienda.province}, {tienda.distrito}
                            </p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}