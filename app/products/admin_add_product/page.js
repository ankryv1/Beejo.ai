"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import toast from "react-hot-toast";

export default function AddPlantPage() {
  const { isAdmin } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [images, setImages] =
    useState([]);

  const [previews, setPreviews] =
    useState([]);

  const [formData, setFormData] =
    useState({
      plantName: "",
      description: "",
      category: "INDOOR",
      lightRequirements:
        "PARTIAL_SUN",
      wateringRequirements: "",
      difficulty: "EASY",
      petFriendly: false,
    });

  // VARIANTS
  const [variants, setVariants] =
    useState([
      {
        size: "SMALL",
        originalPrice: "",
        discountedPrice: "",
        stock: 0,
      },
    ]);

  // COLORS
  const [
    availableColors,
    setAvailableColors,
  ] = useState([]);

  // IMAGE HANDLING
  const handleImageChange = (
    e
  ) => {
    const files = Array.from(
      e.target.files
    );

    setImages((prev) => [
      ...prev,
      ...files,
    ]);

    const newPreviewUrls =
      files.map((file) =>
        URL.createObjectURL(file)
      );

    setPreviews((prev) => [
      ...prev,
      ...newPreviewUrls,
    ]);
  };

  const removeImage = (index) => {
    setImages(
      images.filter(
        (_, i) => i !== index
      )
    );

    setPreviews(
      previews.filter(
        (_, i) => i !== index
      )
    );
  };

  // VARIANTS
  const handleVariantChange = (
    index,
    field,
    value
  ) => {
    const updated = [...variants];

    updated[index][field] = value;

    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        size: "SMALL",
        originalPrice: "",
        discountedPrice: "",
        stock: 0,
      },
    ]);
  };

  const removeVariant = (
    index
  ) => {
    setVariants(
      variants.filter(
        (_, i) => i !== index
      )
    );
  };

  // COLORS
  const toggleColor = (
    color
  ) => {
    if (
      availableColors.includes(color)
    ) {
      setAvailableColors(
        availableColors.filter(
          (c) => c !== color
        )
      );
    } else {
      setAvailableColors([
        ...availableColors,
        color,
      ]);
    }
  };

  // SUBMIT
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data =
        new FormData();

      Object.keys(formData).forEach(
        (key) =>
          data.append(
            key,
            formData[key]
          )
      );

      data.append(
        "variants",
        JSON.stringify(variants)
      );

      data.append(
        "availableColors",
        JSON.stringify(
          availableColors
        )
      );

      images.forEach((img) =>
        data.append("images", img)
      );

      const res = await fetch(
        "/api/plants/add",
        {
          method: "POST",
          body: data,
        }
      );

      const result =
        await res.json();

      if (res.ok) {
        toast.success(
          "Plant added successfully!"
        );

        setFormData({
          plantName: "",
          description: "",
          category: "INDOOR",
          lightRequirements:
            "PARTIAL_SUN",
          wateringRequirements:
            "",
          difficulty: "EASY",
          petFriendly: false,
        });

        setVariants([
          {
            size: "SMALL",
            originalPrice: "",
            discountedPrice: "",
            stock: 0,
          },
        ]);

        setAvailableColors([]);
        setImages([]);
        setPreviews([]);

      } else {
        toast.error(
          result.message ||
            "Something went wrong"
        );
      }

    } catch (err) {

      console.error(err);

      toast.error(
        "Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  if (!isAdmin)
    return (
      <div className="p-10 text-white">
        Access Denied
      </div>
    );

  return (
    <div className="min-h-screen bg-[#051109] px-4 py-12 text-white">

      <div className="mx-auto max-w-4xl rounded-2xl bg-[#0A1A0F] p-8 shadow-2xl">

        <h1 className="mb-10 text-center text-3xl font-bold">
          Add New Plant
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* PLANT NAME */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Plant Name
            </label>

            <input
              type="text"
              placeholder="Enter plant name"
              required
              value={
                formData.plantName
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  plantName:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-[#1A2E21] p-3 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Description
            </label>

            <textarea
              placeholder="Write plant description"
              required
              value={
                formData.description
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target.value,
                })
              }
              className="min-h-[120px] w-full rounded-xl bg-[#1A2E21] p-3 outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Category
            </label>

            <select
              value={
                formData.category
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-[#1A2E21] p-3 outline-none"
            >
              {[
                "FRUITS",
                "INDOOR",
                "OUTDOOR",
                "AIR_PURIFIER",
                "DECORATIVE",
                "BEST_SELLING",
                "SUMMER_SPECIAL",
                "POPULAR",
              ].map((c) => (
                <option
                  key={c}
                  value={c}
                >
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* LIGHT */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Light Requirements
            </label>

            <select
              value={
                formData.lightRequirements
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lightRequirements:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-[#1A2E21] p-3 outline-none"
            >
              <option value="FULL_SHADE">
                Full Shade
              </option>

              <option value="PARTIAL_SHADE">
                Partial Shade
              </option>

              <option value="PARTIAL_SUN">
                Partial Sun
              </option>

              <option value="FULL_SUN">
                Full Sun
              </option>
            </select>
          </div>

          {/* WATERING */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Watering Schedule
            </label>

            <input
              type="text"
              placeholder="Ex: Twice a week"
              value={
                formData.wateringRequirements
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  wateringRequirements:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-[#1A2E21] p-3 outline-none"
            />
          </div>

          {/* DIFFICULTY */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Difficulty
            </label>

            <select
              value={
                formData.difficulty
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficulty:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-[#1A2E21] p-3 outline-none"
            >
              <option value="EASY">
                Easy
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="HARD">
                Hard
              </option>
            </select>
          </div>

          {/* PET FRIENDLY */}
          <label className="flex items-center gap-3 text-sm font-medium text-gray-300">

            <input
              type="checkbox"
              checked={
                formData.petFriendly
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  petFriendly:
                    e.target.checked,
                })
              }
              className="h-5 w-5"
            />

            Pet Friendly
          </label>

          {/* VARIANTS */}
          <div>

            <h2 className="mb-4 text-xl font-bold">
              Plant Variants
            </h2>

            {variants.map(
              (v, i) => (
                <div
                  key={i}
                  className="mb-4 grid grid-cols-1 gap-3 rounded-2xl bg-[#132117] p-4 md:grid-cols-4"
                >

                  <select
                    value={v.size}
                    onChange={(e) =>
                      handleVariantChange(
                        i,
                        "size",
                        e.target.value
                      )
                    }
                    className="rounded-xl bg-[#1A2E21] p-3 outline-none"
                  >
                    <option value="SMALL">
                      SMALL
                    </option>

                    <option value="MEDIUM">
                      MEDIUM
                    </option>

                    <option value="LARGE">
                      LARGE
                    </option>
                  </select>

                  <input
                    type="number"
                    placeholder="Original Price"
                    value={
                      v.originalPrice
                    }
                    onChange={(e) =>
                      handleVariantChange(
                        i,
                        "originalPrice",
                        e.target.value
                      )
                    }
                    className="rounded-xl bg-[#1A2E21] p-3 outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Discounted Price"
                    value={
                      v.discountedPrice
                    }
                    onChange={(e) =>
                      handleVariantChange(
                        i,
                        "discountedPrice",
                        e.target.value
                      )
                    }
                    className="rounded-xl bg-[#1A2E21] p-3 outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Stock"
                    value={v.stock}
                    onChange={(e) =>
                      handleVariantChange(
                        i,
                        "stock",
                        e.target.value
                      )
                    }
                    className="rounded-xl bg-[#1A2E21] p-3 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeVariant(i)
                    }
                    className="rounded-xl bg-red-500 p-3 font-semibold text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              )
            )}

            <button
              type="button"
              onClick={addVariant}
              className="rounded-xl bg-green-500 px-5 py-3 font-semibold text-black hover:bg-green-400"
            >
              + Add Variant
            </button>
          </div>

          {/* COLORS */}
          <div>

            <h2 className="mb-4 text-xl font-bold">
              Available Colors
            </h2>

            <div className="flex flex-wrap gap-4">

              {[
                "WHITE",
                "BLACK",
                "BROWN",
              ].map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 rounded-xl bg-[#132117] px-4 py-3"
                >

                  <input
                    type="checkbox"
                    checked={availableColors.includes(
                      color
                    )}
                    onChange={() =>
                      toggleColor(
                        color
                      )
                    }
                  />

                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* IMAGES */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-300">
              Upload Plant Images
            </label>

            <input
              type="file"
              multiple
              onChange={
                handleImageChange
              }
              name="images"
              className="w-full overflow-hidden rounded-2xl border-2 border-gray-300 bg-[#1A2E21] p-2 text-sm text-white file:mr-4 file:rounded-xl file:border-0 file:bg-green-400 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-green-500"
            />
          </div>

          {/* PREVIEWS */}
          <div className="flex flex-wrap gap-3">

            {previews.map(
              (url, i) => (
                <div
                  key={i}
                  className="relative"
                >

                  <img
                    src={url}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(i)
                    }
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                  >
                    ✕
                  </button>
                </div>
              )
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-400 p-4 font-bold text-black transition hover:bg-green-300"
          >
            {loading
              ? "Adding..."
              : "Add Plant"}
          </button>
        </form>
      </div>
    </div>
  );
}