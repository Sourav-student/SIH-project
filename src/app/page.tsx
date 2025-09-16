"use client";

import Link from "next/link";
import { MapPin, Book, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/kumbh-bg.jpg')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <span className="text-4xl">🏛️</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            >
              Jharkhand Tourism 
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg sm:text-xl mb-6 text-orange-100 max-w-2xl mx-auto"
            >
              Your Complete Digital Guide to the Sacred Journey
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Experience the spiritual magnificence of Jharkhand with our
              comprehensive digital guide. Navigate with ease, explore sacred
              rituals, and discover local treasures.
            </motion.p>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/galary"
                className="inline-block bg-gradient-to-r from-white to-orange-100 text-orange-700 px-8 py-3 rounded-lg font-semibold text-lg shadow hover:shadow-xl transition"
              >
                Start Your Journey
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
          Explore Kumbh Mela
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              href: "/navigation",
              icon: <MapPin className="w-8 h-8 text-orange-600" />,
              title: "Navigation & Maps",
              desc: "Find your way with interactive maps and location guides",
            },
            {
              href: "/rituals",
              icon: <Book className="w-8 h-8 text-orange-600" />,
              title: "Rituals & Heritage",
              desc: "Learn about sacred ceremonies and cultural traditions",
            },
            {
              href: "/marketplace",
              icon: <ShoppingBag className="w-8 h-8 text-orange-600" />,
              title: "Local Marketplace",
              desc: "Discover authentic religious items and local crafts",
            },
            {
              href: "/cleanliness",
              icon: <Trash2 className="w-8 h-8 text-orange-600" />,
              title: "Cleanliness Initiative",
              desc: "Join our mission to keep the sacred grounds clean",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={item.href}
                className="block bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { number: "50M+", label: "Expected Visitors" },
              { number: "12", label: "Sacred Bathing Days" },
              { number: "1000+", label: "Cultural Programs" },
              { number: "24/7", label: "Digital Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-orange-200 text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
