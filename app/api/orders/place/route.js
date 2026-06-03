import { NextResponse } from "next/server";
import {createShiprocketOrder, getShiprocketToken} from "@/lib/shiprocket";
import connectDB from "@/lib/mongodb";

import Cart from "@/models/cart.model";
import Plant from "@/models/plant.model";

import Order from "@/models/order.model";

import { getUserFromToken } from "@/lib/getUserFromToken";

export const POST = async (request) => {
  try {
    await connectDB();

    const userId = await getUserFromToken();

    const data = await request.json();

    const { form, paymentResult,paymentMethod } = data;

    // GET USER CART
    if (
      !form.name ||
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

    for (const item of items) {
      const plant = await Plant.findById(item.plant);
      if (!plant) {
        return NextResponse.json(
          { message: "Plant not found" },
          { status: 404 },
        );
      }

      const variant = plant.variants.find((v) => v.size === item.size);

      if (!variant) {
        return NextResponse.json(
          { message: "Variant not found" },
          { status: 404 },
        );
      }

      if (variant.stock < item.quantity) {
        return NextResponse.json(
          { message: `${plant.plantName} is out of stock` },
          { status: 400 },
        );
      }

      
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
        shipping: item.shipping,

        plantSnapshot: {
          plantName: item.plantSnapshot.plantName,

          image: item.plantSnapshot.image,
        },
      })),

      shippingAddress: {
        fullName: form.name,

        phone: form.phone,

        address: form.address,

        city: form.city,

        state: form.state,

        pincode: form.pincode,
      },

      paymentResult: paymentResult
        ? {
            razorpay_payment_id: paymentResult.razorpay_payment_id,
            razorpay_order_id: paymentResult.razorpay_order_id,
            razorpay_signature: paymentResult.razorpay_signature,
            razorpay_status: paymentResult.razorpay_status,
          }
        : {},

      itemsPrice,

      shippingPrice,

      taxPrice,

      totalPrice,

      paymentMethod,

      paymentStatus: paymentMethod === "RAZORPAY" ? "PAID" : "PENDING",

      paidAt: paymentMethod === "COD" ?null: new Date()  ,

      orderStatus: "PLACED",

      isDelivered: false,

      deliveredAt: null,
    });

    try{

      const shiprocketOrder = await createShiprocketOrder(order);
      console.log("SHIPROCKET ORDER CREATED:", shiprocketOrder);

      order.shiprocketOrderId = shiprocketOrder.order_id;
      order.shipmentId = shiprocketOrder.shipment_id;
      order.awbCode = shiprocketOrder.awb_code;
      order.courierName = shiprocketOrder.courier_company_name;
      
      if(shiprocketOrder.awb_code){
        order.trackingUrl = `https://shiprocket.co/tracking/${shiprocketOrder.awb_code}`;
      }
      
      await order.save();
    }catch(error){
      console.log("SHIPROCKET ERROR:", error);
      return NextResponse.json({success: false, message:error.message}, {status:500})
    }

    for (const item of items) {
      const plant = await Plant.findById(item.plant);

      const variant = plant.variants.find((v) => v.size === item.size);

      variant.stock -= item.quantity;

      await plant.save();
    }

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
