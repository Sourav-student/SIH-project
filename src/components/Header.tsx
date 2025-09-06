'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Map, Sparkles, ShoppingBag, Images, Leaf } from "lucide-react";

export default function Header() {
  const path = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <Home size={20} /> },
    { href: "/navigation", label: "Navigation", icon: <Map size={20} /> },
    { href: "/rituals", label: "Rituals", icon: <Sparkles size={20} /> },
    { href: "/marketplace", label: "Market", icon: <ShoppingBag size={20} /> },
    { href: "/galary", label: "Gallery", icon: <Images size={20} /> },
    { href: "/cleanliness", label: "Clean", icon: <Leaf size={20} /> },
  ];

  return (
    <header>
      {/* Top Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">🏛️</span>
              </div>
              <div className="hidden sm:block"> {/* hide text on very small screens */}
                <h1 className="text-lg sm:text-xl font-bold text-orange-600 leading-tight">
                  Ujjain Kumbh 2028
                </h1>
                <p className="text-xs text-gray-600">Digital Guide</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    path === item.href
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Profile (desktop) */}
              <Link
                href="/profile"
                className="ml-3 bg-[#363636] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90 transition"
              >
                <Image
                  src="/profile_img.svg"
                  alt="profile_image"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </Link>
            </div>

            {/* Profile (mobile) */}
            <div className="lg:hidden">
              <Link
                href="/profile"
                className="bg-[#363636] w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90 transition"
              >
                <Image
                  src="/profile_img.svg"
                  alt="profile_image"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Mobile Navbar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-xs font-medium px-2 ${
                path === item.href
                  ? "text-orange-600"
                  : "text-gray-700 hover:text-orange-600"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}