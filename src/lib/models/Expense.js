import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    paymentMode: {type: String},
    bank: {type: String , default : 'Cash'},
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
