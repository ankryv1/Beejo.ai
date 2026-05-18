export const dynamic = "force-dynamic";

import React from "react";

import ProductGrid from "@/components/products/ProductGrid";

import connectDB from "@/lib/mongodb";
import plantModel from "@/models/plant.model";

const Page = async ({ searchParams }) => {
  await connectDB();

  const category = searchParams.category;

  const query = {};

  if (category) {
    query.category = category;
  }

  const products = await plantModel.find(query);

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
