import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY= process.env.SECRET_KEY


export function authenticate(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Returns { userId, email } if valid
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}