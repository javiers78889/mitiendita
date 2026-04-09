"use client";

import { Logout } from "@/action/logout-action";
import { Spinner } from "@/src/components/utils/Spinner/Spinner";
import { dalValidate } from "@/src/dal/dalValidate";
import IonIcon from "@reacticons/ionicons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const navigate = useRouter()
    const [active, SetActive] = useState(false)
    const [showDate, setShowDate] = useState(true);
    const date = new Date()
    const today = date.getFullYear()
    const [fulldate, setFulldate] = useState("");
    const { isLoading, isError } = useQuery({
        queryKey: ["validartoken"],
        queryFn: () => dalValidate(),
    })

    useEffect(() => {
        if (isError) {
            toast.error("No Autorizado")
            navigate.push("/auth/login")
        }
    }, [isError, navigate])


    useEffect(() => {

        const updateDate = () => {
            const date = new Date();
            const formatted = date.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hourCycle: "h11",
            });
            setFulldate(formatted);
        };

        updateDate(); // Actualiza inmediatamente al montar

        const interval = setInterval(updateDate, 1000); // Actualiza cada 1 segundo

        return () => clearInterval(interval); // Limpia el interval al desmontar
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowDate(false);
            } else {
                setShowDate(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const LogoutSession = async () => {
        await Logout()
        navigate.push("/auth/login")
    }

    if (isLoading) return (
        <div className="flex flex-col h-screen items-center justify-center font-black bg-amber-400 text-white text-shadow-2xs">
            <Image src={"/tienda.png"}
                width={250}
                height={150} alt="Logo" />
            <Spinner size={50} />
            <h2>Validando Datos, espere un momento...</h2>
        </div>)
    return (
        <div className="min-h-screen bg-yellow-400 flex flex-col items-center dark:text-black">

            {/* LOGO */}
            <header className={`flex flex-row-reverse  items-center justify-between w-full sticky top-0 z-50 transition-all duration-300 ${showDate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"} `}>
                <div className="flex flex-col items-end justify-center py-6 md:py-10 w-full ">
                    <div className="relative flex flex-col items-center">
                        <Image
                            src="/tienda.png"
                            alt="Logo de la tienda"
                            width={250}
                            height={150}
                            className="w-28 md:w-50 object-contain cursor-pointer  "
                            priority
                            onClick={() => SetActive(!active)}
                        />

                        {active ? (
                            <nav className="absolute flex bg-white rounded-full shadow-lg flex-col gap-2 top-full mt-2  p-4   transition">
                                <div className=" rounded-full px-2 py-3 text-center">
                                    <Link href={''} className="flex justify-center text-green-600 cursor-pointer hover:bg-gray-200 hover:rounded-full"><IonIcon name="logo-whatsapp" size="large" /></Link>
                                    <span className="text-sm">
                                        Support
                                    </span>
                                </div>
                                <div className="flex items-center flex-col justify-center text-center rounded-full px-2 py-3">
                                    <button onClick={LogoutSession} className="flex justify-center text-red-600 cursor-pointer hover:bg-gray-200 hover:rounded-full"><IonIcon name="exit-outline" size="large" /></button>
                                    <span className="text-sm">
                                        Exit
                                    </span>
                                </div>
                            </nav>
                        ) : ("")}

                    </div>
                </div>
                <div className=" mx-5 w-full">
                    <div className="">
                        <h2 className="font-black text-shadow-lg">

                            {fulldate}
                        </h2>
                    </div>
                </div>

            </header>

            {/* CONTENIDO */}
            <main className="  w-full  px-4  min-h-screen">
                {children}
            </main>
            <footer className="border border-white w-full text-shadow-lg">
                <div className="flex flex-col items-center justify-center">
                    <Image
                        src="/tienda.png"
                        alt="Logo de la tienda"
                        width={250}
                        height={150}
                        className="w-28 md:w-50 object-contain cursor-pointer "
                        priority

                    />
                    <h3 className="text-sm">Mi Tiendita , Todos los Derechos Reservados</h3>
                    <h3 className="text-sm font-black">{today}</h3>
                </div>
            </footer>

        </div>
    );
}