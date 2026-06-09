import React from 'react'
<div className="max-w-5xl mx-auto p-6 space-y-8">

  <h1 className="text-3xl font-bold">
    Update Plant
  </h1>

  {/* Images */}

  <div>
    <h2 className="font-semibold mb-3">
      Images
    </h2>

    <div className="flex gap-4">
      {plant.images.map((img) => (
        <img
          key={img}
          src={img}
          className="w-28 h-28 rounded-lg object-cover border"
        />
      ))}
    </div>

    <p className="text-sm text-gray-500 mt-2">
      Images cannot be updated from this page.
    </p>
  </div>

  {/* Plant Name */}

  <input
    className="w-full border rounded-lg p-3"
    placeholder="Plant Name"
  />

  {/* Description */}

  <textarea
    rows={5}
    className="w-full border rounded-lg p-3"
  />

  {/* Selects */}

  <div className="grid md:grid-cols-2 gap-4">

    <select className="border p-3 rounded-lg">
      <option>INDOOR</option>
      <option>OUTDOOR</option>
    </select>

    <select className="border p-3 rounded-lg">
      <option>FULL_SUN</option>
      <option>PARTIAL_SUN</option>
    </select>

    <input
      className="border rounded-lg p-3"
      placeholder="Watering Requirement"
    />

    <select className="border p-3 rounded-lg">
      <option>EASY</option>
      <option>MEDIUM</option>
      <option>HARD</option>
    </select>

    <select className="border p-3 rounded-lg">
      <option>PLASTIC</option>
      <option>SILK</option>
      <option>POLYESTER</option>
    </select>

  </div>

  {/* Pet Friendly */}

  <label className="flex items-center gap-3">

    <input type="checkbox" />

    Pet Friendly

  </label>

  {/* Colors */}

  <div>

    <h2 className="font-semibold mb-2">

      Available Colors

    </h2>

    <div className="flex gap-6">

      <label>
        <input type="checkbox" /> White
      </label>

      <label>
        <input type="checkbox" /> Brown
      </label>

      <label>
        <input type="checkbox" /> Black
      </label>

    </div>

  </div>

  {/* Variants */}

  <div>

    <h2 className="font-semibold mb-3">
      Variants
    </h2>

    <div className="space-y-3">

      {variants.map((variant) => (

        <div
          key={variant.size}
          className="grid grid-cols-4 gap-3"
        >

          <input
            value={variant.size}
            disabled
            className="border p-3 rounded-lg bg-gray-100"
          />

          <input
            value={variant.originalPrice}
            className="border p-3 rounded-lg"
          />

          <input
            value={variant.discountedPrice}
            className="border p-3 rounded-lg"
          />

          <input
            value={variant.stock}
            className="border p-3 rounded-lg"
          />

        </div>

      ))}

    </div>

  </div>

  {/* Button */}

  <div className="flex justify-end">

    <button
      className="bg-green-700 text-white px-8 py-3 rounded-lg"
    >
      Update Plant
    </button>

  </div>

</div>