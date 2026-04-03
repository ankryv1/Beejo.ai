"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Minus, Plus, Zap } from "lucide-react";

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    // TODO: Connect to your cart context / API
    console.log("Adding to cart:", { product, quantity });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    // TODO: Navigate to checkout with this item
    console.log("Buy now:", { product, quantity });
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Quantity selector */}
      <div>
        <p className="text-sm text-gray-400 mb-2 font-medium">Quantity</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0 bg-[#0d2414] border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5
                         transition-colors disabled:opacity-30"
              disabled={quantity === 1}
            >
              <Minus size={15} />
            </button>
            <span className="px-5 py-2.5 text-white font-semibold text-base min-w-[48px] text-center
                             border-x border-white/10">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5
                         transition-colors disabled:opacity-30"
              disabled={quantity === product.stock}
            >
              <Plus size={15} />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6
                      rounded-xl font-semibold text-sm transition-all duration-300
                      ${addedToCart
                        ? "bg-[#4ADE80] text-[#051109] shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                        : "bg-[#1A2E21] border border-white/10 text-white hover:bg-[#253f2d]"
                      }`}
        >
          <ShoppingCart size={17} />
          {addedToCart ? "Added!" : "Add to Cart"}
        </button>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6
                     rounded-xl font-semibold text-sm bg-[#4ADE80] text-[#051109]
                     hover:bg-[#22c55e] transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(74,222,128,0.4)]"
        >
          <Zap size={17} />
          Buy Now
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlisted(w => !w)}
          className={`p-3.5 rounded-xl border transition-all duration-300
                      ${isWishlisted
                        ? "border-red-500/50 bg-red-500/10 text-red-400"
                        : "border-white/10 bg-[#0d2414] text-gray-400 hover:text-red-400 hover:border-red-500/30"
                      }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        {[
          { icon: "🚚", label: "Free delivery", sub: "Above ₹999" },
          { icon: "🔄", label: "Easy returns", sub: "7 day policy" },
          { icon: "✅", label: "Authentic", sub: "100% genuine" },
        ].map((badge) => (
          <div key={badge.label}
            className="flex flex-col items-center gap-1 py-3 px-2
                       bg-[#0d2414] border border-white/5 rounded-xl text-center">
            <span className="text-lg">{badge.icon}</span>
            <span className="text-white text-[11px] font-semibold">{badge.label}</span>
            <span className="text-gray-500 text-[10px]">{badge.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
