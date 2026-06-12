"use client";
import React from "react";
import { ShoppingCart, Leaf } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext";

const ProductCard = ({ product }) => {
  if (!product) return null;
  const { user } = useAuth();
  const { fetchCart, loading } = useCart();
  const defaultVariant = product.variants?.[0];

  const LetsAddToCart = async ({ plantId, size, color, qty }) => {
    try {
      if (!user) {
        toast.error("Please login to add items to cart.");
        return;
      }
      const response = await fetch("/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plantId, size, color, qty }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        await fetchCart();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const discount =
    defaultVariant?.originalPrice && defaultVariant?.discountedPrice
      ? Math.round(
          ((defaultVariant.originalPrice - defaultVariant.discountedPrice) /
            defaultVariant.originalPrice) *
            100
        )
      : null;

  return (
    <Link href={`/products/${product._id}`} className="block h-full">
      <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-green-100 flex flex-col h-full">
        
        {/* Image Section */}
        <div className="relative overflow-hidden bg-[#F3F4F1] aspect-[5/5]">
          <img
            src={product.images?.[0] || "/placeholder-plant.png"}
            alt={product.plantName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Discount badge */}
          {discount && discount > 0 && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
              -{discount}%
            </div>
          )}

          {/* Out of Stock Badge */}
          {defaultVariant?.stock === 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
              OUT OF STOCK
            </div>
          )}

          {/* Floating Add to Cart Button */}
          <div className="absolute inset-0 flex items-end justify-center p-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {loading ? (
              <div className="w-full bg-[#1A2E21] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg">
                Adding...
              </div>
            ) : (
              <button
                className="w-full bg-[#1A2E21] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#2A4D35] transition-colors shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!defaultVariant) return;
                  LetsAddToCart({
                    plantId: product._id,
                    size: defaultVariant.size,
                    color: product.availableColors?.[0],
                    qty: 1,
                  });
                }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-4 flex flex-col justify-between flex-1 border-t border-green-50">
          {/* Category + Price row */}
          <div className="flex justify-between items-start mb-2">
            <span className="flex items-center gap-1 text-[8px] sm:text-[12px] font-bold text-white uppercase tracking-wider bg-emerald-700 px-2 py-1 rounded-lg">
              <Leaf size={10} />
              {product.category?.replace("_", " ")}
            </span>

            <div className="text-right">
              <span className="text-gray-400 text-xs line-through block">
                ₹{defaultVariant?.originalPrice}
              </span>
              <p className="text-[#1A2E21] font-bold text-lg leading-tight">
                ₹{defaultVariant?.discountedPrice}
              </p>
            </div>
          </div>

          {/* Plant name */}
          <h3 className="text-base font-serif text-[#1A2E21] line-clamp-1 group-hover:underline">
            {product.plantName}
          </h3>

          {/* Decorative bottom divider */}
          <div className="mt-3 flex items-center gap-1">
            <div className="h-[2px] w-6 rounded bg-emerald-200" />
            <div className="h-[2px] w-3 rounded bg-emerald-100" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;