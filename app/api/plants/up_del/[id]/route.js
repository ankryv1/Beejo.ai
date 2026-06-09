import { NextResponse } from "next/server";
import plantModel from "@/models/plant.model";
import connectDB from "@/lib/mongodb";

export async function PUT(req, { params}){
    try{
        await connectDB();
    const  {id} = await params;
    const body = await req.json();
    const prod = await plantModel.findById(id);
    if(!prod){
        return NextResponse.json( {message: "Plant not found "}, {status: 404});
    }
    const updatedProd = await plantModel.findByIdAndUpdate(id, {$set:body} , {new: true});
    return NextResponse.json({message: "Product updated successfully", success:true, product: updatedProd}, {status: 200});

    }catch(error){
        console.log(error);
        return NextResponse.json({message: error.message, success: false}, {status: 500});
    }
    
}
 
export async function DELETE(req, {params}) {
    try{
        await connectDB();
        const {id} = await params;
        const prod = await plantModel.findById(id);
        if(!prod) return NextResponse.json({message:"Product not avvailable", success: false}, {status:404})
        const deletedProd = await plantModel.findByIdAndDelete(id);
    return NextResponse.json({message:"Product deleted Successfully", success: true, product:deletedProd}, {status:200});

    }catch(error){
        console.log(error);
        return NextResponse.json({message: error.message, success: false}, {status: 500});
        
    }
}
