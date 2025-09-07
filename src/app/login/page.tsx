"use client"
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { useState } from "react";
import loginData from "./login_form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Context/LoginContext";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const { setUser } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const res = await loginData(formData);
      if (res.data.success) {
        localStorage.setItem("user-name", JSON.stringify(res.data.user_info.user_name));
        router.push('/');
        toast.success(res.data.message);
        setUser(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Fill correct information!");
    } finally {
      setFormData({
        user_name: "",
        password: "",
      })
      setSubmit(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div
        className="bg-[#181818bd] backdrop-blur-lg shadow-[0_0_20px_4px_rgba(255,118,232,0.3)] rounded-2xl text-white p-8 w-full max-w-md flex flex-col gap-6">
        <form
          className="w-full max-w-md flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Login to <span className="text-orange-200">Ujjain Kumbh 2028</span>
          </h2>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <label htmlFor="email" className="mb-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="user_name"
              required
              placeholder="Enter your username..."
              value={formData.user_name}
              onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
              className="p-3 rounded-md border bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col"
          >
            <label htmlFor="password" className="mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password..."
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="p-3 rounded-md border bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200 cursor-pointer"
            disabled={submit}
          >
            {submit ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
        <div>
          <h2>Not Register? <Link href="/register" className="text-blue-400">Register</Link></h2>
        </div>
      </div>
    </div>
  );
}
