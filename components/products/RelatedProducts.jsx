import ProductCard from "./ProductCard";

const RelatedProducts = ({ products }) => {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
        {products.map((product) => (
          <div key={product._id} className="min-w-[250px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;