"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-white">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Budget Tracker</h1>
        <p className="text-lg text-gray-300">
          Your go-to solution for managing finances efficiently. Track your income, expenses, and savings with ease.
        </p>
      </section>

      {/* Features Section */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">💰 Budget Planning</h3>
          <p className="text-gray-400 mt-2">Allocate your salary effectively across different expense categories.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">📊 Expense Tracking</h3>
          <p className="text-gray-400 mt-2">Monitor and categorize your spending to stay on top of your finances.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">📈 Investment Insights</h3>
          <p className="text-gray-400 mt-2">Keep track of your investments and make smarter financial decisions.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">🌍 Financial Goals</h3>
          <p className="text-gray-400 mt-2">Set savings goals for trips, purchases, or future investments.</p>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <Link href="/settings">
          <span className="bg-green-600 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-xl text-lg cursor-pointer">
            Get Started 🚀
          </span>
        </Link>
      </div>
    </div>
  );
}
