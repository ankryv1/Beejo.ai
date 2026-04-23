"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";

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
    stock: 0,
    lightRequirements: "PARTIAL_SUN", // New field
    wateringRequirements: "",        // New field
    difficulty: "EASY",              // New field
    petFriendly: false,              // New field (matches petFrendly in schema)
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
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      images.forEach((image) => data.append("images", image));

      const res = await fetch("/api/plants/add", {
        method: "POST",
        body: data,
      });

      const result = await res.json(); // Parse JSON first

      if (res.ok) {
        toast.success(result.message || "Plant added successfully!");
        setImages([]);
        setPreviews([]);
        setFormData({
          plantName: "",
          description: "",
          originalPrice: "",
          discountedPrice: "",
          category: "INDOOR",
          stock: 0,
          lightRequirements: "PARTIAL_SUN",
          wateringRequirements: "",
          difficulty: "EASY",
          petFriendly: false,
        });
        e.target.reset();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload plant");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return <div className="p-10 text-center text-white bg-[#051109] h-screen">Access Denied</div>;

  return (
    <div className="min-h-screen bg-[#051109] py-12 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-[#0A1A0F] rounded-2xl shadow-2xl border border-white/10 p-8">
        <h1 className="text-3xl font-bold text-[#edf3ef] mb-8 tracking-tight text-center">Add New Plant</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Plant Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Plant Name</label>
              <input
                type="text" required
                value={formData.plantName}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Category</label>
              <select
                value={formData.category}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {["FRUITS", "INDOOR", "OUTDOOR", "AIR_PURIFIER", "DECORATIVE", "BEST_SELLING", "SUMMER_SPECIAL", "POPULAR"].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Prices */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Original Price (₹)</label>
              <input
                type="number" required
                value={formData.originalPrice}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Discounted Price (₹)</label>
              <input
                type="number" required
                value={formData.discountedPrice}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
              />
            </div>

            {/* Light Requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Light Requirements</label>
              <select
                value={formData.lightRequirements}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, lightRequirements: e.target.value })}
              >
                <option value="FULL_SHADE">Full Shade</option>
                <option value="PARTIAL_SHADE">Partial Shade</option>
                <option value="PARTIAL_SUN">Partial Sun</option>
                <option value="FULL_SUN">Full Sun</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Difficulty</label>
              <select
                value={formData.difficulty}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            {/* Watering Requirements */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label className="text-sm font-medium text-gray-400">Watering Schedule</label>
              <input
                type="text" required
                placeholder="e.g. Once a week"
                value={formData.wateringRequirements}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, wateringRequirements: e.target.value })}
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label className="text-sm font-medium text-gray-400">Stock Quantity</label>
              <input
                type="number" required
                value={formData.stock}
                className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          {/* Pet Friendly Toggle */}
          <div className="flex items-center gap-3 p-3 bg-[#1A2E21] rounded-xl border border-white/10 w-fit">
            <input
              type="checkbox"
              id="petFriendly"
              checked={formData.petFriendly}
              className="w-5 h-5 accent-[#4ADE80]"
              onChange={(e) => setFormData({ ...formData, petFriendly: e.target.checked })}
            />
            <label htmlFor="petFriendly" className="text-sm font-medium text-gray-300 cursor-pointer">
              Is this plant Pet Friendly?
            </label>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">Description</label>
            <textarea
              rows="3" required
              value={formData.description}
              className="p-3 bg-[#1A2E21] border border-white/10 rounded-xl focus:border-[#4ADE80] outline-none text-white"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Images */}
          <div className="flex flex-col gap-3 p-4 bg-[#14261a] border border-dashed border-white/20 rounded-2xl">
            <label className="text-sm font-semibold text-[#4ADE80]">Plant Images (Required)</label>
            <input
              type="file" multiple accept="image/*"
              className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#4ADE80] file:text-[#051109] cursor-pointer"
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap gap-4">
              {previews.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">✕</button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full md:w-[50%] block mx-auto bg-[#4ADE80] text-[#051109] py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Plant"}
          </button>
        </form>
      </div>
    </div>
  );
}