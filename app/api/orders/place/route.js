import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Cart from "@/models/cart.model";

import Order from "@/models/order.model";

import { getUserFromToken } from "@/lib/getUserFromToken";

export const POST = async (request) => {
  try {
    await connectDB();

    const userId = await getUserFromToken();

    const data = await request.json();

    const { form, paymentResult } = data;

    // GET USER CART
    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      return NextResponse.json(
        { message: "All shipping fields are required" },
        { status: 400 },
      );
    }
    const cart = await Cart.findOne({
      user: userId,
    });

    // CART NOT FOUND
    if (!cart || !cart.items) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const items = cart.items;

    // EMPTY CART
    if (items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    // PRICE CALCULATIONS
    const itemsPrice = items.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0,
    );

    const shippingPrice = itemsPrice > 500 ? 0 : 50;

    const taxPrice = 0;

    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // CREATE ORDER
    const order = await Order.create({
      user: userId,

      orderItems: items.map((item) => ({
        plant: item.plant,

        quantity: item.quantity,

        price: item.discountedPrice,

        size: item.size,

        color: item.color,

        plantSnapshot: {
          plantName: item.plantSnapshot.plantName,

          image: item.plantSnapshot.image,
        },
      })),

      shippingAddress: {
        fullName: form.fullName,

        phone: form.phone,

        address: form.address,

        city: form.city,

        state: form.state,

        pincode: form.pincode,
      },

      paymentResult: paymentResult? {
            id: paymentResult.id,

            status: paymentResult.status,
          }
        : {},

      itemsPrice,

      shippingPrice,

      taxPrice,

      totalPrice,

      paymentMethod: paymentResult ? "RAZORPAY" : "COD",

      paymentStatus: paymentResult ? "PAID" : "PENDING",

      paidAt: paymentResult ? new Date() : null,

      orderStatus: "PLACED",

      isDelivered: false,

      deliveredAt: null,
    });

    // CLEAR CART
    cart.items = [];

    await cart.save();

    return NextResponse.json(
      {
        success: true,

        message: "Order placed successfully",

        order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("ORDER CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Failed to place order",
      },
      { status: 500 },
    );
  }
};
