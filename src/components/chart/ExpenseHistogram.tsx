"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Define categories
const categories = ["Food & Drinks", "Travel", "Shopping", "Entertainment", "Bills", "Other"];

// Mock Data: Random amount spent per category for past & current month (₹1000 - ₹10000)
const generateRandomAmount = () => categories.map(() => Math.floor(Math.random() * 9000) + 1000);

const categoryExpenses = {
  lastMonth: generateRandomAmount(),
  currentMonth: generateRandomAmount(),
};

// Chart Data Setup
const data = {
  labels: categories,
  datasets: [
    {
      label: "Last Month (₹ Spent)",
      data: categoryExpenses.lastMonth,
      backgroundColor: "rgba(54, 162, 235, 0.7)",
      borderRadius: 5,
    },
    {
      label: "This Month (₹ Spent)",
      data: categoryExpenses.currentMonth,
      backgroundColor: "rgba(255, 99, 132, 0.7)",
      borderRadius: 5,
    },
  ],
};

// Chart Options
const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "₹ Spent per Category" },
      grid: { color: "rgba(200, 200, 200, 0.3)" },
    },
    x: { title: { display: true, text: "Expense Categories" } },
  },
};

const ExpenseHistogram = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Category-Wise Expense Comparison (₹)
      </h2>
      <div className="h-72 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseHistogram;
