import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import Budget from "./Budget";

import { getBudgets } from "../function";
import Chart from "../component/Chart";

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgets();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetchBudgets();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center dark:mt-80">
      <div className="w-5/6 p-4 mt-2 top-0 dark:mt-96 ">
        <h1 className="text-2xl font-semibold mb-10 ml-24 mt-10">
          Dashboard Budget Tracker ♥
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 mb-6 m-20">
          <div className="col-span-1 ">
            <Profile />
          </div>
          <div className="col-span-2">
            <Chart />
          </div>
        </div>
      </div>
      <div>
        <Budget />
      </div>
    </div>
  );
};
export default Dashboard;
