import { NextResponse } from "next/server";
import { dbConnect, Expense } from "@/app/api/utils/db";

export async function POST(req) {
  await dbConnect();
  const { userId } = await req.json();

  // Fetch expenses
  const expenses = await Expense.find({ userId });

  // TODO: Generate and send a downloadable PDF/Excel file (to be implemented)

  // Delete all expenses for new month
  await Expense.deleteMany({ userId });

  return NextResponse.json({ message: "Monthly expenses reset successfully" });
}
