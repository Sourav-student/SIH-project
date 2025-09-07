"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "@/Context/LoginContext";
import { useRouter } from "next/navigation";

type GalleryType = {
  image: string;
  privacy: string;
  _id: string;
};

export default function Galary() {
  const router = useRouter();
  const [showAddImg, setShowAddImg] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [privacy, setPrivacy] = useState("Private");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [galary, setGalary] = useState<GalleryType[]>([]);
  // const [myGalary, setmyGalary] = useState<GalleryType[]>([]);

  const { user } = useAppContext();

  const handleSubmit = async () => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.warning("Uploaded file must be under 10MB!");
      return;
    }
    const user_name = localStorage.getItem("user-name") || "sourav_123";
    setIsSubmit(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("privacy", privacy);
    formData.append("user_name", user_name);

    try {
      const res = await axios.post("/api/galary", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Uploaded successfully");
      } else {
        toast.error("Not Uploaded!");
      }
    } catch {
      toast.error("Not Uploaded!");
    } finally {
      setShowAddImg(false);
      setIsSubmit(false);
      setIsloading(true);
    }
  };

  //Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get("/api/galary");
      const data = await res.data;
      if (data.success) {
        setGalary(
          data.images.filter((item: GalleryType) => item.privacy === "Public")
        );
        setIsloading(false);
        // setmyGalary(data.images);
      }
    };
    fetchImages();
  }, [isloading]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-teal-800">📸 Gallery</h1>
          <button
            onClick={() => {
              if (!user) {
                router.push("/login");
                return;
              }
              setShowAddImg((prev) => !prev);
            }}
            className="px-6 py-2 bg-orange-600 text-white rounded-xl shadow hover:bg-orange-700 transition cursor-pointer"
          >
            {showAddImg ? "✖ Close" : "➕ Add Image"}
          </button>
        </div>

        {/* Upload Form */}
        {showAddImg && (
          <div className="flex justify-center mb-10">
            <div className="p-6 shadow-lg rounded-2xl w-96 border border-gray-200 bg-white">
              <h2 className="text-lg font-semibold text-teal-800 mb-4">
                📤 Upload Image
              </h2>

              {/* Image Upload */}
              <div className="flex flex-col mb-4">
                <label htmlFor="file" className="text-teal-700 font-medium mb-1">
                  Image <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="file"
                  className="border p-2 rounded-xl cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>

              {/* Privacy Dropdown */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="privacy"
                  className="text-teal-700 font-medium mb-1"
                >
                  Privacy <span className="text-red-600">*</span>
                </label>
                <select
                  name="privacy"
                  value={privacy}
                  className="border p-2 rounded-xl cursor-pointer text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  onChange={(e) => setPrivacy(e.target.value)}
                  required
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-300 shadow-md cursor-pointer ${
                  isSubmit
                    ? "bg-gray-400 text-black"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
                disabled={isSubmit}
                onClick={handleSubmit}
              >
                {isSubmit ? "Adding..." : "Upload"}
              </button>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isloading ? (
            <div className="flex items-center justify-center col-span-full h-40 space-x-3">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-600 border-solid"></div>
              <span className="text-teal-700 font-medium text-lg">
                Loading...
              </span>
            </div>
          ) : galary.length > 0 ? (
            galary.map((content) => (
              <div
                key={content._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Image
                  src={content.image}
                  alt={content.privacy}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                {/* <div className="p-4 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      content.privacy === "Public"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {content.privacy}
                  </span>
                </div> */}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No images found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}