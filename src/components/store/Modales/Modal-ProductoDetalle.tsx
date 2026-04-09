"use client"

import Link from "next/link";
import Modal from "../../utils/modals/Modal";
import IonIcon from "@reacticons/ionicons";
import { useState } from "react";
import { productoDetalleType } from "@/src/zod";

export function ModalProductoDetalle({ open, setOpen, n, telefono }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, n: productoDetalleType, telefono: string }) {
    const [show, setShow] = useState(true)


    return (
        <>

            <Modal placeholder={n.name} hiddenbutton={true} personalizado={open} setModa={setOpen} >
                <div className="flex flex-col gap-10">
                    <div>
                        <div>
                            <img
                                alt="Imagen de producto"
                                src={n.image}
                            />
                        </div>
                        <div className="flex flex-col gap-5">
                            <div>
                                <h2 className="font-bold text-xl">Descripcion</h2>
                            </div>
                            <div>
                                <p>{n.description}</p>
                            </div>
                            <p className="font-black text-lg">Cantidad Disponibles:  {n.quantity}</p>
                        </div>
                    </div>
                    <div>
                        <Link className="bg-blue-500 px-5 py-2 rounded-lg cursor-pointer hover:bg-green-500 flex gap-2 w-fit items-center" href={`https://wa.me/507${telefono?.replace("-", "")}?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20su%20${n.name}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                            Lo quiero
                            <div hidden={!show}>
                                <IonIcon name="logo-whatsapp" />
                            </div>
                        </Link>
                    </div>
                </div>
            </Modal>

        </>
    )
}