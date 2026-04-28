"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  // Defensive check to prevent crashes if product data is missing
  if (!product) return null;

  return (
    <Link href={`/products/${product._id}`} className="block h-full">
      <div  className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl border flex flex-col h-full">
      
      {/* Image Section */}
      <div className="relative overflow-hidden bg-[#F3F4F1] aspect-[5/5]">
        <img
          // Accessing the first image from the images array in your schema
          src={product.images?.[0] || "/placeholder-plant.png"} 
          alt={product.plantName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Floating Add to Cart Button */}
        <div className="absolute inset-0 flex items-end justify-center p-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            className="w-full bg-[#1A2E21] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#2A4D35] transition-colors"
            onClick={() => console.log("Added to cart:", product._id)}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
        
        {/* Out of Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col justify-between h-[35%]">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-[8px] sm:text-[14px] sm:font-bold text-[#ffffff] uppercase tracking-wider mr-3 bg-emerald-700 p-1 sm:p-2  rounded-md sm:rounded-xl ">
              {product.category?.replace("_", " ")}
            </span>

            <div className="text-right">
              {/* Using originalPrice and discountedPrice from your schema */}
              <span className="text-gray-500 text-sm line-through block">
                ₹{product.originalPrice}
              </span>
              <p className="text-[#1A2E21] font-bold text-lg">
                ₹{product.discountedPrice}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-serif text-[#1A2E21] line-clamp-1 group-hover:underline">
            {product.plantName}
          </h3>
          
          {/* Optional: Show rating if it's above 0
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-xs text-gray-500">{product.rating}</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
    </Link>
    
  );
}

export default ProductCard;