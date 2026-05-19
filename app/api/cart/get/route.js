import connectDB from "@/lib/mongodb";
import Cart from "@/models/cart.model";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connectDB();

    try {
        const cartProducts= await Cart.find({}).lean();
        // console.log(cartProducts);   
        if(!cartProducts || cartProducts.length === 0){ 
            return NextResponse.json({ cart: [], success: true }, { status: 200 });
        }
        return NextResponse.json({ cart: cartProducts, success: true }, { status: 200 });
    } catch (error) {    
        return NextResponse.json({ message: error.message ,success:false}, { status: 500 });

    }
}
