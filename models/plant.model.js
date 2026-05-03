import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["SMALL", "MEDIUM", "LARGE"],
    required: true
  },
  originalPrice: {
    type: Number,
    required: true,
    min: 1
  },
  discountedPrice: {
    type: Number,
    required: true,
    min: 1
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  }
}, { _id: false });

const plantSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: [true, "Plant name is required"],
    trim: true,
    index: true
  },

  description: {
    type: String,
    required: [true, "description is required"]
  },

  images: {
    type: [String],
    required: [true, "At least one image is required"]
  },

  category: {
    type: String,
    index: true,
    uppercase: true,
    trim: true,
    required: true,
    enum: [
      "FRUITS", "INDOOR", "OUTDOOR",
      "AIR_PURIFIER", "DECORATIVE",
      "BEST_SELLING", "SUMMER_SPECIAL", "POPULAR"
    ]
  },

  variants: [variantSchema],   

  availableColors: {
    type: [String],
    enum: ["WHITE", "BROWN", "BLACK"]
  },

  rating: {
    type: Number,
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "reviews"
  }],

  lightRequirements: {
    type: String,
    enum: ["FULL_SHADE", "PARTIAL_SHADE", "PARTIAL_SUN", "FULL_SUN"],
    required: true
  },

  wateringRequirements: {
    type: String,
    required: true
  },

  petFriendly: {
    type: Boolean,
    default: false
  },

  difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
    default: "EASY"
  }

}, { timestamps: true });

const plantModel =
  mongoose.models.plants || mongoose.model("plants", plantSchema);

export default plantModel;