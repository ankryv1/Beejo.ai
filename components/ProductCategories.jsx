import React from 'react'
import ProductGrid from './products/ProductGrid'

import { ArrowRight } from "lucide-react";

const ProductCategories = () => {
  return (
    <section className="bg-[#F9F8F3] py-20 px-2 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            {/* Small uppercase tag for that "brand" feel */}
            <span className="text-[#8A9A5B] font-bold tracking-[0.2em] text-xs uppercase">
              Browse Our Collection
            </span>
            
            <h2 className="text-4xl md:text-6xl font-serif text-[#1A2E21] leading-tight">
              Popular <span className="italic">Categories</span>
            </h2>
            
            <p className="text-[#1A2E21]/60 text-lg md:text-xl font-light max-w-md">
              Shop Plants by category and find the best deals for your green space.
            </p>
          </div>

          <button className="group flex items-center gap-2 text-[#1A2E21] font-bold text-sm uppercase tracking-wider border-b border-[#1A2E21]/20 pb-1 hover:border-[#8A9A5B] transition-all">
            Explore All 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- Product Grid Container --- */}
        <div className="relative">
          {/* Subtle background glow/decoration if you want extra depth */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#8A9A5B]/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="mt-8 ">
            <div className='mb-6'>
                <ProductGrid />
            </div>
             
            <div className='mt-2'>
                <ProductGrid />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProductCategories;