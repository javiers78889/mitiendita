"use client"

import { ChatBotConsulting } from "@/action/chatbotconsulting-action"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Link from "next/link"
import { ProductosDisponibleSchemaType } from "@/src/zod"
import { Spinner } from "../Spinner/Spinner"

type FormValues = {
    input: string
}

type Message =
    | { id: number; role: "user"; type: "text"; content: string }
    | { id: number; role: "bot"; type: "text"; content: string }
    | { id: number; role: "bot"; type: "product"; content: ProductosDisponibleSchemaType }

export function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            role: "bot",
            type: "text",
            content: "Hola 👋 ¿Qué estás buscando hoy?"
        }
    ])

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors }
    } = useForm<FormValues>()

    const { mutate, isPending } = useMutation({
        mutationFn: (data: { input: string }) => ChatBotConsulting(data.input),
        onSuccess: (response) => {
            const botMessage: Message =
                typeof response === "string"
                    ? {
                          id: Date.now(),
                          role: "bot",
                          type: "text",
                          content: response
                      }
                    : {
                          id: Date.now(),
                          role: "bot",
                          type: "product",
                          content: Array.isArray(response) ? response : [response]
                      }

            setMessages((prev) => [...prev, botMessage])
        },
        onError: (error) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: "bot",
                    type: "text",
                    content: `${error.message} 😥`
                }
            ])
        }
    })

    useEffect(() => {
        if (errors.input) {
            toast.error(errors.input.message)
        }
    }, [errors])

    const onSubmit = (formData: FormValues) => {
        const text = formData.input.trim()
        if (!text) return

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                role: "user",
                type: "text",
                content: text
            }
        ])

        mutate({ input: text })
        reset()
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-950 rounded-2xl shadow-2xl flex flex-col h-[600px] overflow-hidden border border-gray-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-4 font-bold text-lg flex items-center justify-between shadow-md">
                <div className="flex flex-col">
                    <h2>Asistente ElCompa</h2>
                    <span className="text-xs font-normal text-amber-100">En línea</span>
                </div>
                <img src="/tienda.png" width={60} alt="asistente" className="rounded-full" />
            </div>

            {/* Chat */}
            <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto bg-gray-900">
                {messages.map((msg) => {
                    if (msg.role === "user") {
                        return (
                            <div
                                key={msg.id}
                                className="self-end bg-amber-500 text-black px-4 py-3 rounded-2xl rounded-br-sm max-w-[80%] shadow-md break-words"
                            >
                                {msg.content}
                            </div>
                        )
                    }

                    if (msg.type === "text") {
                        return (
                            <div
                                key={msg.id}
                                className="self-start bg-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[80%] shadow-md whitespace-pre-line"
                            >
                                {msg.content}
                            </div>
                        )
                    }

                    // msg.type === "product" y msg.content es un array
                    return (
                        <div
                            key={msg.id}
                            className="self-start bg-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] shadow-md space-y-4"
                        >
                        <h2>Hemos Encontrado esto:</h2>
                            {msg.content.map((producto) => (
                                <div key={producto.Nombre} className="space-y-2 border-b border-gray-700 pb-3">
                                    <h2 className="text-lg">
                                        Tienda: <span className="font-bold text-amber-400">{producto.Tienda}</span>
                                    </h2>

                                    <div>
                                        <img
                                            src={producto.imagen}
                                            width={150}
                                            alt={producto.Nombre}
                                            className="rounded-lg"
                                        />
                                    </div>

                                    <h2>
                                        <span className="font-bold">{producto.Nombre.toLocaleUpperCase()}</span>
                                    </h2>

                                    <p className="text-sm text-gray-300">{producto.Descripcion}</p>
                                    <p className="text-sm text-gray-300">Provincia: {producto.Provincia}</p>
                                    <p className="text-sm text-gray-300">Distrito: {producto.Distrito}</p>

                                    <h2 className="font-bold">Cantidad disponible: {producto.Cantidad}</h2>

                                    <div className="overflow-hidden rounded-xl border border-gray-700">
                                        <iframe
                                            width="100%"
                                            height="220"
                                            loading="lazy"
                                            src={producto.Googlemaps}
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row text-center gap-2 justify-center">
                                        <Link
                                            href={producto.Enlace}
                                            target="_blank"
                                            className="inline-block px-4 py-2 bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition"
                                        >
                                            Ver tienda
                                        </Link>
                                        <Link
                                            href={`https://www.google.com/maps/search/?api=1&query=${producto.Latitud},${producto.Longitud}`}
                                            target="_blank"
                                            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-400 transition"
                                        >
                                            Abrir Maps
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                })}

                {/* Escribiendo */}
                {isPending && (
                    <div className="self-start bg-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[60%] shadow-md">
                        <div className="flex items-center gap-2">
                            <span>Buscando...</span>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 flex gap-2 bg-gray-950 border-t border-gray-800 flex-col md:flex-row"
            >
                <input
                    type="text"
                    disabled={isPending}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-4 py-3 rounded-full bg-gray-800 text-white outline-none focus:ring-2 focus:ring-amber-500 transition"
                    {...register("input", {
                        required: "Es necesario escribir algo para poder buscar"
                    })}
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-black px-5 py-3 rounded-full transition font-bold cursor-pointer"
                >
                    {isPending ? <Spinner size={20} /> : <>➤</>}
                </button>
            </form>
        </div>
    )
}