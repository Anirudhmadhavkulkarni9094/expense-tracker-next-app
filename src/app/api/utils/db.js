// import dbConnect from "@/lib/dbConnect";
// import User from "@/lib/models/User";
// import Expense from "@/lib/models/Expense";
// import Budget from "@/lib/models/Budget";
// import SavingsGoal from "@/lib/models/SavingsGoal";

// export { dbConnect, User, Expense, Budget, SavingsGoal };

import mongoose from "mongoose";

const MONGODB_URI="mongodb+srv://anirudhkulkarni9094:DyeCNL0sIT0tRz4v@next-app-project.1ka41.mongodb.net/?retryWrites=true&w=majority&appName=Next-app-project";


if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log("🚀 MongoDB Connected Successfully!");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
