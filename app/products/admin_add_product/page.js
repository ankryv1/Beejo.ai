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
    category: "INDOOR",
    lightRequirements: "PARTIAL_SUN",
    wateringRequirements: "",
    difficulty: "EASY",
    petFriendly: false,
  });

  // ✅ NEW: Variants
  const [variants, setVariants] = useState([
    {
      size: "SMALL",
      originalPrice: "",
      discountedPrice: "",
      stock: 0
    }
  ]);

  // ✅ NEW: Colors
  const [availableColors, setAvailableColors] = useState([]);

  // ---------------- IMAGE ----------------
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

  // ---------------- VARIANTS ----------------
  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "SMALL", originalPrice: "", discountedPrice: "", stock: 0 }
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // ---------------- COLORS ----------------
  const toggleColor = (color) => {
    if (availableColors.includes(color)) {
      setAvailableColors(availableColors.filter(c => c !== color));
    } else {
      setAvailableColors([...availableColors, color]);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      data.append("variants", JSON.stringify(variants));
      data.append("availableColors", JSON.stringify(availableColors));

      images.forEach((img) => data.append("images", img));

      const res = await fetch("/api/plants/add", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Plant added successfully!");

        setFormData({
          plantName: "",
          description: "",
          category: "INDOOR",
          lightRequirements: "PARTIAL_SUN",
          wateringRequirements: "",
          difficulty: "EASY",
          petFriendly: false,
        });

        setVariants([
          { size: "SMALL", originalPrice: "", discountedPrice: "", stock: 0 }
        ]);

        setAvailableColors([]);
        setImages([]);
        setPreviews([]);
      } else {
        toast.error(result.message || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return <div className="p-10 text-white">Access Denied</div>;

  return (
    <div className="min-h-screen bg-[#051109] py-12 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-[#0A1A0F] rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">Add New Plant</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC */}
          <input
            type="text"
            placeholder="Plant Name"
            required
            value={formData.plantName}
            onChange={(e) => setFormData({ ...formData, plantName: e.target.value })}
            className="w-full p-3 bg-[#1A2E21]"
          />

          <textarea
            placeholder="Description"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 bg-[#1A2E21]"
          />

          {/* CATEGORY */}
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-3 bg-[#1A2E21]"
          >
            {["FRUITS","INDOOR","OUTDOOR","AIR_PURIFIER","DECORATIVE","BEST_SELLING","SUMMER_SPECIAL","POPULAR"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* LIGHT */}
          <select
            value={formData.lightRequirements}
            onChange={(e) => setFormData({ ...formData, lightRequirements: e.target.value })}
            className="w-full p-3 bg-[#1A2E21]"
          >
            <option value="FULL_SHADE">Full Shade</option>
            <option value="PARTIAL_SHADE">Partial Shade</option>
            <option value="PARTIAL_SUN">Partial Sun</option>
            <option value="FULL_SUN">Full Sun</option>
          </select>

          {/* WATER */}
          <input
            type="text"
            placeholder="Watering schedule"
            value={formData.wateringRequirements}
            onChange={(e) => setFormData({ ...formData, wateringRequirements: e.target.value })}
            className="w-full p-3 bg-[#1A2E21]"
          />

          {/* DIFFICULTY */}
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="w-full p-3 bg-[#1A2E21]"
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>

          {/* PET FRIENDLY */}
          <label>
            <input
              type="checkbox"
              checked={formData.petFriendly}
              onChange={(e) => setFormData({ ...formData, petFriendly: e.target.checked })}
            /> Pet Friendly
          </label>

          {/* 🔥 VARIANTS */}
          <div>
            <h2 className="font-bold mb-2">Variants</h2>

            {variants.map((v, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">

                <select value={v.size}
                  onChange={(e) => handleVariantChange(i, "size", e.target.value)}>
                  <option value="SMALL">SMALL</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LARGE">LARGE</option>
                </select>

                <input type="number" placeholder="Original"
                  value={v.originalPrice}
                  onChange={(e) => handleVariantChange(i, "originalPrice", e.target.value)} />

                <input type="number" placeholder="Discounted"
                  value={v.discountedPrice}
                  onChange={(e) => handleVariantChange(i, "discountedPrice", e.target.value)} />

                <input type="number" placeholder="Stock"
                  value={v.stock}
                  onChange={(e) => handleVariantChange(i, "stock", e.target.value)} />

                <button type="button" onClick={() => removeVariant(i)}>Remove</button>
              </div>
            ))}

            <button type="button" onClick={addVariant}>+ Add Variant</button>
          </div>

          {/* 🔥 COLORS */}
          <div>
            <h2 className="font-bold mb-2">Colors</h2>
            {["WHITE","BLACK","BROWN"].map(color => (
              <label key={color} className="mr-4">
                <input
                  type="checkbox"
                  checked={availableColors.includes(color)}
                  onChange={() => toggleColor(color)}
                /> {color}
              </label>
            ))}
          </div>

          {/* IMAGES */}
          <input type="file" multiple onChange={handleImageChange} className="border-2 p-2 rounded-2xl"/>

          <div className="flex gap-2 flex-wrap">
            {previews.map((url, i) => (
              <img key={i} src={url} className="w-20 h-20 object-cover" />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-400 text-black p-3 w-full"
          >
            {loading ? "Adding..." : "Add Plant"}
          </button>

        </form>
      </div>
    </div>
  );
}