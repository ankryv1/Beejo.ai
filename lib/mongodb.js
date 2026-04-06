import mongoose from "mongoose";

const MONGO_URL=process.env.MONGO_URL

let cached = global.mongoose || {conn: null, promise:null};
global.mongoose = cached;

async function connectDB() {
    if(cached.conn)  return cached.conn;
    cached.promise = cached.promise || mongoose.connect(MONGO_URL);
    cached.conn = await cached.promise;
    console.log("MongoDB Connected");
    return cached.conn;
}

export default connectDB;