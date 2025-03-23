import { NextResponse } from "next/server";
import { dbConnect, Budget } from "@/app/api/utils/db";

export async function POST(req) {
  await dbConnect();
  const { userId, category, limit } = await req.json();

  const budget = new Budget({ userId, category, limit });
  await budget.save();

  return NextResponse.json(budget, { status: 201 });
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

  const budgets = await Budget.find({ userId });
  return NextResponse.json(budgets);
}

export async function PUT(req) {
  await dbConnect();
  const { id, limit } = await req.json();

  const updatedBudget = await Budget.findByIdAndUpdate(id, { limit }, { new: true });
  return NextResponse.json(updatedBudget);
}

export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  await Budget.findByIdAndDelete(id);
  return NextResponse.json({ message: "Budget deleted successfully" });
}
