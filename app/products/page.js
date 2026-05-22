export const dynamic = "force-dynamic";

import React from "react";

import ProductGrid from "@/components/products/ProductGrid";
import connectDB from "@/lib/mongodb";
import plantModel from "@/models/plant.model";

const Page = async ({ searchParams }) => {
  await connectDB();

  const params = await searchParams;
  const category = params?.category;

  const query = {};

  if (category) {
    query.category = category;
  }
  console.log("Querying products with category:", category);

  const products = await plantModel.find(query);
  if(!products || products.length === 0) {
    console.log("No products found for category:", category);
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p>No products found for category: {category}</p>
        </div>
      </div>
    );
  } 
    

  const serializedProducts =
    JSON.parse(
      JSON.stringify(products)
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ProductGrid products={serializedProducts} />
      </div>
    </div>
  );
};

export default Page;
