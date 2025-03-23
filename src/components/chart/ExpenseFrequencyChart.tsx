"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

// Generate mock data for 30 days (Transaction Amounts)
const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

// Random daily expense amounts (₹500 - ₹5000 per day)
const generateRandomAmount = () => days.map(() => Math.floor(Math.random() * 4500) + 500);

const expenseData = {
  lastMonth: generateRandomAmount(),
  currentMonth: generateRandomAmount(),
};

// Chart Data Setup
const data = {
  labels: days,
  datasets: [
    {
      label: "Last Month (₹ Spent)",
      data: expenseData.lastMonth,
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54, 162, 235, 0.3)",
      pointRadius: 4,
      pointBackgroundColor: "#36A2EB",
      tension: 0.4,
    },
    {
      label: "This Month (₹ Spent)",
      data: expenseData.currentMonth,
      borderColor: "#FF6384",
      backgroundColor: "rgba(255, 99, 132, 0.3)",
      pointRadius: 4,
      pointBackgroundColor: "#FF6384",
      tension: 0.4,
    },
  ],
};

// Chart Options
const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    tooltip: { mode: "nearest", intersect: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "₹ Spent per Day" },
      grid: { color: "rgba(200, 200, 200, 0.3)" },
    },
    x: { title: { display: true, text: "Days of the Month" } },
  },
};

const ExpenseFrequencyChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Daily Expense Amount Comparison (₹)
      </h2>
      <div className="h-72 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseFrequencyChart;
