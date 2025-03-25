import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbconnect";
import Budget from "../../../lib/models/Budget";
import User from "../../../lib/models/User";
import { authenticate } from "../../../lib/auth"; // Authentication middleware
import Expense from "@/lib/models/Expense";
import mongoose from "mongoose";


export async function POST(req) {
  await dbConnect();
  
  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const { category, limit } = await req.json();
  const userId = auth.userId; // Extract userId from token

  // Check if the category already exists for the user
  const existingBudget = await Budget.findOne({ userId, category });
  if (existingBudget) {
    return NextResponse.json({ error: "Category already exists!" }, { status: 400 });
  }

  // Fetch total spent for this category
  const totalSpent = await Expense.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), category } }, // Ensure userId matches properly
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const spent = totalSpent.length > 0 ? totalSpent[0].total : 0; // Set spent amount

  // Create a new budget entry
  const budget = new Budget({ userId, category, limit, spent });
  await budget.save();

  await User.findByIdAndUpdate(userId, { $push: { budgets: budget._id } });

  return NextResponse.json(budget, { status: 201 });
}

export async function GET(req) {
  await dbConnect();
  
  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const userId = auth.userId; // Extract userId from token
  const budgets = await Budget.find({ userId });

  return NextResponse.json(budgets);
}

export async function PUT(req) {
  await dbConnect();
  
  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const { id, limit } = await req.json();
  const updatedBudget = await Budget.findOneAndUpdate(
    { _id: id, userId: auth.userId }, // Ensure user can only update their budgets
    { limit },
    { new: true }
  );

  if (!updatedBudget) {
    return NextResponse.json({ error: "Budget not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json(updatedBudget);
}

export async function DELETE(req) {
  await dbConnect();
  
  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const url = new URL(req.url); // Extract the ID from the URL query parameters
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const budget = await Budget.findOneAndDelete({ _id: id, userId: auth.userId });

  if (!budget) {
    return NextResponse.json({ error: "Budget not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ message: "Budget deleted successfully" });
}
