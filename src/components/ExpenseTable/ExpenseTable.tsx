"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const categories = [
  "Food & Drinks",
  "Travel",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Other",
];

const ExpenseTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [newExpense, setNewExpense] = useState({
    name: "",
    category: categories[0],
    paymentMode: "Offline",
    bank: "Cash",
    amount: "",
  });

  // Fetch expenses from API
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // Redirect to login if no token
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        toast.error("Error fetching expenses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [router]);

  // Handle adding an expense
  const handleAddExpense = async () => {
    if (!newExpense.name || !newExpense.amount) {
      toast.error("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/expenses", newExpense, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses([...expenses, res.data]); // Add the new expense from API response
      setShowModal(false);
      setNewExpense({ name: "", category: categories[0], paymentMode: "Online", bank: "SBI", amount: "" });
      toast.success("Expense added successfully");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Error adding expense. Please try again later.");
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/expenses?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted expense from the state
      setExpenses(expenses.filter((expense) => expense._id !== id));
      toast.info("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Error deleting expense. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Loading State */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expenses added yet.</p>
      ) : (
        <>
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
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense: any, index) => (
                  <tr key={expense._id} className="border-b">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{expense.name}</td>
                    <td className="p-2">{expense.category}</td>
                    <td className="p-2">{expense.paymentMode}</td>
                    <td className="p-2">{expense.bank}</td>
                    <td className="p-2 font-semibold">₹{expense.amount}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteExpense(expense._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Add Expense Button (Always Visible) */}
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
            {newExpense.paymentMode === "Online" && (
              <select
                value={newExpense.bank}
                onChange={(e) => setNewExpense({ ...newExpense, bank: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="SBI">SBI</option>
                <option value="KOTAK">KOTAK</option>
              </select>
            )}
            <input
              type="number"
              placeholder="Amount (₹)"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handleAddExpense} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
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
