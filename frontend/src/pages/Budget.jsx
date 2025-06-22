import { useEffect, useState } from "react";
import AddBudget from "../component/AddBudget";
import { getBudgets } from "../function";
import EditBudget from "../component/EditBudget";
import Delete from "../component/Delete";
import Logo from "../component/Logo";

function Budget() {
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8000/api/budgets/${selectedBudgetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsDeleteOpen(false);
      setSelectedBudgetId(null);
      fetchBudgets(); // Herlaad de lijst
    } catch (error) {
      console.error("Fout bij verwijderen:", error);
    }
  };

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

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedBudgetId(budget.id);
                    setIsDeleteOpen(true);
                  }}
                  className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-black drop-shadow-lg hover:bg-[#6499E9] pointer-events-auto"
                  title="Delete category"
                >
                  <svg
                    className="w-6 h-6 text-[#bdb395] dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 7h14M10 11v6m4-6v6M9 4h6v2H9V4z"
                    />
                  </svg>
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

      {/* Verwijder-popup component */}
      <Delete
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Budget;
