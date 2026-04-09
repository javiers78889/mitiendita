"use client"
import { GetProductByDepartamento } from "@/action/getproductosbydepartamento-action";
import { DepartamentosType } from "@/src/zod";
import { useQuery } from "@tanstack/react-query";
import { TableProductsFields } from "./Fields/TableProductsFields";
import { Spinner } from "../../utils/Spinner/Spinner";
import { useState } from "react";


export function TableProduct({ departamento }: { departamento: DepartamentosType }) {
    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ['productos', departamento.id, page],
        queryFn: ({ queryKey }) => {
            const [_key, id, page] = queryKey
            return GetProductByDepartamento(+id, +page)
        },
        enabled: !!departamento.id
    })
    const totalPages = data?.totalpages || 0;
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    function handlePageChange(page: number) {
        setPage(page);

    }
    if (isLoading) return <Spinner size={10} />
    if (data?.productos?.length == 0) return <div className="text-gray-400 "><h2>No hay productos en este departamento</h2></div>

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Quantity</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="h-50 overflow-y-scroll" >


                        {data?.productos!.map(n => (

                            <TableProductsFields key={n.id} n={n} />
                        ))}



                    </tbody>
                </table>
            </div>
            <div>
                {pagesArray.map((page) => (

                    <button
                        key={page}
                        className="page-box text-black hover:bg-amber-400 hover:text-white px-2 shadow-2xl py-1 mt-8 cursor-pointer transition text-shadow-2xs "
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}
