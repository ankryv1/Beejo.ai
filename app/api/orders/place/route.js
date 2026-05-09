import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";

import Cart from "@/models/cart.model";
import Order from "@/models/order.model";

import { calculateShipping } from "@/utils/calculateShipping";

export async function POST(req) {

  await dbConnect();

  try {

    const body = await req.json();

    const { userId } = body;

    const cart = await Cart.findOne({
      user: userId
    });

    if (!cart || !cart.items.length) {
      return NextResponse.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    // subtotal
    const subtotal = cart.items.reduce(
      (sum, item) =>
        sum + item.discountedPrice * item.quantity,
      0
    );

    // shipping
    const {
      shippingCharge,
      reason
    } = calculateShipping(cart.items);

    // final amount
    const finalAmount =
      subtotal + shippingCharge;

    // create order
    const order = await Order.create({
      user: userId,

      items: cart.items,

      pricing: {
        subtotal,
        shippingCharge,
        finalAmount
      },

      shipping: {
        shippingReason: reason,
        shipmentStatus: "PENDING"
      }
    });

    return NextResponse.json({
      success: true,
      order
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: error.message
      },
      { status: 500 }
    );
  }
}