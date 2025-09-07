"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/Context/LoginContext";
import { useRouter } from "next/navigation";

type PlaceType = {
  _id: string;
  name: string;
  crowd: "Low" | "High" | "Medium";
};

export default function Navigation() {
  const router = useRouter();
  const { user } = useAppContext();
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPlace, setNewPlace] = useState("");
  const [crowd, setCrowd] = useState<"Low" | "High" | "Medium">("Low");
  const [addPlaceInfo, setAddPlace] = useState(false);

  // Fetch places
  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await axios.get("/api/places");
      if (res.data.success) {
        setPlaces(res.data.places);
      }
      setLoading(false);
    };
    fetchPlaces();
  }, []);

  // Add new place
  const addPlace = async () => {
    if (!newPlace.trim()) return;
    const res = await axios.post("/api/places", { name: newPlace, crowd });
    if (res.data.success) {
      setPlaces((prev) => [...prev, res.data.place]);
      setNewPlace("");
      setCrowd("Low");
    }
  };

  // Update crowd status
  const updateCrowd = async (id: string, newCrowd: "Low" | "High" | "Medium") => {
    await axios.put("/api/places", { id, crowd: newCrowd });
    setPlaces((prev) =>
      prev.map((p) => (p._id === id ? { ...p, crowd: newCrowd } : p))
    );
  };

  //map call from backend
  const openInMaps = async (placeName: string) => {
    try {
      const res = await axios.post("/api/maps", { name: placeName });
      if (res.data.success) {
        window.open(res.data.url, "_blank");
      }
    } catch (err) {
      console.error("Google Maps error:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading places...</p>;

  return (
    <div className="mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-stone-700">
          Locations must visit
        </h1>
        <button
          className="bg-teal-400 text-stone-900 p-3.5 py-2 rounded-2xl cursor-pointer font-semibold"
          onClick={() => {
            if(!user){
              router.push('/login');
              return;
            }
            setAddPlace(prev => !prev);
          }}>
          {!addPlaceInfo ? "Add Place" : "Close"}
        </button>
      </div>
      
      <div className="w-full max-w-5xl">
        {/* Add Place Form */}
        {addPlaceInfo && <div className="mb-6 p-5 bg-white rounded-xl shadow-md flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
            placeholder="Enter place name"
            className="flex-1 border px-3 py-2 rounded-lg focus:ring-2"
          />
          <select
            value={crowd}
            onChange={(e) => setCrowd(e.target.value as "Low" | "High" | "Medium")}
            className="border px-3 py-2 rounded-lg focus:ring-2"
          >
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
          <button
            onClick={addPlace}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
          >
            ➕ Add Place
          </button>
        </div>}

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {places.map((place) => (
            <div
              key={place._id}
              className="p-5 rounded-xl border bg-white shadow-md hover:shadow-lg transition text-left"
            >
              <h3
                className="text-lg font-semibold cursor-pointer"
                onClick={() => openInMaps(place.name)}>{place.name}</h3>
              <p
                className={`text-sm font-medium mt-2 ${place.crowd === "Low" ? "text-green-600" : (place.crowd === "High" ? "text-red-600" : "text-orange-600")
                  }`}
              >
                Crowd: {place.crowd}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    if(!user){
                      router.push('/login');
                      return;
                    }
                    updateCrowd(place._id, "Low")
                  }}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 cursor-pointer"
                >
                  Set Low
                </button>
                <button
                  onClick={() => {
                    if(!user){
                      router.push('/login');
                      return;
                    }
                    updateCrowd(place._id, "High")
                  }}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 cursor-pointer"
                >
                  Set High
                </button>
                <button
                  onClick={() => {
                    if(!user){
                      router.push('/login');
                      return;
                    }
                    updateCrowd(place._id, "Medium");
                  }}
                  className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 cursor-pointer"
                >
                  Set Medium
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}