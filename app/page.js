import BestSellers from '@/components/BestSellors'
import Hero from '@/components/Hero'
import ProductCategories from '@/components/ProductCategories'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero />
      <BestSellers />
      <ProductCategories />
    </div>
  )
}

export default page