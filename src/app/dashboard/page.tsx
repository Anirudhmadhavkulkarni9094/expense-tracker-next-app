"use client";

import ExpenseFrequencyChart from "@/components/chart/ExpenseFrequencyChart";
import ExpenseHistogram from "@/components/chart/ExpenseHistogram";
import ExpenseTable from "@/components/ExpenseTable/ExpenseTable";
import React from "react";

function Page() {
  return (
    <>
    <div className="flex flex-col md:flex-row gap-5 p-5">
      <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
        <ExpenseFrequencyChart />
      </div>
      <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
        <ExpenseHistogram />
      </div>
    </div>
    <div >
        <ExpenseTable/>
    </div>
    </>
  );
}

export default Page;
