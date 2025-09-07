'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

type UserData = {
  name: string;
  email: string;
  phone: string;
  image: string;
};

export default function Profile() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    image: "",
  });
  const [editMode, setEditMode] = useState(false);

  //User info from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user-profile");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const firstLetter = userData.name
    ? userData.name.charAt(0).toUpperCase()
    : "U";

  // Save to localStorage
  const handleSave = () => {
    localStorage.setItem("user-profile", JSON.stringify(userData));
    setEditMode(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6">
        <div className="flex flex-col items-center">
          {userData.image ? (
            <Image
              src={userData.image}
              alt="Profile"
              width={250}
              height={250}
              className="w-20 h-20 rounded-full object-cover shadow-md border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {firstLetter}
            </div>
          )}
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {userData.name || "Your Name"}
          </h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-3 px-5 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition cursor-pointer"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>


        {/* this is a edit mode section */}
        {editMode && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        )}

        {/* when no edit mode then shown  */}
        {!editMode && (
          <div className="mt-6 space-y-3 text-gray-700">
            <p>
              <span className="font-medium">📧 Email:</span>{" "}
              {userData.email || "Not set"}
            </p>
            <p>
              <span className="font-medium">📱 Phone:</span>{" "}
              {userData.phone || "Not set"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}