import connectDB from "../utils/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "✅ Database connected successfully!" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "❌ Database connection failed!" }, { status: 500 });
  }
}
