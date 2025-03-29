"use client";

import React, { useEffect, useState } from "react";
import BudgetCard from "@/components/Card/BudgetCard";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/components/breadcrumbs/context/AuthContext";
import {motion} from "framer-motion";

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
  const { user } = useAuth();

  console.log("User in Home:", user);

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center">
          {loading ? (
            <p className="text-gray-400">Loading budget data...</p>
          ) : categories.length > 0 ? (
            <div className="flex gap-5 flex-wrap justify-center">
              {categories.map((category: any) => (
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
              <p className="text-gray-500 text-lg">
                No budget categories found.
              </p>
              <p className="text-gray-400 text-sm">
                Start by adding a category in the settings.
              </p>
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
      ) : (
        <div
          className="text-center p-8 flex flex-col items-center"
          
        >
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Budget Smarter, Live Better</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Gain complete control over your expenses with smart budgeting tools. Track your expenses, set goals, and save effortlessly.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">💰 Expense Tracking</h3>
              <p className="text-gray-500 mt-2">Monitor where your money goes in real-time.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">📊 Budget Planning</h3>
              <p className="text-gray-500 mt-2">Set spending limits and manage your financial goals.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700">📈 Smart Savings</h3>
              <p className="text-gray-500 mt-2">Automate savings and track your progress.</p>
            </div>
          </div>

          <div
            className="mt-10 flex space-x-4 flex-wrap items-center justify-center"
           
          >
            <Link
              href="/dashboard"
              className="bg-green-600 m-2 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Explore Features →
            </Link>
            <Link
              href="/about"
              className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Learn More →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
