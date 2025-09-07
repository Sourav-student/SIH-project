"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Place {
  name: string;
  coords: [number, number];
}

const places: Place[] = [
  { name: "Mahakaleshwar Jyotirlinga", coords: [23.1765, 75.7885] },
  { name: "Harsiddhi Temple", coords: [23.1851, 75.7775] },
  { name: "Kal Bhairav Temple", coords: [23.1825, 75.7773] },
  { name: "Mangalnath Temple", coords: [23.1702, 75.7956] },
  { name: "Ram Ghat", coords: [23.1793, 75.782] },
];

export default function Navigation() {

  return (
    <div className="flex gap-6 mt-6 mx-4">
      <div className="w-full space-y-4 flex flex-wrap gap-5">
        <h1 className="text-2xl font-semibold text-teal-700 mb-3 drop-shadow">
          🛕 Temples & Ghats
        </h1>
        {places.map((place, i) => (
          <button
            key={i}
            className="w-fit m-5 p-3 rounded-xl border shadow-lg transition text-left cursor-pointer bg-white hover:bg-teal-50 text-gray-800"
          >
            <h3 className="font-medium">{place.name}</h3>
            <p className="text-sm opacity-80">📍 Tap to view on map</p>
          </button>
        ))}
      </div>
    </div>
  );
}