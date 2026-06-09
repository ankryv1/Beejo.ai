"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

const Page = () => {
  const { plantId } = useParams();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= Fetch Plant =================

  const fetchPlant = async () => {
    try {
      const response = await fetch(`/api/plants/${plantId}`);
      const data = await response.json();

      if (data.success) {
        setPlant(data.plant);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch plant");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (plantId) {
      fetchPlant();
    }
  }, [plantId]);

  // ================= Common Change =================

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setPlant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= Variant Change =================

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...plant.variants];

    updatedVariants[index][field] =
      field === "stock" ||
      field === "originalPrice" ||
      field === "discountedPrice"
        ? Number(value)
        : value;

    setPlant((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };

  // ================= Colors =================

  const toggleColor = (color) => {
    setPlant((prev) => {
      const colors = prev.availableColors || [];

      if (colors.includes(color)) {
        return {
          ...prev,
          availableColors: colors.filter((c) => c !== color),
        };
      }

      return {
        ...prev,
        availableColors: [...colors, color],
      };
    });
  };

  // ================= Submit =================

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/plants/up_del/${plant._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(plant),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 text-black space-y-8">

      <h1 className="text-3xl font-bold">
        Update Plant
      </h1>

      {/* Images */}

      <div>

        <h2 className="font-semibold mb-3">
          Images
        </h2>

        <div className="flex gap-3 flex-wrap">

          {plant?.images?.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              className="w-28 h-24 rounded-lg border object-cover"
            />
          ))}

        </div>

        <p className="text-sm text-gray-500 mt-2">
          Images cannot be updated.
        </p>

      </div>

      {/* Plant Name */}

      <input
        name="plantName"
        value={plant?.plantName || ""}
        onChange={handleOnChange}
        className="w-full border rounded-lg p-3"
        placeholder="Plant Name"
      />

      {/* Description */}

      <textarea
        rows={5}
        name="description"
        value={plant?.description || ""}
        onChange={handleOnChange}
        className="w-full border rounded-lg p-3"
      />

      {/* Selects */}

      <div className="grid md:grid-cols-2 gap-4">

        <select
          name="category"
          value={plant?.category || ""}
          onChange={handleOnChange}
          className="border p-3 rounded-lg"
        >
          <option value="FRUITS">FRUITS</option>
          <option value="INDOOR">INDOOR</option>
          <option value="OUTDOOR">OUTDOOR</option>
          <option value="AIR_PURIFIER">AIR_PURIFIER</option>
          <option value="DECORATIVE">DECORATIVE</option>
          <option value="BEST_SELLING">BEST_SELLING</option>
          <option value="SUMMER_SPECIAL">SUMMER_SPECIAL</option>
          <option value="POPULAR">POPULAR</option>
          <option value="ARTIFICIAL">ARTIFICIAL</option>
        </select>

        <select
          name="lightRequirements"
          value={plant?.lightRequirements || ""}
          onChange={handleOnChange}
          className="border p-3 rounded-lg"
        >
          <option value="FULL_SHADE">FULL_SHADE</option>
          <option value="PARTIAL_SHADE">PARTIAL_SHADE</option>
          <option value="PARTIAL_SUN">PARTIAL_SUN</option>
          <option value="FULL_SUN">FULL_SUN</option>
        </select>

        <input
          name="wateringRequirements"
          value={plant?.wateringRequirements || ""}
          onChange={handleOnChange}
          className="border rounded-lg p-3"
          placeholder="Watering Requirement"
        />

        <select
          name="difficulty"
          value={plant?.difficulty || ""}
          onChange={handleOnChange}
          className="border p-3 rounded-lg"
        >
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>

        <select
          name="material"
          value={plant?.material || ""}
          onChange={handleOnChange}
          className="border p-3 rounded-lg"
        >
          <option value="PLASTIC">PLASTIC</option>
          <option value="SILK">SILK</option>
          <option value="POLYESTER">POLYESTER</option>
        </select>

      </div>

      {/* Pet Friendly */}

      <label className="flex gap-3 items-center">

        <input
          type="checkbox"
          checked={plant?.petFriendly || false}
          onChange={(e) =>
            setPlant((prev) => ({
              ...prev,
              petFriendly: e.target.checked,
            }))
          }
        />

        Pet Friendly

      </label>

      {/* Colors */}

      <div>

        <h2 className="font-semibold mb-2">
          Available Colors
        </h2>

        <div className="flex gap-5">

          <label>
            <input
              type="checkbox"
              checked={
                plant?.availableColors?.includes("WHITE")
              }
              onChange={() => toggleColor("WHITE")}
            />{" "}
            White
          </label>

          <label>
            <input
              type="checkbox"
              checked={
                plant?.availableColors?.includes("BROWN")
              }
              onChange={() => toggleColor("BROWN")}
            />{" "}
            Brown
          </label>

          <label>
            <input
              type="checkbox"
              checked={
                plant?.availableColors?.includes("BLACK")
              }
              onChange={() => toggleColor("BLACK")}
            />{" "}
            Black
          </label>

        </div>

      </div>

      {/* Variants */}

      <div>

        <h2 className="font-semibold mb-3">
          Variants
        </h2>

        <div className="space-y-3">

          {plant?.variants?.map((variant, index) => (

            <div
              key={variant.size}
              className="grid grid-cols-4 gap-3"
            >

              <input
                disabled
                value={variant.size}
                className="border rounded-lg p-3 bg-gray-100"
              />

              <input
                value={variant.originalPrice}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "originalPrice",
                    e.target.value
                  )
                }
                className="border rounded-lg p-3"
              />

              <input
                value={variant.discountedPrice}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "discountedPrice",
                    e.target.value
                  )
                }
                className="border rounded-lg p-3"
              />

              <input
                value={variant.stock}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "stock",
                    e.target.value
                  )
                }
                className="border rounded-lg p-3"
              />

            </div>

          ))}

        </div>

      </div>

      {/* Button */}

      <button
        onClick={handleSubmit}
        className="bg-green-700 text-white px-8 py-3 rounded-lg"
      >
        Update Plant
      </button>

    </div>
  );
};

export default Page;

