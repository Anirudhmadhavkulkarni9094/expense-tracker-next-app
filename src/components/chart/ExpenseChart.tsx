"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Expense {
  category: string;
  amount: number;
}

const ExpenseChart = ({ expenses }: { expenses: Expense[] }) => {
  // Group expenses by category
  const categoryTotals: { [key: string]: number } = {};
  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expense (₹)",
        data: Object.values(categoryTotals),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-96">
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Expense Breakdown</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
