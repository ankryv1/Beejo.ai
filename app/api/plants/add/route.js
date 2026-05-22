import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";
import verifyUser from "@/lib/verifyUser";
import plantModel from "@/models/plant.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const user = await verifyUser();
    const formData = await req.formData();

    const plantName = formData.get("plantName");
    const description = formData.get("description");
    const lightRequirements = formData.get("lightRequirements");
    const wateringRequirements = formData.get("wateringRequirements");
    const difficulty = formData.get("difficulty");
    const petFriendly = formData.get("petFriendly");
    const category = formData.get("category");
    const images = formData.getAll("images");
   
    const material = formData.get("material");

     
 let variants = [];
let availableColors = [];

try {
  variants = JSON.parse(formData.get("variants"));
  availableColors = JSON.parse(formData.get("availableColors"));
} catch (err) {
  return NextResponse.json(
    {
      message: "Invalid JSON data",
      success: false,
    },
    { status: 400 }
  );
}

const formattedVariants = variants.map((v) => ({
      size: v.size,
      originalPrice: Number(v.originalPrice),
      discountedPrice: Number(v.discountedPrice),
      stock: Number(v.stock),
    }));

if (!plantName || !description || !category || images.length === 0) {
  return NextResponse.json(
    { message: "All required fields are mandatory", success: false },
    { status: 400 }
  );
}


if (category !== "ARTIFICIAL") {
  if (!lightRequirements || !wateringRequirements) {
    return NextResponse.json(
      {
        message: "Light and watering requirements are required for real plants",
        success: false
      },
      { status: 400 }
    );
  }
}
if (category === "ARTIFICIAL" && !material) {
  return NextResponse.json(
    {
      message: "Material is required for artificial plants",
      success: false
    },
    { status: 400 }
  );
}

    const uploadPromises = images.map(async (image) => {
      try {
        if (image.size > 5 * 1024 * 1024) {
          throw new Error("Image too large");
        }

        const byteData = await image.arrayBuffer();
        const buffer = Buffer.from(byteData);

        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "Plantx_Plants" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          stream.end(buffer);
        });

        return result.secure_url;
      } catch (err) {
        console.error("Single image upload failed:", err);
        return null; // skip failed image
      }
    });

    const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean);



    const newPlant = await plantModel.create({
      plantName,
      description,
      category,
      lightRequirements,
      wateringRequirements,
      difficulty,
      petFriendly: petFriendly === "true",
      variants: formattedVariants,
      availableColors,
      images: uploadedUrls,
      createdBy: user._id,
      material
    });
    return NextResponse.json(
      { message: "Plant added successfully", plant: newPlant, success: true },
      { status: 201 },
    );
  } catch (error) {
    console.error("API ERROR :", error.message);
    return NextResponse.json(
      { message: "Internal server Error", success: false },
      { status: 500 },
    );
  }
}
