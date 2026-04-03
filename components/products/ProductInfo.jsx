// Server Component — no "use client" needed
// Just displays data, no interactivity

import { Star, CheckCircle } from "lucide-react";

export default function ProductInfo({ product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="flex flex-col gap-5">

      {/* Category + Badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-[#4ADE80] uppercase tracking-widest
                         bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-3 py-1 rounded-full">
          {product.category}
        </span>
        {product.badge && (
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest
                           bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Name */}
      <div>
        <h1 className="text-3xl font-bold text-white leading-tight">
          {product.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1 italic">{product.scientificName}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={15}
              className={star <= Math.round(product.ratings.average)
                ? "text-amber-400 fill-amber-400"
                : "text-gray-600"}
            />
          ))}
        </div>
        <span className="text-white font-semibold text-sm">
          {product.ratings.average}
        </span>
        <span className="text-gray-500 text-sm">
          ({product.ratings.count} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="text-4xl font-bold text-white">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-gray-500 line-through mb-0.5">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="mb-0.5 text-sm font-bold text-emerald-400
                             bg-emerald-400/10 px-2 py-0.5 rounded-md">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Description */}
      <div>
        <h3 className="text-white font-semibold mb-2">About this plant</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Tags */}
      {product.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag}
              className="text-xs text-gray-400 bg-white/5 border border-white/10
                         px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Care guide */}
      <div>
        <h3 className="text-white font-semibold mb-3">Care guide</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "💧", label: "Water", value: product.careGuide.water },
            { icon: "☀️", label: "Sunlight", value: product.careGuide.sunlight },
            { icon: "🌡️", label: "Temperature", value: product.careGuide.temperature },
            { icon: "📊", label: "Difficulty", value: product.careGuide.difficulty },
          ].map((item) => (
            <div key={item.label}
              className="flex items-start gap-3 bg-[#0d2414] border border-white/5
                         rounded-xl px-3 py-3">
              <span className="text-lg mt-0.5">{item.icon}</span>
              <div>
                <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-white text-xs font-medium mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pet safe indicator */}
        <div className={`mt-2 flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm
                         ${product.careGuide.petSafe
                           ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                           : "bg-red-500/5 border-red-500/20 text-red-400"
                         }`}>
          <CheckCircle size={15} />
          <span className="font-medium">
            {product.careGuide.petSafe ? "Pet friendly" : "Keep away from pets"}
          </span>
        </div>
      </div>
    </div>
  );
}
