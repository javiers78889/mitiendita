"use client";

import Image from "next/image";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col md:grid md:grid-cols-2">

            {/* LOGO */}
            <div className="flex flex-col items-center justify-center  p-6 md:p-10" style={{ backgroundImage: "url('/carrito.jpg')", backgroundRepeat: "no-repeat",backgroundSize: "cover",}}>
                <Image
                    src="/tienda.png"
                    alt="Logo"
                    width={550}
                    height={250}
                    className="object-contain w-48 md:w-80"
                />
                <h1 className="text-2xl font-bold text-white text-shadow-lg">"Todo Lo que necesitas en un solo lugar"</h1>
            </div>

            {/* FORM / CONTENIDO */}
            <div className="flex items-center justify-center bg-white p-6 md:p-10">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}