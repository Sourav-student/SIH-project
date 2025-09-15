"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Context/LoginContext";
import axios from "axios";
import Image from "next/image";

type UserData = {
  user_name: string;
  name: string;
  phone_no: string;
  image: string;
  email?: string;
};

export default function Profile() {
  const router = useRouter();
  const { setUser } = useAppContext();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newUserData, setNewUserData] = useState<UserData>({
    user_name: "",
    name: "",
    phone_no: "",
    image: "",
  });
  const [file, setFile] = useState<File | null>(null);

  // Load profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = localStorage.getItem("user-name");
        if (!stored) return;

        const user_name = JSON.parse(stored);
        const res = await axios.get(`/api/user`, { params: { user_name } });

        if (res.data?.data) setUserData(res.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load profile");
      }
    };

    fetchUser();
  }, []);

  // Prepare form data when entering edit mode
  useEffect(() => {
    if (editMode && userData) {
      setNewUserData({
        user_name: userData.user_name,
        name: userData.name,
        phone_no: userData.phone_no,
        image: userData.image,
      });
    }
  }, [editMode, userData]);

  const handleLogout = () => {
    localStorage.removeItem("user-name");
    localStorage.removeItem("profile-data");
    setUser(false);
    router.push("/");
    toast.success("Logout successfully!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () =>
        setNewUserData({ ...newUserData, image: reader.result as string });
      reader.readAsDataURL(selected);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.user_name) return;

    const formData = new FormData();
    formData.append("user_name", newUserData.user_name);
    formData.append("name", newUserData.name);
    formData.append("phone_no", newUserData.phone_no);
    if (file) formData.append("file", file);

    try {
      const res = await axios.patch("/api/user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.data) {
        setUserData(res.data.data);
        localStorage.setItem("profile-data", JSON.stringify(res.data.data));
      }

      toast.success("Profile updated!");
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-orange-700 text-lg">Loading profile...</p>
      </div>
    );
  }

  const firstLetter = userData.user_name
    ? userData.user_name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen font-serif bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
        {/* Avatar */}
        {userData.image ? (
          <Image
            src={userData.image}
            alt="Profile"
            width={96}
            height={96}
            className="w-24 h-24 mx-auto rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-orange-500 to-orange-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {firstLetter}
          </div>
        )}

        {/* Name */}
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {userData.user_name || "Your Name"}
        </h1>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            className="w-full py-2.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 cursor-pointer transition"
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
          <button
            className="w-full py-2.5 bg-white text-orange-700 font-semibold border border-orange-300 rounded-lg hover:bg-orange-50 transition cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Edit Mode */}
        {editMode && (
          <form onSubmit={handleSave} className="mt-8 space-y-4 text-left">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={newUserData.name ?? ""}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, name: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Phone No.
              </label>
              <input
                type="tel"
                value={newUserData.phone_no?? ""}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, phone_no: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save
            </button>
          </form>
        )}

        {/* View Mode */}
        {!editMode && (
          <div className="mt-8 space-y-4 text-left">
            {/* <div className="bg-orange-100 rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-gray-700">📧 Email</p>
              <p className="text-gray-800">{userData.email || "Not set"}</p>
            </div> */}
            <div className="bg-orange-100 rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-gray-700">📱 Phone</p>
              <p className="text-gray-800">{userData.phone_no || "Not set"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}