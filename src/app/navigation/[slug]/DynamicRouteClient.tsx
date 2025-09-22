"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Context/LoginContext";

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
  crowd: "Low" | "Medium" | "High";
  info: PlaceInfo;
};

export default function DynamicRouteClient({ query }: { query?: string }) {
  const router = useRouter();
  const { user } = useAppContext();

  const [place, setPlace] = useState<PlaceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReview, setIsReview] = useState(false);
  const [review, setReview] = useState("");

  // Fetch place data
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get("/api/places");
        if (res.data.success) {
          const filtered = query
            ? res.data.places.find((p: PlaceType) => p._id === query)
            : res.data.places[0];
          setPlace(filtered || null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [query]);

  // Add review handler
  const handleAddReview = async () => {
    if (!review.trim() || !place) return;

    setLoading(true);
    try {
      const res = await axios.patch("/api/places", {
        id: place._id,
        info: { feedbacks: [review] }
      });


      if (res.data.success) {
        setPlace((prev) =>
          prev
            ? {
              ...prev,
              info: {
                ...prev.info,
                feedbacks: [...prev.info.feedbacks, review],
              },
            }
            : prev
        );
        setReview("");
        setIsReview(false);
      }
    } catch (err) {
      console.error("Failed to add review:", err);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h1 className="text-xl font-semibold text-orange-700 animate-pulse">Loading...</h1>
      </div>
    );
  }

  if (!place) {
    return <p className="text-center mt-10 text-red-600">Place not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <div className="flex justify-between px-4 items-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">{place.name}</h1>
        <button
          className="px-3 py-1 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-colors cursor-pointer"
          onClick={() => openInMaps(place.name)}>
          Redirect to map
        </button>
      </div>
      <p className="mb-4 text-gray-700">{place.info.placeInfo}</p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded-lg bg-orange-50">
          <h2 className="font-semibold text-orange-600 mb-2">Crowd Level</h2>
          <p
            className={`font-bold ${place.crowd === "Low"
              ? "text-green-600"
              : place.crowd === "High"
                ? "text-red-600"
                : "text-yellow-600"
              }`}
          >
            {place.crowd}
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-orange-50">
          <h2 className="font-semibold text-orange-600 mb-2">Temperature</h2>
          <p>{place.info.temperature}</p>
        </div>

        <div className="p-4 border rounded-lg bg-orange-50">
          <h2 className="font-semibold text-orange-600 mb-2">Air Quality (AQI)</h2>
          <p>{place.info.aqi}</p>
        </div>
      </div>

      {/* Hospitals */}
      <div className="mb-6">
        <h2 className="font-semibold text-orange-600 mb-2">Hospitals</h2>
        <ul className="list-disc list-inside">
          {place.info.hospitals.map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      </div>

      {/* Hotels */}
      <div className="mb-6">
        <h2 className="font-semibold text-orange-600 mb-2">Hotels</h2>
        <ul className="list-disc list-inside">
          {place.info.hotels.map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="mb-6">
        <h2 className="font-semibold text-orange-600 mb-2">Reviews</h2>
        {place.info.feedbacks.length === 0 ? (
          <p className="text-gray-500 mb-2">No reviews yet.</p>
        ) : (
          <ul className="list-disc list-inside mb-2">
            {place.info.feedbacks.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        )}

        {/* Add Review Button */}
        {!isReview && (
          <button
            className="px-3 py-1 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors cursor-pointer mt-2"
            onClick={() => {
              if (!user) {
                router.push("/login");
                return;
              }
              setIsReview(true);
            }}
          >
            Add Review
          </button>
        )}

        {/* Review Form */}
        {isReview && (
          <div className="mt-4 p-4 border rounded-lg bg-orange-50 shadow-sm">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddReview}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-semibold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
              <button
                onClick={() => setIsReview(false)}
                className="px-4 py-2 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}