import React from 'react'
import ProductCard from './ProductCart';


const products = [
  {
    id: 1,
    name: "Swiss Cheese Plant",
    price: "₹1,299",
    originalPrice: "₹1,899", // Added originalPrice
    category: "Indoor",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Snake Plant",
    price: "₹899",
    originalPrice: "₹1,200", // Added originalPrice
    category: "Low Light",
    image: "https://images.pexels.com/photos/7245618/pexels-photo-7245618.jpeg",
  },
  {
    id: 3,
    name: "Fiddle Leaf Fig",
    price: "₹2,499",
    originalPrice: "₹3,500", // Added originalPrice
    category: "Office",
    image: "https://images.pexels.com/photos/5514902/pexels-photo-5514902.jpeg",
  },
  {
    id: 5,
    name: "Fiddle Leaf Fig",
    price: "₹2,499",
    originalPrice: "₹3,500", // Added originalPrice
    category: "Office",
    image: "https://images.pexels.com/photos/5514902/pexels-photo-5514902.jpeg",
  },
];


const ProductGrid = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
       { products.map((p, idx)=>(
        <ProductCard key={idx} product={p}/>
       ))}
    </div>
  )
}

export default ProductGrid