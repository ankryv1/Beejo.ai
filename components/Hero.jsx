"use client";
import React from "react";

export default function Hero() {
return ( <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">


  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="https://media.istockphoto.com/id/2225353966/photo/stages-of-plant-growth-development.jpg?b=1&s=612x612&w=0&k=20&c=hkl6ICwYldkFmodAGIwCna_s7bz-tIg9VLlomf1aKI8="
      alt="Plant growth background"
      className="w-full h-full object-cover scale-105 blur-[8px]"
    />

    {/* Overlays */}
    <div className="absolute inset-0 bg-black/50 z-10"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-10"></div>

    {/* Decorative Glow Effects */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
  </div>

  {/* Content */}
  <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-20 text-center md:py-20">
    <div className="space-y-10 flex flex-col items-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 text-white rounded-full text-sm font-bold tracking-wide uppercase backdrop-blur-md border border-white/20 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9f740] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8A9A5B]"></span>
        </span>
        Fresh Arrivals Weekly
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.95] tracking-tight drop-shadow-2xl">
        Bring nature
        <span className="italic bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          {" "}
          Into
        </span>
        <br />
        every room
      </h1>

      {/* Description */}
      <p className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
        PlantX delivers hand-picked, premium indoor plants that don't just
        look good—they make you feel better. Guaranteed fresh from our
        nursery.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 w-full sm:w-auto">
        <button className="bg-[#d1ecef] text-[#1A2E21] sm:px-8 sm:py-4 md:px-12 py-5 rounded-2xl font-bold sm:text-base md:text-xl hover:bg-white hover:-translate-y-2 shadow-xl hover:shadow-2xl transition-all duration-300">
          Gift Plants
        </button>

        <button className="border-2 backdrop-blur-md bg-white/5 border-white/20 text-white sm:px-8 sm:py-4 md:px-12 py-5 rounded-2xl font-bold sm:text-base md:text-xl hover:bg-white/10 hover:-translate-y-2 shadow-lg transition-all duration-300">
          Our Most Popular Plants
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
          <p className="text-2xl font-bold text-white">10k+</p>
          <p className="text-white/70 text-sm">Plants Delivered</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
          <p className="text-2xl font-bold text-white">4.9★</p>
          <p className="text-white/70 text-sm">Customer Rating</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 shadow-lg">
          <p className="text-2xl font-bold text-white">100%</p>
          <p className="text-white/70 text-sm">Fresh Guarantee</p>
        </div>
      </div>

    </div>
  </div>
</header>


);
}
