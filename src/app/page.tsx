"use client";

import React, { useEffect, useState } from "react";
import BudgetCard from "@/components/Card/BudgetCard";
import Link from "next/link";

interface Category {
  name: string;
  allocatedAmount: number;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Load categories from localStorage on mount
  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem("budgetCategories");
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.error("Error loading budget categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <p className="text-gray-400">Loading budget data...</p>
      ) : categories.length > 0 ? (
        <div className="flex gap-5 flex-wrap justify-center">
          {categories.map((category, index) => (
            <BudgetCard
              key={index}
              title={category.name}
              allocatedAmount={category.allocatedAmount}
              amountSpent={0} // Amount spent will be tracked separately
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
    </div>
  );
}
