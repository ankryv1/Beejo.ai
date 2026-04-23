"use client";
import { useState } from "react";

export default function ProductGallery({ images, name }) {
  // We only keep the state to track which image is currently selected
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      
      {/* Thumbnails - Remains the same */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-hide">
        {images.map((img, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedImage(img)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${
              selectedImage === img ? 'border-[#8A9A5B]' : 'border-transparent'
            }`}
          >
            <img 
              src={img} 
              className="w-full h-full object-cover rounded-md" 
              alt={`${name} thumbnail ${i}`} 
            />
          </button>
        ))}
      </div>

      {/* Main Image Display - NO ZOOM logic here anymore */}
      <div className="relative flex-1 bg-[#F3F4F1] rounded-2xl overflow-hidden h-[400px] md:h-[600px]">
        <img 
          src={selectedImage} 
          className="w-full h-full object-contain"
          alt={name}
        />
      </div>
    </div>
  );
}