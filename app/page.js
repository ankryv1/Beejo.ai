export const dynamic = "force-dynamic";

import React from "react";

import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellors";
import ProductCategories from "@/components/ProductCategories";

import connectDB from "@/lib/mongodb";
import Plant from "@/models/plant.model";
import CategoriesSection from "@/components/home/CategoriesSection";

async function bestSellorsProducts() {

  await connectDB();

  const products =
    await Plant.find({
      category: "BEST_SELLING",
    }).limit(4);

  return JSON.parse(
    JSON.stringify(products)
  );
}

const Page = async () => {

  const products =
    await bestSellorsProducts();

  return (
    <div>
      <Hero />

      <BestSellers
        products={products}
      />

      <ProductCategories />
      <CategoriesSection />
    </div>
  );
};

export default Page;