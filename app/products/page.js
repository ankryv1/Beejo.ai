export const dynamic = "force-dynamic";
import ProductGrid from "@/components/products/ProductGrid";
import React from "react";
  
const page = async () => {
  const res = await fetch(
    `/api/plants/getAll`,
    { method: "GET", credentials: "include" },
  );
  const data = await res.json();

  return (
    <div className="min-h-screen bg-white ">
      <div className=" max-w-7xl mx-auto px-6 py-8">
        <ProductGrid products={data.plants} />
      </div>
    </div>
  );
};

export default page;

