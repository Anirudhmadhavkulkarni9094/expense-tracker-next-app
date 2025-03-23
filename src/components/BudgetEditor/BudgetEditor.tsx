"use client";

import React, { useState, useEffect } from "react";

interface Category {
  name: string;
  allocatedAmount: number;
}

const BudgetEditor: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [allocatedAmount, setAllocatedAmount] = useState<number>(0);

  // Load categories from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem("budgetCategories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("budgetCategories", JSON.stringify(categories));
  }, [categories]);

  // Add a new category
  const addCategory = () => {
    if (newCategory.trim() !== "" && allocatedAmount > 0) {
      const updatedCategories = [...categories, { name: newCategory, allocatedAmount }];
      setCategories(updatedCategories);
      setNewCategory("");
      setAllocatedAmount(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">⚙️ Budget Settings</h2>

      {/* Add Category Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category name"
          className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          value={allocatedAmount}
          onChange={(e) => setAllocatedAmount(Number(e.target.value))}
          placeholder="Amount (₹)"
          className="w-32 p-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
        >
          Add
        </button>
      </div>

      {/* Display Categories */}
      <h3 className="text-xl font-semibold mt-6 mb-3">📊 Budget Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="flex justify-between bg-gray-800 p-3 rounded-lg mb-2">
            <span>{category.name}</span>
            <span className="text-blue-400 font-bold">₹{category.allocatedAmount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetEditor;
