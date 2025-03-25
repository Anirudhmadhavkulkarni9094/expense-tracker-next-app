import { NextResponse } from "next/server";
import  dbConnect from "../../../lib/dbconnect";
import bcrypt from "bcryptjs";
import User from "../../../lib/models/User";

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
  try {
    await dbConnect();

    // Fetch all users and populate related fields
    const users = await User.find().select("-password").populate("budgets expenses");

    // Process users data
    const processedUsers = await Promise.all(
      users.map(async (user) => {
        // Calculate total expenses
        const totalExpenses = user.expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // Calculate total savings
        const totalSavings = user.savingsGoals.reduce((sum, goal) => sum + goal.savedAmount, 0);

        // Fetch user's salary (assuming it's stored in the user model)
        const salary = user.salary;

        // Calculate total investments (if stored in user model)
        const totalInvestments = user.investments;

        // Calculate leftover money
        const leftoverMoney = salary - totalInvestments - totalExpenses - totalSavings;
        return {
          _id: user._id,
          name: user.name,
          salary: user.salary,
          investments: user.investments,
          email: user.email,
          totalExpenses,
          totalSavings,
          leftoverMoney,
          budgets: user.budgets,
          savingsGoals: user.savingsGoals,
          expenses: user.expenses,
        };
      })
    );

    return NextResponse.json(processedUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


