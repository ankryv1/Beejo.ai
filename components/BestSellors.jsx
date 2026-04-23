"use client";
import React from "react";
import { ShoppingCart, Plus } from "lucide-react";
import ProductCard from "./products/ProductCard";
import ProductGrid from "./products/ProductGrid";


export default function BestSellers({products}) {
  return (
    <section className="relative py-15 px-6 lg:px-12 bg-blue-100">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-serif text-[#1A2E21] mb-2">Our Best Sellers</h2>
          <p className="text-[#8A9A5B] font-medium tracking-wide uppercase text-xs">Plants for your home</p>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products}/>
        
      </div>
    </section>
  );
}

