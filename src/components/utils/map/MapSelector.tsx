"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapSelectorProps } from "@/src/types/MapselectorProps";
import { LocationMarker } from "./LocationMarker";
import { useState } from "react";

export default function MapSelector({ onSelect, data }: MapSelectorProps) {
  const initialPosition = data ?? [8.9833, -79.5167]; // Panamá si no hay data
  const [position, setPosition] = useState<[number, number] | null>(data ?? null);
  const detectLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        onSelect(coords[0], coords[1]);
      },
      (err) => console.warn("Error geolocalizando", err)
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={detectLocation}
        className="mb-2 bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
      >
        Detectar ubicación
      </button>

      <MapContainer
        center={position ?? initialPosition}
        zoom={13}
        scrollWheelZoom
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker
          onSelect={(lat, lng) => {
            const coords: [number, number] = [lat, lng];
            setPosition(coords);
            onSelect(lat, lng);
          }}
          data={position ?? data}
        />
      </MapContainer>
    </div>
  );
}