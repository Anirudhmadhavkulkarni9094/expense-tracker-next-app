import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbconnect";
import SavingsGoal from "../../../lib/models/SavingsGoal";
import User from "../../../lib/models/User";
import  {authenticate}  from "../../../lib/auth"; // Authentication middleware

export async function POST(req) {
  try {
    await dbConnect();

    const auth = authenticate(req); // Verify user\
    if (auth.error) return auth; // Return unauthorized response

    const { name, targetAmount } = await req.json();
    const userId = auth.userId; // Extract userId from token


    // Create and save savings goal
    const savingsGoal = new SavingsGoal({ userId, name, targetAmount });
    await savingsGoal.save();

    // Update user's savingsGoals array
    await User.findByIdAndUpdate(userId, { $push: { savingsGoals: savingsGoal._id } });

    return NextResponse.json(savingsGoal, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();

  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const userId = auth.userId; // Extract userId from token
  const savingsGoals = await SavingsGoal.find({ userId });

  return NextResponse.json(savingsGoals);
}

export async function PUT(req) {
  await dbConnect();

  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const { id, savedAmount } = await req.json();

  const updatedGoal = await SavingsGoal.findOneAndUpdate(
    { _id: id, userId: auth.userId }, // Ensure user can only update their savings goals
    { savedAmount },
    { new: true }
  );

  if (!updatedGoal) {
    return NextResponse.json({ error: "Savings goal not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json(updatedGoal);
}

export async function DELETE(req) {
  await dbConnect();

  const auth = authenticate(req); // Verify user
  if (auth.error) return auth; // Return unauthorized response

  const { id } = await req.json();
  const goal = await SavingsGoal.findOneAndDelete({ _id: id, userId: auth.userId });

  if (!goal) {
    return NextResponse.json({ error: "Savings goal not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ message: "Savings goal deleted successfully" });
}
