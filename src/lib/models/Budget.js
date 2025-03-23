import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    limit: { type: Number, required: true },
    spent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
