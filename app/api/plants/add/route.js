import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongodb";
import verifyUser from "@/lib/verifyUser";
import plantModel from "@/models/plant.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    
    await connectDB();
    const user = await verifyUser();
    const formData = await req.formData();

   const plantName = formData.get("plantName");
   const description= formData.get("description");
   const originalPrice= formData.get("originalPrice");
   const discountedPrice= formData.get("discountedPrice");
   const category= formData.get("category");
   const stock= formData.get("stock");
   const images= formData.getAll("images");

    if (
      !plantName ||
      !description ||
      !originalPrice ||
      !discountedPrice ||
      !category ||
      !stock ||
      images.length==0
    ) {
      return NextResponse.json(
        { message: "All fields are required" , success: false},
        { status: 400 },
      );
    }

    const uploadedUrls = [];

    for(const image of images){
      console.log("Images start  uploading")
      if(image.size> 5*1024*1024){
        return NextResponse.json({message:"Image size must be less than 5 MB", success: false}, {status: 400})
      }
      const byteData = await image.arrayBuffer();
      const buffer = Buffer.from(byteData);

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({folder:"Plantx_Plants"}, (error, result) => {
          if(error) reject(error);
          else {console.log("Cloudinary Success"); resolve(result);}
        })
        stream.end(buffer);
      })
      uploadedUrls.push(uploadResult.secure_url);
    }
    
    const newPlant = await plantModel.create({
      plantName,
      description,
      originalPrice: Number(originalPrice),
      discountedPrice: Number(discountedPrice),
      category,
      stock: Number(stock),
      images: uploadedUrls,
      createdBy: user._id
    });
    return NextResponse.json(
      { message: "Plant added successfully", plant: newPlant , success: true},
      { status: 201 },
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Internal server Error", success: false },
      { status: 500 },
    );
  }
}
