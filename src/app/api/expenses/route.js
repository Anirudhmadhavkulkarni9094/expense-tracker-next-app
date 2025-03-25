import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbconnect";
import Expense from "../../../lib/models/Expense";
import User from "../../../lib/models/User";
import { authenticate } from "../../../lib/auth"; // Authentication middleware
import Budget from "../../../lib/models/Budget";
export async function POST(req) {
  await dbConnect();

  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const { category, amount, name, paymentMode, bank } = await req.json();
  const userId = auth.userId; // Extract userId from token

  // Create new expense
  const expense = new Expense({ userId, category, name, paymentMode, amount, bank });
  await expense.save();

  // Update the budget for this category
  const budget = await Budget.findOne({ userId, category });

  if (budget) {
    await Budget.findOneAndUpdate(
      { userId, category },
      { $inc: { spent: +amount } }, // Reduce budget limit by expense amount
      { new: true }
    );
  }

  // Associate the expense with the user
  await User.findByIdAndUpdate(userId, { $push: { expenses: expense._id } });

  return NextResponse.json(expense, { status: 201 });
}

export async function GET(req) {
  await dbConnect();

  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const userId = auth.userId; // Extract userId from token
  const expenses = await Expense.find({ userId });

  return NextResponse.json(expenses);
}

export async function PUT(req) {
  await dbConnect();

  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const { id, category, amount } = await req.json();
  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: id, userId: auth.userId }, // Ensure user can only update their expenses
    { category, amount },
    { new: true }
  );

  if (!updatedExpense) {
    return NextResponse.json({ error: "Expense not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json(updatedExpense);
}

export async function DELETE(req) {
  await dbConnect();

  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const userId = auth.userId; // Extract userId from token

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  // Fetch the expense to get its details before deletion
  const expense = await Expense.findOne({ _id: id, userId });

  if (!expense) {
    return NextResponse.json({ error: "Expense not found or unauthorized" }, { status: 404 });
  }

  // Update the budget spent amount
  const budget = await Budget.findOne({ userId, category: expense.category });

  if (budget) {
    await Budget.findOneAndUpdate(
      { userId, category: expense.category },
      { $inc: { spent: -expense.amount } }, // Reduce spent amount
      { new: true }
    );
  }

  // Delete the expense
  await Expense.findByIdAndDelete(id);

  return NextResponse.json({ message: "Expense deleted successfully" });
}
