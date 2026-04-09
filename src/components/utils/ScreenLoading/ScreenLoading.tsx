import Image from "next/image";
import { Spinner } from "../Spinner/Spinner";

export function ScreenLoading() {
    return (
        <div className="flex flex-col min-h-screen items-center  font-black bg-yellow-450 text-white text-shadow-2xs">
            <Image src={"/tienda.png"}
                width={250}
                height={150} alt="Logo" />
            <Spinner size={50} />
            <h2>Cargando , Por Favor Espere Un Momento...</h2>
        </div>
    )
}