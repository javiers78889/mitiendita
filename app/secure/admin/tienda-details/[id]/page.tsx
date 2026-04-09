"use client"
import { GetTiendaDepartamentos } from "@/action/gettiendadepartamentos-action";
import { GetTiendaDetails } from "@/action/gettiendadetails-action";
import { ModalDepartamento } from "@/src/components/tienda-details/ModalesDepartamento/ModalDepartamento";
import { ModalProduct } from "@/src/components/tienda-details/ModalesProducto/ModalProduct";
import { TableProduct } from "@/src/components/tienda-details/TableProducts/TableProducts";
import { TableDepartamentos } from "@/src/components/tienda-details/TableDepartamentos";
import { DepartamentosType } from "@/src/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { ScreenLoading } from "@/src/components/utils/ScreenLoading/ScreenLoading";



export default function Page() {
    const navigate = useRouter()
    const { id } = useParams<{ id: string }>()
    const [departamento, setDepartamento] = useState<DepartamentosType>()


    const { data, isLoading, error } = useQuery({
        queryKey: ["tiendaDetail", id],
        queryFn: ({ queryKey }) => { return GetTiendaDetails(id) }
    })

    const { data: departamentosdata, isLoading: isLoadingDepartamentos, error: DepartamentosErro } = useQuery({
        queryKey: ['departamentos', id],
        queryFn: ({ queryKey }) => {
            return GetTiendaDepartamentos(id)
        }

    })

    useEffect(() => {
        if (departamentosdata && departamentosdata?.length > 0) {

            setDepartamento(departamentosdata[0])
        }

    }, [departamentosdata])



    if (error || DepartamentosErro) {
        toast.error("Usted no tiene permisos para ver esta informacion")
        navigate.push("/secure/admin")
    }

    if (isLoading && isLoadingDepartamentos) return <ScreenLoading />

    return (
        <div className=" bg-gray-100 rouded-lg">


            {/* HEADER */}
            <div className="px-5 py-10 flex items-center gap-5">
                <div className="flex flex-col md:flex-row md:justify-between w-full">
                    <div className="flex gap-2">
                        <div>
                            <h2 className="font-bold text-4xl text-gray-800">Bienvenido</h2>
                            <h3 className="font-semibold text-lg text-gray-600"><span className="text-gray-400 text-shadow-xs">{data?.name}</span> </h3>
                        </div>
                        <div
                            className="w-[100px] h-[100px]"

                        >
                            <Image src={data && data.image ? (data?.image) : "/tienda.png"} width={100} height={100} alt="logo empresa" />
                        </div>
                    </div>
                    <div className="text-white">
                        <Link className="bg-red-500 hover:bg-red-800  cursor-pointer rounded-lg px-5 py-2" href={"/secure/admin"}>Volver</Link>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className="flex flex-col xl:flex-row justify-center gap-5  pb-10 min-w-3.5xl xl:min-w-5xl max-w-3.5xl">

                {/* LEFT SIDE */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 min-w-3.5xl xl:min-w-5xl max-w-3.5xl">
                    {departamento ? (

                        <>
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="font-bold text-2xl text-gray-800">Departamento de <span className="text-red-500 text-shadow-lg uppercase">{departamento.name}</span></h2>
                                    <h3 className="font-bold text-xs text-gray-800">Lista de productos</h3>
                                     <h2 className="font-bold text-sm text-gray-400">Usted cuenta con <span className="text-red-500"> {data?.cant_productos} </span>token para crear tiendas</h2>
                                </div>
                                <ModalProduct departamento={departamento} storeId={id} />
                            </div>


                            <TableProduct departamento={departamento} />
                        </>
                    ) : <h2 className="text-gray-400">Debe crear un departamento para poder agregar productos</h2>}
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 md:min-w-2xl ">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-bold text-xl text-gray-800 mb-4">Departamentos</h2>

                        </div>
                        <ModalDepartamento id={id} />

                    </div>
                    {departamentosdata && departamentosdata.length > 0 ? (

                        <TableDepartamentos departamentosdata={departamentosdata} setDepartamento={setDepartamento} />
                    ) : (

                        <div className="flex items-center justify-center text-gray-700 w-full">
                            <h2>No hay Departamentos</h2>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}