import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
    plantName:{
        type:String,
        required: [true, "Plant name is required"],
        trim: true
    },
    description:{
        type: String,
        required:[true, "description is required"]
    },
    originalPrice:{
        type: Number,
        required: true,
        min:1
    },
    discountedPrice:{
        type: Number,
        required: true,
        min:1,
        validate:{
            validator: function(value) {
                return value < this.originalPrice
            },
            message:"Discounted Price should be less than the original price"
        }
    },
    images:{
        type: [String],
        required:[true, "At least one image is required"],
    },
    category:{
        type: String,
        index: true,
        uppercase: true,
        trim: true,
        required: true,
        enum:["FRUITS", "INDOOR", "OUTDOOR" , "AIR_PURIFIER", "DECORATIVE", "BEST_SELLING", "SUMMER_SPECIAL", "POPULAR"]
    },
    stock:{
        type: Number,
        default: 0,
        min:0
    },
    rating:{
        type: Number,
        default:0
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }],
    lightRequirements:{
        type:String,
        enum:["FULL_SHADE", "PARTIAL_SHADE", "PARTIAL_SUN", "FULL_SUN"],
        required: [true, "Light requirements is required"]
    },
    wateringRequirements:{
        type:String,
        required: [true, "Watering requirements is required"]
    },
    petFrendly:{
        type: Boolean,
        default:false
    },
    difficulty:{
        type: String,
        enum:["EASY", "MEDIUM", "HARD"],
        default: "EASY"
    }

}, {timestamps: true})

const plantModel = mongoose.models.plants || mongoose.model("plants" , plantSchema);

export default plantModel;