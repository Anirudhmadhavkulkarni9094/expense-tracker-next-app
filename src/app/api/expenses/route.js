import { NextResponse } from "next/server";
import { dbConnect, Expense } from "@/app/api/utils/db";

export async function POST(req) {
  await dbConnect();
  const { userId, category, amount } = await req.json();

  const expense = new Expense({ userId, category, amount });
  await expense.save();

  return NextResponse.json(expense, { status: 201 });
}

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

  const expenses = await Expense.find({ userId });
  return NextResponse.json(expenses);
}

export async function PUT(req) {
  await dbConnect();
  const { id, category, amount } = await req.json();

  const updatedExpense = await Expense.findByIdAndUpdate(id, { category, amount }, { new: true });
  return NextResponse.json(updatedExpense);
}

export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  await Expense.findByIdAndDelete(id);
  return NextResponse.json({ message: "Expense deleted successfully" });
}
