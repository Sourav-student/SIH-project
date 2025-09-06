"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { relative } from "path";

// ✅ Marker Icon fix for Next.js
const DefaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ✅ Reverse Geocoding function
async function getLocationName(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data.display_name || "Unknown Location";
  } catch (err) {
    console.error("Geocoding error:", err);
    return "Unknown Location";
  }
}

const places = [
  { name: "Mahakaleshwar Jyotirlinga", coords: [23.1765, 75.7885] },
  { name: "Harsiddhi Temple", coords: [23.1851, 75.7775] },
  { name: "Kal Bhairav Temple", coords: [23.1825, 75.7773] },
  { name: "Mangalnath Temple", coords: [23.1702, 75.7956] },
  { name: "Ram Ghat", coords: [23.1793, 75.782] },
];

export default function Navigation() {
  const [selected, setSelected] = useState<any | null>(null);
  const [locationName, setLocationName] = useState<string>("");

  useEffect(() => {
    if (selected) {
      getLocationName(selected.coords[0], selected.coords[1]).then((name) =>
        setLocationName(name)
      );
    }
  }, [selected]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6 mx-4">
      <div className="lg:w-1/3 w-full space-y-4">
        <h1 className="text-2xl font-semibold text-teal-700 mb-3 drop-shadow">
          🛕 Temples & Ghats
        </h1>
        {places.map((place, i) => (
          <button
            key={i}
            onClick={() => setSelected(place)}
            className={`w-full p-3 rounded-xl border shadow-lg transition text-left cursor-pointer ${
              selected?.name === place.name
                ? "bg-teal-600 text-white shadow-xl"
                : "bg-white hover:bg-teal-50 text-gray-800"
            }`}
          >
            <h3 className="font-medium">{place.name}</h3>
            <p className="text-sm opacity-80">📍 Tap to view on map</p>
          </button>
        ))}
      </div>

      <div className="lg:w-2/3 w-full h-[400px] lg:h-[500px] rounded-xl shadow-2xl border overflow-hidden">
        <MapContainer
          center={[23.1765, 75.7885]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
          style={{position:"relative", zIndex : 0}}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {selected && (
            <Marker
              position={selected.coords as [number, number]}
              icon={DefaultIcon}
            >
              <Popup>
                <b>{selected.name}</b>
                <br />
                📍 {locationName || "Loading..."}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}