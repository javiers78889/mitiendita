"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DestacadosArrayType } from "@/src/zod";
import Link from "next/link";

export default function DestacadosCarrusel({ slides }: { slides: DestacadosArrayType }) {
    const autoplay = Autoplay({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
    });

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
        },
        [autoplay]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative w-full group">
            {/* Carrusel */}
            <div className="w-full overflow-x-auto py-4">
                <div className="flex gap-4 px-4 justify-center">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className="flex flex-col items-center min-w-[80px] cursor-pointer"
                        >
                            {/* Imagen circular */}
                            <Link href={`http://localhost:3000/main/store/${slide.store.id}`} className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md hover:scale-105 transition">
                                <img
                                    src={slide.store.image}
                                    alt={slide.store.name ?? `Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}