import { NextResponse } from "next/server";
import { dbConnect, User } from "@/app/api/utils/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();
  
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}

export async function GET(req) {
  await dbConnect();
  const users = await User.find().select("-password"); // Exclude password
  return NextResponse.json(users);
}
