"use client";  
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [plants, setPlants] = useState([]);

  //   console.log("plants", plants);                                                                                       

  async function getAllPlants() {
    const resp = await fetch("/api/plants/getAll");
    const data = await resp.json();
    setPlants(data.plants);
    console.log("Plants data coming", data);
  }
  useEffect(() => {
    getAllPlants();
  }, []);

  async function handleDelete(plantId) {
    try {
      const deleteProd = await fetch(`/api/plants/up_del/${plantId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await deleteProd.json();
      console.log(data);
      if (data.success) {
        getAllPlants();
        toast.success(data.message);
    
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="space-y-4 p-6">
      {plants?.map((plant) => (
        <div
          key={plant._id}
          className="flex justify-between items-center shadow-md p-4 rounded-xl"
        >
          <div className="flex gap-4 items-center text-blue-900">
            <img
              src={plant.images?.[0]}
              className="w-16 h-16 sm:h-20 object-cover rounded-lg"
              alt={plant.plantName}
            />

            <div>
              <h2 className="font-semibold">{plant?.plantName}</h2>

              <p>₹{plant.variants?.[0]?.discountedPrice}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => {
                router.push(`/admin/products/update-plant/${plant._id}`);
              }}
            >
              Update
            </button>

            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => {
                handleDelete(plant._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
