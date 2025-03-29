"use client";

import React, { useEffect, useState } from "react";
import BudgetCard from "@/components/Card/BudgetCard";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import {toast } from "react-toastify";

interface Category {
  _id?: string;
  name: string;
  allocatedAmount: number;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  // Function to get the token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          setLogged(true);
          return;
        }

        const response = await axios.get("/api/budget", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching budget categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center">
        {loading ? (
          <p className="text-gray-400">Loading budget data...</p>
        ) : categories.length > 0 ? (
          <div className="flex gap-5 flex-wrap justify-center">
            {categories.map((category:any) => (
              <BudgetCard
                key={category._id || category.name}
                title={category.category}
                allocatedAmount={category.limit}
                amountSpent={category.spent || 0} // Amount spent will be tracked separately
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-6">
            <p className="text-gray-500 text-lg">No budget categories found.</p>
            <p className="text-gray-400 text-sm">Start by adding a category in the settings.</p>
          </div>
        )}
        <Link
          href="/dashboard"
          className="mt-4 inline-block bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-xl"
        >
          Go to Dashboard &rarr;
        </Link>
        <Link
          href="/savings"
          className="mt-4 inline-block bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-xl"
        >
          Go to Savings &rarr;
        </Link>
      </div>
    </ProtectedRoute>
  );
}