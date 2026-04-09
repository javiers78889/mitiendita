"use client";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";


export default function Modal({ children, placeholder, action, estilos, ispending, botonEstilos, botonTexto, hiddenbutton, personalizado, setModa }: { children: React.ReactNode, placeholder: string, action?: () => void, estilos?: string, ispending?: boolean, botonEstilos?: string, botonTexto?: string, hiddenbutton?: boolean, personalizado?: boolean, setModa?: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof personalizado === "boolean") {

            setOpen(personalizado)

        }
    }, [personalizado])
    return (
        <div className="text-gray-700 dark:text-white">
            {/* Botón para abrir */}
            <button
                onClick={() => setOpen(true)}
                hidden={hiddenbutton}
                className={estilos ? (`${estilos} cursor-pointer transition-colors`) : "px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700  cursor-pointer transition-colors"}
            >
                {placeholder}
            </button>

            {/* Fondo oscuro */}
            {open && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    {/* Contenedor del modal */}
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-md transform scale-95 animate-fadeIn">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {placeholder}
                            </h2>

                        </div>

                        {/* Formulario */}
                        <form className="space-y-4 overflow-y-auto h-130 md:h-200" onSubmit={action}>

                            {children}
                            {/* Botones */}

                            {ispending ? (

                                <Spinner size={10} />
                            ) : (

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => { setOpen(false), setModa?.(false) }}
                                        className="px-4 py-2 rounded-lg bg-gray-200 cursor-pointer dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        hidden={hiddenbutton}
                                        className={botonEstilos ?? "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"}
                                    >
                                        {botonTexto ?? "Guardar"}
                                    </button>
                                </div>

                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}