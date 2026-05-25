import {NextResponse} from "next/server";
import connectDB from "@/utils/connectDB";
import Cart from "@/models/cart.model";
import { getUserFromToken } from "@/utils/auth";

export const POST = async (request) => {
    await connectDB();
    const userId = await getUserFromToken();
    const cartItems = await Cart.find({ user: userId });
    if (cartItems.length === 0) {
        return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }
    const orderItems = await Order.create({
        user:userId,
        orderItems:cartItems.map((item) => ({
            plant: item.plant,
            quantity: item.quantity,
            price: item.discountedPrice,
            size: item.size,
            color: item.color,
        })),
        shippingAddress:{
            fullName: form.fullName,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
        },

    });

    return NextResponse.json({ message: "Order placed successfully", order: orderItems }, { status: 201 });
}

