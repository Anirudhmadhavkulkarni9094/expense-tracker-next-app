"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../Button/Button";

interface Category {
  _id: string;
  category: string;
  limit: number;
}

const categoryOptions = [
  "Food & Drinks",
  "Travel",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Other",
];

const BudgetEditor: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [allocatedAmount, setAllocatedAmount] = useState<number>(0);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState<number>(0);

  const getToken = () => localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await axios.get("/api/budget", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories. Please try again later.");
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (allocatedAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (categories.some((category) => category.category === selectedCategory)) {
      toast.error("Category already exists!");
      return;
    }

    const newCategory = { category: selectedCategory, limit: allocatedAmount };
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.post("/api/budget", newCategory, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories([...categories, response.data]);
      setAllocatedAmount(0);
      toast.success("Category Added Successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Error adding category. Please try again later.");
    }
  };

  const deleteCategory = async (id: string) => {
    const token = getToken();
    if (!token) return;

    try {
      await axios.delete(`/api/budget?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.info("Category Deleted Successfully!");
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category. Please try again later.");
    }
  };

  const updateCategory = async (id: string) => {
    if (editAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      await axios.put(
        `/api/budget`,
        { id, limit: editAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategories(
        categories.map((category) =>
          category._id === id ? { ...category, limit: editAmount } : category
        )
      );
      setEditingCategory(null);
      toast.success("Category Updated Successfully");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category. Please try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">⚙️ Budget Settings</h2>
      
      <div className="flex gap-2 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-lg border border-gray-600"
        >
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={allocatedAmount}
          onChange={(e) => setAllocatedAmount(Number(e.target.value))}
          placeholder="Amount (₹)"
          className="w-32 p-2 bg-gray-700 rounded-lg border border-gray-600"
        />
        <Button onClick={addCategory} color="green" className="p-2" width="140" borderRadius={10}>
          Add
        </Button>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">📊 Budget Categories</h3>
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="p-3 border border-gray-700 w-1/2">Category</th>
            <th className="p-3 border border-gray-700 w-1/2">Limit (₹)</th>
            <th className="p-3 border border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="bg-gray-800">
              <td className="p-3 border border-gray-700">{category.category}</td>
              <td className="p-3 border border-gray-700">
                {editingCategory === category._id ? (
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(Number(e.target.value))}
                    className="w-20 p-1 bg-gray-700 rounded-lg border border-gray-600"
                  />
                ) : (
                  <span className="text-blue-400 font-bold">₹{category.limit}</span>
                )}
              </td>
              <td className="p-3 border border-gray-700 flex gap-2">
                {editingCategory === category._id ? (
                  <Button onClick={() => updateCategory(category._id)}>✅</Button>
                ) : (
                  <Button onClick={() => { setEditingCategory(category._id); setEditAmount(category.limit); }} width="40">✏️</Button>
                )}
                <Button onClick={() => deleteCategory(category._id)}>❌</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetEditor;
