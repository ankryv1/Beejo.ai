"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search} from "lucide-react"; // Added Search icon
import { useRouter } from "next/navigation"; // To redirect to the shop page with the search query

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Plant Care", href: "/care" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirects user to /shop?search=monstera
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-[#051109] backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        {/* 1. Logo */}
        <Link href={"/"}>
          <div className="text-[#c7eecb] text-2xl font-bold font-serif tracking-normal shrink-0">
          plantx
          </div>
        </Link>
        

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md relative group"
        >
          <input
            type="text"
            placeholder="Search for plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f6fdf8] border font-medium text-gray-800 border-white/10 rounded-xl
             py-2 pl-15 pr-4 text-base focus:outline-none focus:border-[#4ADE80] transition-all  placeholder:text-gray-600"
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-800 group-focus-within:text-[#209a4c]"
            size={22}
          />
        </form>

        {/* 3. Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group text-lg text-gray-300 transition-all duration-300"
            >
              {/* The Text */}
              <span className="group-hover:text-[#4ADE80] transition-colors duration-300">
                {link.name}
              </span>

              {/* The Premium Underline */}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#4ADE80] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* 4. Cart & Hamburger */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="relative flex items-center gap-2 bg-[#1A2E21] border border-white/10 px-4 py-2 rounded-full hover:bg-[#253f2d] transition-all">
            <ShoppingCart size={18} />
            <span className="hidden sm:inline text-sm">Cart</span>
            <span className="bg-[#4ADE80] text-[#051109] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center absolute -top-1 -right-1">
              3
            </span>
          </button>

          <button
            className="md:hidden text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Includes Mobile Search) */}
      {isOpen && (
        <div className="md:hidden bg-[#0A1A0F] border-t border-white/5 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full bg-[#f8fbf9] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-black font-medium focus:outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-3.5 text-gray-500"
              size={18}
            />
          </form>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg text-gray-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
