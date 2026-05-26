import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderItems: [ 
      {
        plant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "plants",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 1,
        },
        plantSnapshot: {
          plantName: String,
          image: String,
        },
        size: String,
        color: String,
      },
    ],
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    itemsPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      min: 0,

    },
    taxPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shiprocketOrderId: String,

    shipmentId: String,

    awbCode: String,

    courierName: String,

    trackingUrl: String,
    paymentStatus: {
      type: String,

      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],

      default: "PENDING",
    },

    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paymentMethod: {
      type: String,

      enum: ["COD", "RAZORPAY"],

      default: "COD",
    },
    orderStatus: {
      type: String,

      enum: [
        "PLACED",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],

      default: "PLACED",
    },
  },

  { timestamps: true },
);

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;
