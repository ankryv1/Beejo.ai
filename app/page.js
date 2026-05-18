export const dynamic = "force-dynamic";
import BestSellers from '@/components/BestSellors'
import Hero from '@/components/Hero'
import ProductCategories from '@/components/ProductCategories'
import React from 'react'

async function bestSellorsProducts() {
  const products = await fetch(`/api/plants/getAll?category=BEST_SELLING`, {next: {revalidate: 3600}});
  return products;
}   

const page = async () => {
  const rawProducts = await bestSellorsProducts();
  const productsJson = await rawProducts.json();
  const products =  productsJson.plants;

  return (
    <div>
      <Hero />
      <BestSellers products={products}/>
      <ProductCategories />
    </div>
  )
}

export default page