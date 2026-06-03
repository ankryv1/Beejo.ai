import { NextResponse } from "next/server";

import razor from "@/lib/razorpay";

export async function POST(request) {
  try {
    const body = await request.json();

    const { amount } = body;

    const options = {
      amount: amount * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,
    };

    const order =
      await razor.orders.create(
        options
      );

    return NextResponse.json(order);

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}