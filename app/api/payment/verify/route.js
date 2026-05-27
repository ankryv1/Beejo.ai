import crypto from "crypto";
import Razorpay from "razorpay";

import { NextResponse }
from "next/server";

export async function POST(request) {

  try {

    const body =
      await request.json();

    const {
      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,
    } = body;

    // CREATE SIGNATURE STRING
    const sign =
      razorpay_order_id +"|"+razorpay_payment_id;

    // GENERATE EXPECTED SIGNATURE
    const expectedSign =
      crypto
        .createHmac(
          "sha256",

          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(sign.toString())
        .digest("hex");

    // COMPARE SIGNATURES
    const isAuthentic =
      expectedSign ===
      razorpay_signature;

    if (!isAuthentic) {

      return NextResponse.json(
        {
          success: false, message:"Invalid payment",
        },

        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,

      message:
        "Payment verified",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,

        message:
          "Verification failed",
      },

      { status: 500 }
    );
  }
}