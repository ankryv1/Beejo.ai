import connectDB from "@/lib/mongodb";
import Cart from "@/models/cart.model";
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/getUserFromToken";


export const GET = async () => {
    const userId = await getUserFromToken();
    if(!userId){
        return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    await connectDB();

    try {
        const cartProducts= await Cart.find({user:userId}).lean();
        // console.log(cartProducts);   
        if(!cartProducts || cartProducts.length === 0){ 
            return NextResponse.json({ cart: [], success: true }, { status: 200 });
        }
        return NextResponse.json({ cart: cartProducts, success: true }, { status: 200 });
    } catch (error) {    
        return NextResponse.json({ message: error.message ,success:false}, { status: 500 });

    }
}
