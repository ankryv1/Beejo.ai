"use client";

import React from "react";
import { Leaf } from "lucide-react";
import ProductGrid from "./products/ProductGrid";

export default function BestSellers({ products }) {
  return (
    <section className="relative overflow-hidden py-5 px-6 lg:px-12 bg-gradient-to-b from-[#f7faf6] via-[#edf8ef] to-[#e8f5e9]">

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-200/30 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-14">

          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="w-7 h-7 text-green-700" />
            </div>
          </div>

          <p className="uppercase tracking-[4px] text-green-700 text-xs font-semibold">
            Handpicked Collection
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-semibold text-[#1A2E21]">
            Our Best Sellers
          </h2>

          <div className="w-20 h-1 bg-green-600 rounded-full mx-auto mt-4"></div>

          <p className="mt-5 max-w-xl mx-auto text-gray-600">
            Bring nature indoors with our most loved plants, carefully
            selected to add freshness, beauty, and positivity to your home.
          </p>
        </div>

        {/* Products */}

        <ProductGrid products={products} />

      </div>
    </section>
  );
}