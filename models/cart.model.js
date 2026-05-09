import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "plants",
    required: true
  },

  plantSnapshot: {
    plantName: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    }
  },

  size: {
    type: String,
    enum: ["SMALL", "MEDIUM", "LARGE"],
    required: true
  },

  color: {
    type: String,
    enum: ["WHITE", "BROWN", "BLACK"]
  },

  quantity: {
    type: Number,
    default: 1,
    min: 1
  },

  originalPrice: {
    type: Number,
    required: true
  },

  discountedPrice: {
    type: Number,
    required: true
  },

  // IMPORTANT FOR SHIPROCKET
  shipping: {
    weight: {
      type: Number, // in KG
      default: 0.5
    },

    length: {
      type: Number, // cm
      default: 10
    },

    breadth: {
      type: Number,
      default: 10
    },

    height: {
      type: Number,
      default: 10
    }
  }

}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
    index: true
  },

  items: [cartItemSchema],



}, { timestamps: true });

export default mongoose.models.carts ||
mongoose.model("carts", cartSchema);