import React from "react";

function ProfileBudget({ 
  salary = 65000, 
  expenses = 5000, 
  investments = 10000, 
  savings = 5000, 
  trip = 5000 
}) {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-lg border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-center">💰 Budget Overview</h2>
      <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
        <div className="bg-gray-800 p-3 rounded-lg flex justify-between">
          <span className="text-gray-400">Salary:</span>
          <span className="font-semibold text-green-400">₹{salary}</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg flex justify-between">
          <span className="text-gray-400">Expenses:</span>
          <span className="font-semibold text-red-400">₹{expenses}</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg flex justify-between">
          <span className="text-gray-400">Investments:</span>
          <span className="font-semibold text-blue-400">₹{investments}</span>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg flex justify-between">
          <span className="text-gray-400">Savings:</span>
          <span className="font-semibold text-yellow-400">₹{savings}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileBudget;
