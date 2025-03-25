import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbconnect";
import bcrypt from "bcryptjs";
import User from "../../../../lib/models/User";
import jwt from "jsonwebtoken";


const SECRET_KEY= "KJRABKDBVKDSJVBAKDBKALJSBACDL"

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Compare hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    SECRET_KEY,
    { expiresIn: "7d" } // 7-day expiry
  );

  return NextResponse.json({ message: "Login successful", token }, { status: 200 });
}
