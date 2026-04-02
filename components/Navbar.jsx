"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  Package, 
  User, 
  UserRound, 
  LogOut, 
  Settings 
} from "lucide-react"; 
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Plant Care", href: "/care" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Sub-component for Dropdown Links
  const DropdownLink = ({ icon, label }) => (
    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-[#8A9A5B]/10 hover:text-[#1A2E21] transition-colors">
      <span className="text-[#8A9A5B]">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="bg-[#051109] backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        
        {/* 1. Logo */}
        <Link href={"/"} className="shrink-0">
          <div className="text-[#c7eecb] text-2xl font-bold font-serif tracking-normal">
            plantx
          </div>
        </Link>

        {/* 2. Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md relative group"
        >
          <input
            type="text"
            placeholder="Search for plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f6fdf8] border font-medium text-gray-800 border-white/10 rounded-xl py-2 pl-12 pr-4 text-base focus:outline-none focus:border-[#4ADE80] transition-all placeholder:text-gray-600"
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-800 group-focus-within:text-[#209a4c]"
            size={20}
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
              <span className="group-hover:text-[#4ADE80] transition-colors duration-300">
                {link.name}
              </span>
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#4ADE80] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Cart Button */}
          <button className="relative flex items-center gap-2 bg-[#1A2E21] border border-white/10 px-4 py-2 rounded-full hover:bg-[#253f2d] transition-all">
            <ShoppingCart size={18} />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>
            <span className="bg-[#4ADE80] text-[#051109] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center absolute -top-1 -right-1">
              3
            </span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isAccountOpen ? 'bg-[#8A9A5B] text-white' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              <UserRound size={24} />
            </button>

            {isAccountOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsAccountOpen(false)}
                ></div>

                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-2 mb-2 border-b border-gray-50">
                    <p className="text-xs font-bold text-[#8A9A5B] uppercase tracking-widest">Welcome</p>
                    <p className="text-sm font-semibold text-[#1A2E21]">Ankit</p>
                  </div>

                  <DropdownLink icon={<User size={16}/>} label="My Profile" />
                  <DropdownLink icon={<Package size={16}/>} label="Orders" />
                  <DropdownLink icon={<Settings size={16}/>} label="Settings" />
                  
                  <div className="my-2 border-t border-gray-100"></div>
                  
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={16} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-400 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0A1A0F] border-t border-white/5 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search plants..."
              className="w-full bg-[#f8fbf9] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-black font-medium focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </form>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg text-gray-300 hover:text-[#4ADE80]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}