import { useEffect, useState } from "react";
import AddBudget from "../component/AddBudget";
import { getBudgets } from "../function";
import EditBudget from "../component/EditBudget";

function Budget() {
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

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div className="w-5/6 h-screen p-4 sm:ml-64 mt-10 top-0">
      <h1 className="text-2xl font-semibold mb-10">Budget</h1>
      <AddBudget onSuccess={fetchBudgets} />
      <div className="p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {budgets.map((budget, index) => (
            <div
              key={budget.id}
              className={`w-[312px] h-[250px] rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 ${
                bgColors[index % bgColors.length]
              }`}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {budget.name}
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                ${budget.budget}
              </h3>
              <p className="text-sm text-gray-800 mb-1">
                {budget.recurrence === "monthly"
                  ? "Maandelijks"
                  : budget.recurrence === "yearly"
                  ? "Jaarlijks"
                  : "Eenmalig"}{" "}
                | {budget.start_date} - {budget.end_date}
              </p>
              <hr className="text-slate-700 h-2 mt-3 mb-3" />
              <div className="flex justify-center items-center">
                <button className="mr-2 bg-black text-[#bdb395] py-2 px-3 rounded-md items-center flex justify-center dark:text-white">
                  <svg
                    className="w-6 h-6 text-[#bdb395] dark:text-white mr-2 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                    />
                  </svg>
                  Delete
                </button>
                <EditBudget
                  budgetId={budget.id}
                  initialData={budget}
                  onclick={fetchBudgets}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Budget;
