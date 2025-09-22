"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAppContext } from "@/Context/LoginContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type PlaceInfo = {
  placeInfo: string;
  hospitals: string[];
  hotels: string[];
  feedbacks: string[];
  temperature: string;
  aqi: string;
};

type PlaceType = {
  _id: string;
  name: string;
  crowd: "Low" | "High" | "Medium";
  info: PlaceInfo;
};

export default function Navigation() {
  const router = useRouter();
  const { user, userType } = useAppContext();
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [addPlaceInfo, setAddPlace] = useState(false);

  // Form state
  const [newPlace, setNewPlace] = useState("");
  const [crowd, setCrowd] = useState<"Low" | "High" | "Medium">("Low");
  const [info, setInfo] = useState<PlaceInfo>({
    placeInfo: "",
    hospitals: [],
    hotels: [],
    feedbacks: [],
    temperature: "",
    aqi: "",
  });

  //fatch data
  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await axios.get("/api/places");
      if (res.data.success) setPlaces(res.data.places);
      setLoading(false);
    };
    fetchPlaces();
  }, []);

  const handleArrayInput = (value: string, field: keyof PlaceInfo) => {
    const arr = value.split(",").map((v) => v.trim()).filter(Boolean);
    setInfo((prev) => ({ ...prev, [field]: arr }));
  };

  const addPlace = async () => {
    if (!newPlace.trim()) return;

    try {
      const res = await axios.post("/api/places", {
        name: newPlace,
        crowd,
        info,
      });

      if (res.data.success) {
        setPlaces((prev) => [...prev, res.data.place]);
        setNewPlace("");
        setCrowd("Low");
        setInfo({
          placeInfo: "",
          hospitals: [],
          hotels: [],
          feedbacks: [],
          temperature: "",
          aqi: "",
        });
        setAddPlace(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openInMaps = async (placeName: string) => {
    try {
      const res = await axios.post("/api/maps", { name: placeName });
      if (res.data.success) window.open(res.data.url, "_blank");
    } catch (err) {
      console.error("Google Maps error:", err);
    }
  };

  //delete request
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete("/api/places", { data: { id } });
      if(res){
        toast.success(res.data.message);
        setPlaces(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Cannot delete!!");
    }
  };


  if (loading) return <p className="text-center mt-10">Loading places...</p>;

  return (
    <div className="mt-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-stone-700">Locations must visit</h1>
        {userType === "admin" && (
          <button
            className="bg-teal-400 text-stone-900 p-3.5 py-2 rounded-2xl cursor-pointer font-semibold"
            onClick={() => {
              if (!user) {
                router.push("/login");
                return;
              }
              setAddPlace((prev) => !prev);
            }}
          >
            {!addPlaceInfo ? "➕ Add Place" : "Close"}
          </button>
        )}
      </div>

      {userType === "admin" && addPlaceInfo && (
        <div className="mb-6 p-5 bg-white rounded-xl shadow-md flex flex-col gap-3">
          <input
            type="text"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
            placeholder="Place name"
            className="border px-3 py-2 rounded-lg focus:ring-2"
          />
          <select
            value={crowd}
            onChange={(e) => setCrowd(e.target.value as "Low" | "High" | "Medium")}
            className="border px-3 py-2 rounded-lg focus:ring-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <textarea
            value={info.placeInfo}
            onChange={(e) => setInfo((prev) => ({ ...prev, placeInfo: e.target.value }))}
            placeholder="Place description"
            className="border px-3 py-2 rounded-lg focus:ring-2"
          />
          <input
            type="text"
            placeholder="Hospitals (comma separated)"
            onChange={(e) => handleArrayInput(e.target.value, "hospitals")}
            className="border px-3 py-2 rounded-lg focus:ring-2"
          />
          <input
            type="text"
            placeholder="Hotels (comma separated)"
            onChange={(e) => handleArrayInput(e.target.value, "hotels")}
            className="border px-3 py-2 rounded-lg focus:ring-2"
          />
          <input
            type="text"
            placeholder="Feedbacks (comma separated)"
            onChange={(e) => handleArrayInput(e.target.value, "feedbacks")}
            className="border px-3 py-2 rounded-lg focus:ring-2"
          />
          <input
            type="text"
            value={info.temperature}
            onChange={(e) => setInfo((prev) => ({ ...prev, temperature: e.target.value }))}
            placeholder="Temperature"
            className="border px-3 py-2 rounded-lg focus:ring-2"
          />
          <input
            type="text"
            value={info.aqi}
            onChange={(e) => setInfo((prev) => ({ ...prev, aqi: e.target.value }))}
            placeholder="AQI"
            className="border px-3 py-2 rounded-lg focus:ring-2"
          />
          <button
            onClick={addPlace}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
          >
            ➕ Add Place
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {places.map((place) => (
          <div
            key={place._id}
            className="flex flex-col justify-center items-center p-5 rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 text-left"
          >
            <h3
              className="text-xl font-bold cursor-pointer text-orange-600 hover:text-orange-500 transition-colors"
              onClick={() => openInMaps(place.name)}
            >
              {place.name}
            </h3>
            <p
              className={`text-lg font-semibold mt-2 ${place.crowd === "Low"
                ? "text-green-600"
                : place.crowd === "High"
                  ? "text-red-600"
                  : "text-yellow-600"
                }`}
            >
              Crowd: {place.crowd}
            </p>
            <Link
              href={`/navigation/${place.name}?q=${place._id}`}
              className="mt-3 py-1 px-2 bg-amber-600 text-white rounded-lg cursor-pointer"
            >
              Learn more
            </Link>
            {
              userType === "admin" && (
                <div className="flex justify-center gap-4 mt-4">
                  {/* <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Edit
                  </button> */}
                  <button
                    className="px-2 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors cursor-pointer"
                    onClick={() => handleDelete(place._id)}
                  >
                    Delete
                  </button>
                </div>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}