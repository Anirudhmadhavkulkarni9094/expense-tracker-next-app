"use client";

import React, { useState, useEffect } from "react";

interface SavingGoal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
}

export default function SavingsPage() {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [customAmounts, setCustomAmounts] = useState<{ [key: number]: string }>({});
  const [spendAmounts, setSpendAmounts] = useState<{ [key: number]: string }>({});

  // Load savings goals from localStorage on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem("savingsGoals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem("savingsGoals", JSON.stringify(goals));
  }, [goals]);

  // Add new savings goal
  const addGoal = () => {
    if (!goalName.trim() || !targetAmount) {
      alert("Please enter a valid goal name and target amount.");
      return;
    }
    if (isNaN(Number(targetAmount)) || Number(targetAmount) <= 0) {
      alert("Target amount should be a positive number.");
      return;
    }
    if (goals.some((goal) => goal.name.toLowerCase() === goalName.toLowerCase())) {
      alert("A goal with this name already exists.");
      return;
    }

    const newGoal: SavingGoal = {
      id: Date.now(),
      name: goalName.trim(),
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0,
    };

    setGoals([...goals, newGoal]);
    setGoalName("");
    setTargetAmount("");
  };

  // Update saved amount with custom value
  const updateSavedAmount = (id: number) => {
    const amount = customAmounts[id];
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === id) {
          const newSavedAmount = Math.min(goal.savedAmount + parseFloat(amount), goal.targetAmount);
          return { ...goal, savedAmount: newSavedAmount };
        }
        return goal;
      })
    );

    setCustomAmounts({ ...customAmounts, [id]: "" });
  };

  // Spend amount from savings
  const spendFromSavings = (id: number) => {
    const amount = spendAmounts[id];
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid amount to spend.");
      return;
    }
    
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === id) {
          const newSavedAmount = Math.max(goal.savedAmount - parseFloat(amount), 0);
          return { ...goal, savedAmount: newSavedAmount };
        }
        return goal;
      })
    );

    setSpendAmounts({ ...spendAmounts, [id]: "" });
  };

  // Delete savings goal
  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">💰 Savings Goals</h1>

      {/* Add New Goal */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold">Add New Goal</h2>
        <input
          type="text"
          placeholder="Goal Name (e.g., Car, Vacation)"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className="w-full p-2 mt-2 text-white rounded"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="w-full p-2 mt-2 text-white rounded"
        />
        <button
          onClick={addGoal}
          className="mt-3 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Goal
        </button>
      </div>

      {/* Display Goals */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-gray-400">No savings goals yet. Add one!</p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{goal.name}</h3>
              <p>
                🎯 Target: ₹{goal.targetAmount} | 💾 Saved: ₹{goal.savedAmount}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 h-4 rounded mt-2">
                <div
                  className="bg-green-500 h-4 rounded transition-all duration-300"
                  style={{ width: `${Math.min((goal.savedAmount / goal.targetAmount) * 100, 100)}%` }}
                ></div>
              </div>

              {/* Custom Amount Input and Update Button */}
              <div className="flex gap-2 mt-3">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmounts[goal.id] || ""}
                  onChange={(e) => setCustomAmounts({ ...customAmounts, [goal.id]: e.target.value })}
                  className="p-2 text-white rounded"
                />
                <button
                  onClick={() => updateSavedAmount(goal.id)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  ➕ Add
                </button>
                <input
                  type="number"
                  placeholder="Spend amount"
                  value={spendAmounts[goal.id] || ""}
                  onChange={(e) => setSpendAmounts({ ...spendAmounts, [goal.id]: e.target.value })}
                  className="p-2 text-white rounded"
                />
                <button
                  onClick={() => spendFromSavings(goal.id)}
                  className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
                >
                  ➖ Spend
                </button>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
