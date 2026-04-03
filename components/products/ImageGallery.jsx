"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

export default function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">

      {/* ── Thumbnails (left on desktop, bottom on mobile) ── */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto
                      md:max-h-[560px] pb-2 md:pb-0 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl 
                        overflow-hidden border-2 transition-all duration-200
                        ${activeIndex === i
                          ? "border-[#4ADE80] shadow-[0_0_12px_rgba(74,222,128,0.35)]"
                          : "border-white/10 hover:border-white/30"
                        }`}
          >
            <Image
              src={img}
              alt={`${productName} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* ── Main image ── */}
      <div
        className="relative flex-1 aspect-square rounded-2xl overflow-hidden
                   bg-[#0d2414] border border-white/10 cursor-zoom-in group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={images[activeIndex]}
          alt={productName}
          fill
          className={`object-cover transition-transform duration-300
                      ${isZoomed ? "scale-150" : "scale-100"}`}
          style={isZoomed
            ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
            : {}}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5
                        bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5
                        opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={13} className="text-white" />
          <span className="text-white text-xs">Hover to zoom</span>
        </div>

        {/* Image counter */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm
                        rounded-full px-3 py-1 text-white text-xs">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
