import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",},
    comment:{
        type: String,
        required: [true, "Comment is required"],
        trim: true
    },
    rating:{
        type: Number,
        required:[true, "Rating is required"],
        min: 1,
        max: 5
    },
    plant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"plants",
        required: true
    }
  },{timestamps: true});

const reviewModel = mongoose.model("reviews", reviewSchema);

export default reviewModel;