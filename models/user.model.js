import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength:5
    },
    role:{
        type: String,
        enum:["ADMIN", "USER"],
        default: "USER"
    }
}) 


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        const newHashP = await bcrypt.hash(this.password, 10);
        this.password = newHashP;
        next();
    }
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}


const userModel = mongoose.model("users", userSchema);




export default userModel;