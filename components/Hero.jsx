"use client";
import React from "react";

export default function Hero() {
  return (
    <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* --- 1. THE BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* The Image (Same one you had) */}
        <img
          src="https://media.istockphoto.com/id/2225353966/photo/stages-of-plant-growth-development.jpg?b=1&s=612x612&w=0&k=20&c=hkl6ICwYldkFmodAGIwCna_s7bz-tIg9VLlomf1aKI8="
          alt="Plant growth background"
          /* Full Screen, perfectly covered, and the Blur effect */
          className="w-full h-full object-cover scale-105 blur-[8px]"
        />
        
        {/* The Overlay - THIS IS KEY FOR READABILITY */}
        {/* We use a slight dark tint so the white text can be seen */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Optional: Add a second overlay, a vignette gradient for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-15"></div>
      </div>

     
      {/* We use z-20 to make sure this sits on top of all the background effects */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-12 text-center  md:py-20  md:mt-0">
        
        {/* Re-styling the Content for a dark background */}
        <div className="space-y-10 flex flex-col items-center">
          
          {/* Badge - Match colors to the dark theme */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-bold tracking-wide uppercase backdrop-blur-sm border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9f740] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8A9A5B]"></span>
            </span>
            Fresh Arrivals Weekly
          </div>

        
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-[1.0] tracking-tight drop-shadow-md">
            Bring nature
            <span className="italic text-[#ea75da]"> Into</span>{" "}
            <br />
            every room
          </h1>

          
          <p className="text-white/80 text-lg lg:text-2xl max-w-2xl mx-auto leading-relaxed font-light drop-shadow">
            Bijjo delivers hand-picked, premium indoor plants that don't just
            look good—they make you feel better. Guaranteed fresh from our
            nursery.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6 w-full sm:w-auto">
            <button className="bg-[#d1ecef] text-[#1A2E21] sm:px-6 sm:py-3 md:px-12 py-5 rounded-2xl font-bold sm:text-base md:text-xl hover:bg-white hover:-translate-y-2 transition-all duration-300">
              Gift Plants
            </button>
            <button className="border-2 backdrop-blur-sm bg-white/5 border-white/20 text-white sm:px-6 sm:py-3 md:px-12 py-5 rounded-2xl font-bold sm:text-base md:text-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
              Our Most Popular Plants
            </button>
          </div>
        </div>
      </div>

    </header>
  );
}