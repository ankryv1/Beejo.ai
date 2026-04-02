"use client";
import { ShoppingCart } from "lucide-react";


const  ProductCard = ({ product }) =>{
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl border md:h-[450px]">
      
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F3F4F1] h-[70%]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full  object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-end justify-center p-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full bg-[#1A2E21] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-2 sm:p-4 md:p-6">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-[#8A9A5B] uppercase">
            {product.category}
          </span>

          <div className="text-right">
            <span className="text-gray-400 text-sm line-through">
              {product.originalPrice}
            </span>
            <p className="text-[#1A2E21] font-bold">
              {product.price}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-serif mt-2">
          {product.name}
        </h3>
      </div>
    </div>
  );
}

export default ProductCard;