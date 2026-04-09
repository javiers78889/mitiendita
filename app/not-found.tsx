import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-300">
            <div className="flex flex-col items-center">
                <Image
                    src="/tienda.png"
                    alt="Logo de la tienda"
                    width={250}
                    height={150}
                    className="w-28 md:w-50 object-contain cursor-pointer "
                    priority

                />
                <h2 className="text-2xl text-center font-bold text-shadow-lg">PAGINA NO ENCONTRADA</h2>
            </div>
        </div>
    )
}