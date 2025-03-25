import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbconnect";
import Expense from "../../../lib/models/Expense";
import ExcelJS from "exceljs";
import os from "os";
import path from "path";
import Budget from "../../../lib/models/Budget";


export async function POST(req) {
  try {
    await dbConnect();
    const { userId } = await req.json();

    // Fetch user's expenses
    const expenses = await Expense.find({ userId });

    if (expenses.length === 0) {
      return NextResponse.json({ message: "No expenses found for this user." }, { status: 404 });
    }

    // ✅ Generate Excel File
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expenses");

    // Define columns
    worksheet.columns = [
      { header: "Date", key: "date", width: 15 },
      { header: "Category", key: "category", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Description", key: "description", width: 30 },
    ];

    // Add rows
    expenses.forEach((expense) => {
      worksheet.addRow({
        date: expense.date.toISOString().split("T")[0],
        category: expense.category,
        amount: expense.amount,
        description: expense.description || "N/A",
      });
    });

    // ✅ Get the "Downloads" folder path
    const downloadsFolder = path.join(os.homedir(), "Downloads");
    const filePath = path.join(downloadsFolder, `expenses_${userId}.xlsx`);

    // Save the file in the Downloads folder
    await workbook.xlsx.writeFile(filePath);

    // Delete all expenses for the new month
    await Budget.updateMany({ userId }, { $set: { spent: 0 } });
    await Expense.deleteMany({ userId });

    return NextResponse.json({ message: `File saved to ${filePath}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
