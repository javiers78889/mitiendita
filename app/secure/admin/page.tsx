"use client"

import { GetAnuncios } from "@/action/getclientanuncios-action";
import { GetClientDetails } from "@/action/getclientdetails-action";
import { GetTiendas } from "@/action/getclienttiendas-action";
import { ModalCliente } from "@/src/components/admin/ModalesCliente/ModalCliente";
import { ModalTienda } from "@/src/components/admin/ModalesTienda/ModalTienda";
import { TableAnuncios } from "@/src/components/admin/TableAnuncios/TableAnuncios";
import { TableStores } from "@/src/components/admin/TableStore/TableStores";
import { Spinner } from "@/src/components/utils/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Page() {
    const [page, setPage] = useState(1);

    const { data: anunciosData, isLoading: isLoadingAnuncios } = useQuery({
        queryKey: ['anuncios'],
        queryFn: GetAnuncios
    })
    const { data, isLoading, isError } = useQuery({
        queryKey: ['cliente'],
        queryFn: GetClientDetails
    })

    const { data: arreglos, isLoading: tiendasLoading, isError: tiendasError, error } = useQuery({
        queryKey: ['tiendas', page],
        queryFn: ({ queryKey }) => {
            const [_key, page] = queryKey
            return GetTiendas(+page)
        },

    })

    useEffect(() => {
        if (tiendasError && error instanceof Error) {
            toast.error(error.message);
        }
    }, [tiendasError, error]);


    function handlePageChange(page: number) {
        setPage(page);

    }


    const totalPages = arreglos?.lastPage || 0;


    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (isLoading && tiendasLoading && isLoadingAnuncios) return (<Spinner size={100} />)

    return (
        <div className=" bg-gray-100">

            {/* HEADER */}
            <div className="px-5 py-10 flex flex-col xl:flex-row gap-5">
                <div className=" border-r px-5">
                    <h2 className="font-bold text-4xl text-gray-800">Bienvenido</h2>
                    <h3 className="font-semibold text-lg text-gray-600">{data?.name}</h3>
                </div>
                <div>
                    <h2 className="font-bold text-lg text-gray-800">Datos Generales</h2>
                    <h3 className="font-semibold text-sm text-gray-600">Correo: {data?.email}</h3>
                    <h3 className="font-semibold text-sm text-gray-600">Telefono: {data?.cellphone}</h3>
                </div>
                <div>
                    {data ? (

                        <ModalCliente data={data} />

                    ) : ("")}
                </div>


            </div>

            {/* GRID */}
            <div className="flex flex-col xl:flex-row justify-center gap-5   pb-10">

                {/* LEFT SIDE */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 min-w-3.5xl xl:min-w-5xl max-w-3.5xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="font-bold text-2xl text-gray-800">Mis Tiendas</h2>
                                <h2 className="font-bold text-sm text-gray-400">Usted cuenta con <span className="text-red-500"> {data?.cant_tiendas} </span>token para crear tiendas</h2>
                            </div>

                            <ModalTienda />
                        </div>
                        {arreglos && arreglos?.data.length > 0 && arreglos.lastPage > 0 ? (

                            <TableStores arreglo={arreglos} />
                        ) : (
                            <div className="flex items-center justify-center text-gray-700">
                                <h2>No tiene tiendas creadas</h2>

                            </div>)}
                    </div>
                    <div>
                        {pagesArray.map((page) => (

                            <button
                                key={page}
                                className="page-box text-black hover:bg-amber-400 hover:text-white px-2 shadow-2xl py-1 mt-8 cursor-pointer transition text-shadow-2xs rounded-full"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200  md:min-w-3xl  max-w-3.5xl ">
                    <h2 className="font-bold text-xl text-gray-800 mb-4">Anuncios</h2>

                    {anunciosData && anunciosData?.length > 0 ? (

                        <TableAnuncios anuncios={anunciosData} />
                    ) : (
                        <div className="flex items-center justify-center text-gray-700">
                            <h2>No tiene Anuncios</h2>

                        </div>)}
                </div>
            </div>
        </div>
    );
}