"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function AddPlantPage() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); 
  const [previews, setPreviews] = useState([]); 

  const [formData, setFormData] = useState({
    plantName: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    category: "INDOOR",
    stock: 0, // Initializing stock
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      // Appending all text fields
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      // Appending images
      images.forEach((image) => data.append("images", image));

      const res = await fetch("/api/plants/add", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Plant added successfully!");
        setImages([]);
        setPreviews([]);
        setFormData({ // Manual reset for state
          plantName: "",
          description: "",
          originalPrice: "",
          discountedPrice: "",
          category: "INDOOR",
          stock: 0,
        });
        e.target.reset();
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return <div className="p-10 text-center text-white bg-[#051109] h-screen">Access Denied</div>;

  return (
    <div className="min-h-screen bg-[#051109] py-12 px-4 text-white">
      <div className="max-w-3xl mx-auto bg-[#0A1A0F] rounded-2xl shadow-2xl border border-white/10 p-8">
        <h1 className="text-3xl font-bold text-[#edf3ef] mb-8 tracking-tight">Add New Plant</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Plant Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Plant Name</label>
              <input 
                type="text" required
                value={formData.plantName}
                placeholder="e.g. Monstera Deliciosa"
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white placeholder:text-gray-600 transition-all"
                onChange={(e) => setFormData({...formData, plantName: e.target.value})}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Category</label>
              <select 
                value={formData.category}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="INDOOR">Indoor</option>
                <option value="OUTDOOR">Outdoor</option>
                <option value="FRUITS">Fruits</option>
                <option value="AIR_PURIFIER">Air Purifier</option>
                <option value="DECORATIVE">Decorative</option>
                <option value="GIFTS">Gifts</option>
              </select>
            </div>

            {/* Original Price */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Original Price (₹)</label>
              <input 
                type="number" required
                value={formData.originalPrice}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
              />
            </div>

            {/* Discounted Price */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Discounted Price (₹)</label>
              <input 
                type="number" required
                value={formData.discountedPrice}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({...formData, discountedPrice: e.target.value})}
              />
            </div>

            {/* NEW: Stock Quantity */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400">Stock Quantity (Items available)</label>
              <input 
                type="number" required
                value={formData.stock}
                placeholder="0"
                min="0"
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">Description</label>
            <textarea 
              rows="4" required
              value={formData.description}
              placeholder="Tell us about this plant..."
              className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white placeholder:text-gray-600"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col gap-3 p-4 bg-[#14261a] border border-dashed border-white/20 rounded-2xl">
            <label className="text-sm font-semibold text-[#4ADE80]">Plant Images</label>
            <input 
              type="file" multiple accept="image/*" 
              className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4ADE80] file:text-[#051109] hover:file:bg-[#22c55e] cursor-pointer"
              onChange={handleImageChange}
            />
            
            <div className="flex flex-wrap gap-4 mt-2">
              {previews.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="preview" className="w-24 h-24 object-cover rounded-xl border border-white/10" />
                  <button 
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-[#4ADE80] text-[#051109] py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading Data..." : "Publish Plant"}
          </button>
        </form>
      </div>
    </div>
  );
}