import { NextResponse } from "next/server";
import { dbConnect, SavingsGoal } from "@/app/api/utils/db";

export async function POST(req) {
  await dbConnect();
  const { userId, name, targetAmount } = await req.json();

  const savingsGoal = new SavingsGoal({ userId, name, targetAmount });
  await savingsGoal.save();

  return NextResponse.json(savingsGoal, { status: 201 });
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

  const savingsGoals = await SavingsGoal.find({ userId });
  return NextResponse.json(savingsGoals);
}

export async function PUT(req) {
  await dbConnect();
  const { id, savedAmount } = await req.json();

  const updatedGoal = await SavingsGoal.findByIdAndUpdate(id, { savedAmount }, { new: true });
  return NextResponse.json(updatedGoal);
}

export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  await SavingsGoal.findByIdAndDelete(id);
  return NextResponse.json({ message: "Savings goal deleted successfully" });
}
