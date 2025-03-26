import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbconnect";
import bcrypt from "bcryptjs";
import User from "../../../../lib/models/User";
import jwt from "jsonwebtoken";


const SECRET_KEY= process.env.SECRET_KEY

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    SECRET_KEY,
    { expiresIn: "7d" }
  );

  return NextResponse.json({ message: "User created successfully", token }, { status: 201 });
}
