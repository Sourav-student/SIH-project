"use client"
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userData from "./register_form";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    user_name: "",
    password: "",
  });

  const [submit, setSubmit] = useState(false);

  //form submittion
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmit(true);
      const res = await userData(formData);
      if (res.data.success) {
        toast.success(res.data.message);
        router.push('/login')
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
       console.log(error);
       toast.error("Fill correct information!");
    } finally {
      setFormData({
        email: "",
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
          Register to <span className="text-orange-200">JharkhandTour</span>
        </h2>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <label htmlFor="email" className="mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 rounded-md border bg-[#262626] text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </motion.div>

          {/* Username Field */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col"
          >
            <label htmlFor="userName" className="mb-1">
              Username:
            </label>
            <input
              type="text"
              id="userName"
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
          <h2>Already Register? <Link href="/login" className="text-blue-400">Login</Link></h2>
        </div>
      </div>
    </div>
  );
}
