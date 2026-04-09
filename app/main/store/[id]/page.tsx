"use client"

import { GetProductosDetalles } from "@/action/getProductosDetalles-action"
import { GetTiendaDetalle } from "@/action/gettiendadetalle-action"
import { ModalProductoDetalle } from "@/src/components/store/Modales/Modal-ProductoDetalle"
import { StoreInfo } from "@/src/components/store/store-info"
import { ScreenLoading } from "@/src/components/utils/ScreenLoading/ScreenLoading"
import { Spinner } from "@/src/components/utils/Spinner/Spinner"
import { productoDetalleType } from "@/src/zod"
import IonIcon from "@reacticons/ionicons"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineMenu } from "react-icons/hi"
import { toast } from "react-toastify"

export default function Page() {
    const navigate = useRouter()
    const { id } = useParams<{ id: string }>()
    const [showCategory, setShowCategory] = useState(true)
    const [modalContent, setModalContent] = useState<productoDetalleType>({
        id: "",
        name: "",
        description: "",
        image: "",
        quantity: 0
    })
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<number>(1)
    const [busquedaDepartamento, setBusquedaDepartamento] = useState<number>(0)
    const [search, setSearch] = useState<string>("")

    //obtener detalles de tiendas
    const { data, isLoading, isError: iserrortienda } = useQuery({
        queryKey: ['tienda-detalle', id], queryFn: ({ queryKey }) => {

            const [_key, id] = queryKey
            return GetTiendaDetalle(String(id))
        },
        enabled: !!id
    })
    useEffect(() => {
        setOpen(false)
    }, [])
    //obtener productos

    const { data: dataProducto, isLoading: isLoadingProducto, isError } = useQuery({
        queryKey: ['productos-tienda', id, page, search, busquedaDepartamento],
        queryFn: ({ queryKey }) => {
            const [_key, id, page, search, busquedaDepartamento] = queryKey
            return GetProductosDetalles(String(id), +page!, String(search), +busquedaDepartamento)
        },
    })
    // filtro de busqueda
    const { handleSubmit, register, reset, formState: { errors } } = useForm<{ search: string }>()

    const paginacion = Array.from(
        { length: dataProducto?.total ?? 0 },
        (_, n) => n + 1
    )
    useEffect(() => {
        if (errors) {
            toast.error(errors.search?.message)
        }
        if (isError || iserrortienda) {
            navigate.push('/')
        }
    }, [errors, isError, iserrortienda])
    if (isLoading) return <ScreenLoading />
    return (
        <>
            <div className="min-h-5 max-h-fit bg-white flex  justify-between flex-col items-center w-full px-5 py-2 rounded-lg">

                <div className="flex flex-col xl:flex-row items-center justify-center xl:justify-start  px-2 gap-5 shadow-lg w-full">
                    <div >
                        <img
                            src={data ? data.image : '/tienda.png'}
                            alt="Logo de la tienda"
                            width={50}
                            height={50}
                            className="w-28 md:w-50 max-h-50 object-contain  rounded-lg"


                        />
                    </div>
                    <div className="xl:border-r-2 border-gray-200 px-4 flex flex-col gap-2 md:min-w-xs">
                        <div>
                            <h2 className="font-bold text-2xl">{data?.name}</h2>
                            <h2><span className="font-bold">Direccion:</span> {data?.province},{data?.distrito},{data?.corregimiento}</h2>
                            <h2><span className="font-bold">Telefono:</span> {data?.cellphone}</h2>
                        </div>
                        <Link href={`https://wa.me/507${data?.cellphone.replace("-", "")}`}>
                            <h2 className="text-green-600"><IonIcon name="logo-whatsapp" size="large" /></h2>
                        </Link>
                    </div>
                    <div className="xl:border-r-2 border-gray-200 px-4 max-w-full md:min-w-xs">
                        <h2 className="font-bold text-lg">Decripcion</h2>
                        <p>{data?.description}</p>
                    </div>
                    <div className=" border-gray-200 px-4 flex flex-col md:min-w-xs">
                        <h2 className="font-bold text-lg">Ubicacion de la tienda</h2>
                        <div className="w-full h-[150px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
                            <iframe
                                src={`https://www.google.com/maps?q=${data?.latitud},${data?.longitud}&z=15&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Ubicación de ${data?.name}`}
                            />
                        </div>
                    </div>
                </div>
                {/*Departamentos */}
                <div className="flex items-center w-full text-center h-15 gap-5  md:flex-row ">
                    <div className="xl:border-r-2  border-gray-300 px-2">
                        <h2 className="font-bold  text-xl">Departamentos</h2>
                    </div>
                    <button className="flex xl:hidden flex-col justify-between w-8 h-8 p-1 cursor-pointer" onClick={() => setShowCategory(!showCategory)}>
                        <HiOutlineMenu size={30} />
                    </button>
                    <nav className=" xl:block hidden">
                        {data?.departments.map(n => (
                            <button key={n.id} onClick={() => setBusquedaDepartamento(n.id)} className="text-gray-600 rounded-lg px-5 py-2 font-bold uppercase cursor-pointer transform transition-transform duration-300 ease-out hover:text-amber-400 ">{n.name}</button>
                        ))}
                    </nav>

                </div>
                <div>
                    <nav className={`flex flex-col bg-white 
                        ${showCategory ? 'hidden' : 'flex'}  // mobile
                        xl:hidden                       // siempre visible en XL
                    `}>
                        {data?.departments.map(n => (
                            <Link href={''} key={n.id} className="text-gray-600 rounded-lg px-5 py-2 font-bold uppercase cursor-pointer transform transition-transform duration-300 ease-out hover:text-amber-400 hover:scale-150">{n.name}</Link>
                        ))}
                    </nav>
                </div>
                <div className=" w-full">
                    <form className="flex gap-5 justify-end flex-col md:flex-row" onSubmit={handleSubmit((data) => { setSearch(data.search) })}>

                        <input type="text" placeholder="¿Qué buscas el dia de hoy?" className="border border-gray-300 rounded-sm px-2 h-11" {...register("search", { required: "Escriba lo que desee buscar por favor" })} />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-lg px-5 py-2 font-semibold cursor-pointer">Buscar</button>
                        <button type="button" className="bg-gray-500 hover:bg-gray-600 rounded-lg text-white text-lg px-5 py-2 font-semibold cursor-pointer" onClick={() => { setBusquedaDepartamento(0), setSearch(""), reset() }}>Limpiar</button>
                    </form>
                </div>
                {isLoadingProducto ? (
                    <>
                        <Spinner size={50} />
                        <h2>Buscando...</h2>
                    </>

                ) : (
                    <>
                        <ModalProductoDetalle open={open} setOpen={setOpen} n={modalContent} telefono={data?.cellphone!} />
                        <div className="flex  flex-wrap   w-full gap-5 py-5  h-screenb">
                            {dataProducto?.total == 0 ? (

                                <h2 className="text-gray-400">No hay productos en este departamento</h2>
                            ) : (

                                dataProducto?.productos.map(n => (
                                    <div key={n.id}>
                                        <button onClick={() => { setModalContent(n), setOpen(!open) }} className="cursor-pointer" >
                                            <StoreInfo n={n} />

                                        </button>
                                    </div>
                                ))


                            )}



                        </div>
                        <div className="w-full flex justify-center mt-4 gap-2">
                            {paginacion.map(n => (
                                <button
                                    key={n}
                                    onClick={() => setPage(n)}
                                    className={`
        px-2 py-1 mt-8 rounded-full shadow-2xl transition-colors duration-200
        ${page === n
                                            ? 'bg-amber-400 text-white'
                                            : 'bg-gray-100 text-black hover:bg-amber-400 hover:text-white'}
      `}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                    </>

                )}

            </div >

        </>
    )
}