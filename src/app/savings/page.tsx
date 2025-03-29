"use client";

import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/Button/Button";
import axios from "axios";

interface SavingGoal {
  _id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
}

export default function SavingsPage() {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editedAmount, setEditedAmount] = useState<{ [key: string]: string }>({});

  // Fetch savings goals from API
  const getToken = () => localStorage.getItem("token") || "";

  const fetchGoals = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await axios.get("/api/savings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching savings goals:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Add new savings goal
  const addGoal = async () => {
    if (!goalName.trim() || !targetAmount) {
      alert("Please enter a valid goal name and target amount.");
      return;
    }
    if (isNaN(Number(targetAmount)) || Number(targetAmount) <= 0) {
      alert("Target amount should be a positive number.");
      return;
    }

    try {
      const token = getToken();

      const response = await axios.post(
        "/api/savings",
        { name: goalName.trim(), targetAmount: parseFloat(targetAmount) },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      fetchGoals(); // Refresh goals list
      setGoalName("");
      setTargetAmount("");
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  // Edit Savings Goal (Update Saved Amount)
  const updateGoal = async (goalId: string) => {
    if (!editedAmount[goalId] || isNaN(Number(editedAmount[goalId]))) {
      alert("Enter a valid amount.");
      return;
    }

    try {
      const token = getToken();
      const response = await axios.put(
        "/api/savings",
        { id: goalId, savedAmount: parseFloat(editedAmount[goalId]) },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      fetchGoals(); // Refresh goals list
      setEditingGoalId(null);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-4">💰 Savings Goals</h1>
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold">Add New Goal</h2>
          <input
            type="text"
            placeholder="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="w-full p-2 mt-2 text-white bg-gray-700 rounded"
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full p-2 mt-2 text-white bg-gray-700 rounded"
          />
          <button onClick={addGoal} className="mt-3 bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            ➕ Add Goal
          </button>
        </div>

        {/* Display Goals */}
        <div className="space-y-4">
          {goals.length === 0 ? (
            <p className="text-gray-400">No savings goals yet. Add one!</p>
          ) : (
            goals.map((goal) => (
              <div key={goal._id} className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold">{goal.name}</h3>
                <p>🎯 Target: ₹{goal.targetAmount} | 💾 Saved: ₹{goal.savedAmount}</p>

                <div className="w-full bg-gray-700 h-4 rounded mt-2">
                  <div
                    className="bg-green-500 h-4 rounded"
                    style={{ width: `${Math.min((goal.savedAmount / goal.targetAmount) * 100, 100)}%` }}
                  ></div>
                </div>

                {/* Edit Saved Amount */}
                {editingGoalId === goal._id ? (
                  <div className="mt-3">
                    <input
                      type="number"
                      placeholder="Enter new saved amount"
                      value={editedAmount[goal._id] || ""}
                      onChange={(e) =>
                        setEditedAmount((prev) => ({ ...prev, [goal._id]: e.target.value }))
                      }
                      className="w-full p-2 text-white bg-gray-700 rounded"
                    />
                    <button
                      onClick={() => updateGoal(goal._id)}
                      className="mt-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    >
                      💾 Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingGoalId(goal._id)}
                    className="mt-3 bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    ✏ Edit
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
