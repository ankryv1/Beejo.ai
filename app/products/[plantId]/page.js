import connectDB from "@/lib/mongodb";
import plantModel from "@/models/plant.model";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import RelatedProducts from "@/components/products/RelatedProducts";
import { notFound } from "next/navigation";

export default async function PlantDetailsPage({ params }) {
  const { plantId } = await params;
  console.log(`Entering into plant Specific Page ${plantId}` )
  console.log(`PARAMs ${params}`)
  await connectDB();
  
  const plant = await plantModel.findById(plantId).lean();
  if (!plant) notFound();

  // Fetch related products (same category, excluding current)
  const related = await plantModel.find({ 
    category: plant.category, 
    _id: { $ne: plantId } 
  }).limit(4).lean();

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: Image Gallery */}
          <ProductGallery images={plant.images} name={plant.plantName} />
          
          {/* RIGHT: Product Information */}
          <ProductInfo plant={JSON.parse(JSON.stringify(plant))} />
        </div>

        {/* BOTTOM: Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-[#1A2E21] mb-8">Related Plants</h2>
          <RelatedProducts products={JSON.parse(JSON.stringify(related))} />
        </div>
      </div>
    </div>
  );
}