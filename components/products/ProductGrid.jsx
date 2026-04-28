import React from 'react'
import ProductCard from './ProductCard';


const ProductGrid = ({products = []}) => {
  return (
    <div className='grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-4 md:gap-10'>
       { products.map((p, idx)=>(
        <ProductCard key={idx} product={p}/>
       ))}
    </div>
  )
}

export default ProductGrid