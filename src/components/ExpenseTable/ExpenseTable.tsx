"use client";

import React, { useState } from "react";

const categories = ["Food & Drinks", "Travel", "Shopping", "Entertainment", "Bills", "Other"];

const ExpenseTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", category: "Food & Drinks", paymentMode: "Online", bank: "SBI", amount: 1200 },
    { id: 2, name: "Cab Ride", category: "Travel", paymentMode: "Offline", bank: "KOTAK", amount: 500 },
  ]);

  const [newExpense, setNewExpense] = useState({
    name: "",
    category: categories[0], 
    paymentMode: "Online",
    bank: "SBI",
    amount: "",
  });

  // Handle form submission
  const handleAddExpense = () => {
    if (!newExpense.name || !newExpense.amount) {
      alert("Please fill all fields");
      return;
    }
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense, amount: Number(newExpense.amount) }]);
    setShowModal(false);
    setNewExpense({ name: "", category: categories[0], paymentMode: "Online", bank: "SBI", amount: "" });
  };

  return (
    <div className="bg-white h-96 p-4 rounded-lg shadow-md">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">S.No</th>
              <th className="p-2 text-left">Expense Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Payment Mode</th>
              <th className="p-2 text-left">Bank</th>
              <th className="p-2 text-left">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense.id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{expense.name}</td>
                <td className="p-2">{expense.category}</td>
                <td className="p-2">{expense.paymentMode}</td>
                <td className="p-2">{expense.bank}</td>
                <td className="p-2 font-semibold">₹{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add Expense
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
            <input
              type="text"
              placeholder="Expense Name"
              value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={newExpense.paymentMode}
              onChange={(e) => setNewExpense({ ...newExpense, paymentMode: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            <select
              value={newExpense.bank}
              onChange={(e) => setNewExpense({ ...newExpense, bank: e.target.value })}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="SBI">SBI</option>
              <option value="KOTAK">KOTAK</option>
            </select>
            <input
              type="number"
              placeholder="Amount (₹)"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
