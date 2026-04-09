import { MapSelectorProps } from "@/src/types/MapselectorProps";
import { useEffect, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";


const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function LocationMarker({ onSelect, data }: MapSelectorProps) {

  const map = useMap();

  // Si data cambia, movemos el mapa a esa posición
  useEffect(() => {
    if (data) {
      map.setView(data, 15); // mover el mapa
    }
  }, [data]);

  // 🟩 Detectar clic manual
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
    
      onSelect(lat, lng);
    },
  });

  return data ? <Marker position={data} icon={markerIcon} /> : null;
}