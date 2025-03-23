import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    budgets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Budget" }],
    savingsGoals: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavingsGoal" }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
