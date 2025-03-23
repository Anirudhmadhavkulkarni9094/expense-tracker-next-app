"use client";

import React from "react";

function BudgetCard({
  title,
  amountSpent,
  allocatedAmount,
}: {
  title: string;
  amountSpent: number;
  allocatedAmount: number;
}) {
  const remainingAmount = allocatedAmount - amountSpent;
  const isUnderBudget = amountSpent <= allocatedAmount;
  const colorClass = isUnderBudget ? "bg-green-500" : "bg-red-500";
  const icon = isUnderBudget ? "✅" : "⚠️";
  const percentage = Math.min((amountSpent / allocatedAmount) * 100, 100);

  return (
    <div className="flex flex-col bg-gray-800 p-6 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow w-80 m-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-xl">{icon}</span>
      </div>

      <div className="mb-2 text-sm text-gray-300">Allocated Amount</div>
      <div className="text-xl font-bold">₹{allocatedAmount}</div>

      <div className="mb-2 mt-4 text-sm text-gray-300">Remaining Amount</div>
      <div
        className={`text-xl font-bold ${
          isUnderBudget ? "text-green-400" : "text-red-400"
        }`}
      >
        ₹{remainingAmount}
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-full mt-4 overflow-hidden">
        <div
          className={`h-2 ${colorClass} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {percentage > 75 && <div>⚠️ {percentage}% of budget spent</div>}
    </div>
  );
}

export default BudgetCard;
