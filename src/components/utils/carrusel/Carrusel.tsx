"use client"

import { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { AnunciosPubListType } from "@/src/zod"




export default function Carrusel({ slides }: { slides: AnunciosPubListType }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    )
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaApi.on("select", onSelect)
        onSelect()
        return () => void emblaApi.off("select", onSelect)
    }, [emblaApi])

    return (
        <>
            <div className="w-full md:h-[25vh] h-[55vh] ">
                <div className="relative md:absolute md:inset-0 h-110 z-10">
                    {/* Carrusel */}
                    <div className="embla h-full overflow-hidden rounded-b-xl" ref={emblaRef}>
                        <div className="embla__container flex h-full">
                            {slides.map((slide) => (
                                <div key={slide.id} className="embla__slide flex-[0_0_100%] h-full relative">
                                    <img
                                        src={slide.image}
                                        alt={slide.name ?? `Slide ${slide.id + 1}`}

                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay negro con opacidad */}
                                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flecha izquierda */}
                    <button
                        aria-label="Anterior"
                        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:bg-black/90 transition"
                        onClick={() => emblaApi?.scrollPrev()}
                    >
                        ←
                    </button>

                    {/* Flecha derecha */}
                    <button
                        aria-label="Siguiente"
                        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:bg-black/90 transition"
                        onClick={() => emblaApi?.scrollNext()}
                    >
                        →
                    </button>

                    {/* Dots (opcional) */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                aria-label={`Ir a slide ${index + 1}`}
                                className={`w-4 h-4 rounded-full transition-colors ${selectedIndex === index ? "bg-white" : "bg-white/50"
                                    }`}
                                onClick={() => emblaApi?.scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="xl:absolute top-72 left-4 z-20  text-xl md:text-3xl text-shadow-2xl font-bold px-3 py-1  rounded-lg bg-white  xl:bg-transparent">
                {slides[selectedIndex]?.name && (
                    <div className="flex flex-col gap-2 ">
                        <h2 className={`${slides[selectedIndex].name} xl:text-white text-shadow-2xl`}>{slides[selectedIndex].name}</h2>
                        <div className="bg-amber-400 rounded-lg w-fit px-2 shadow-2xl">
                            <h2 className="text-sm ">{slides[selectedIndex].store.name}</h2>
                        </div>
                        <img src={slides[selectedIndex].store.image} alt="" width={50} className="rounded-full hidden md:block" />
                    </div>
                )}
            </div>
        </>
    )
}