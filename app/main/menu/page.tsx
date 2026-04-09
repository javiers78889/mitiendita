"use client"
import GetAnuncios from "@/action/getanuncios-action";
import { GetCategorias } from "@/action/getcategorias-action";
import { GetStoreDestacadas } from "@/action/getstoredestacadas-action";
import Carrusel from "@/src/components/utils/carrusel/Carrusel";
import DestacadosCarrusel from "@/src/components/utils/carrusel/DestacadosCarrusel";
import { ChatBot } from "@/src/components/utils/chatbot/ChatBot";
import { ScreenLoading } from "@/src/components/utils/ScreenLoading/ScreenLoading";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Page() {


    const { data, isLoading } = useQuery({
        queryKey: ['categorias'],
        queryFn: GetCategorias,

    })

    const { data: dataDestacada, isLoading: isLoadingDestacada } = useQuery({
        queryKey: ['destacados'],
        queryFn: GetStoreDestacadas
    })

    const { data: anunciosData, isLoading: isLoadingAnuncions } = useQuery({
        queryKey: ['anuncios'],
        queryFn: GetAnuncios
    })


    if (isLoading && isLoadingAnuncions && isLoadingDestacada) return <ScreenLoading />
    return (
        <>
            {/* Carrusel principal */}
            {anunciosData ? (
                <Carrusel slides={anunciosData} />

            ) : ("No hay anuncios")}

            {/* Sección Categorías + ChatBot */}
            <section className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8 px-5 mt-10 ">

                {/* Categorías en mosaico */}
                <div className="flex-1">
                    <h2 className="font-black text-3xl text-white mb-6 text-center text-shadow-lg">Categorías</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white rounded-lg p-2 shadow shadow-2xl ">
                        {data ? (

                            data.map((cat, idx) => (
                                <Link
                                    href={`/main/category/${cat.id}`}
                                    key={idx}
                                    className={`rounded-lg shadow-lg p-6 flex items-center justify-center text-white font-bold text-lg hover:scale-105 transition-transform duration-300`}
                                    style={{ background: `${cat.color}` }}
                                >
                                    {cat.name}
                                </Link>
                            ))


                        ) : (
                            <h2>No hay categorias Registradas</h2>

                        )}
                    </div>
                    {dataDestacada ? (
                        <section id="buscar" className="mt-16 px-5 flex w-full flex-col items-center">
                            <h2 className="font-black text-xl text-white text-shadow-lg mb-6 text-center lg:text-left">Tiendas Destacadas</h2>
                            <DestacadosCarrusel slides={dataDestacada} />
                        </section>)
                        : <h2>No hay tiendas destacadas</h2>
                    }
                </div>

                {/* ChatBot */}
                <div className="flex-1  p-6">
                    <ChatBot />
                </div>
            </section>




        </>
    );
}