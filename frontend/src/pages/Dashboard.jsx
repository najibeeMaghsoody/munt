import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Chart from "../component/Chart";
import AddBudget from "../component/AddBudget";
import IconsList from "../component/IconsList";

const Dashboard = () => {
  const bgColors = [
    "bg-[#B7B1F2]",
    "bg-[#A6D6D6]",
    "bg-[#F4F8D3]",
    "bg-[#F7CFD8]",
    "bg-[#9FB3DF]",
    "bg-[#A5B68D]",
    "bg-[#C599B6]",
  ];
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);
  return (
    <>
      <div className="w-5/6 p-4 sm:ml-64 mt-10 top-0  ">
        <div className="p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-48 mb-4 rounded-sm dark:bg-gray-800">
              <span className="text-2xl text-gray-400 dark:text-gray-500">
                <Profile />
              </span>
            </div>
            <div>
              <Chart />
            </div>
          </div>
          {/* Budget Card */}
          <div className="w-5/6 p-4 sm:ml-64 mt-10 top-0">
            <h1 className="text-2xl font-semibold mb-10 ">Budget</h1>
      
            <div className="p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {budgets.map((budget, index) => (
                  <div
                    key={budget.id}
                    className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 ${
                      bgColors[index % bgColors.length]
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {budget.category?.name || "No Category"}
                    </h3>
                    <p className="text-sm text-gray-500">${budget.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
