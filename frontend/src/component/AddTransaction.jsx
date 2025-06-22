import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTransaction = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [budgetId, setBudgetId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Geen geldige token gevonden in localStorage");
      return;
    }

    axios
      .get("http://localhost:8000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCategories(response.data))
      .catch((error) =>
        console.error("Fout bij ophalen van categorieën", error)
      );

    axios
      .get("http://localhost:8000/api/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBudgets(response.data))
      .catch((error) => console.error("Fout bij ophalen van budgetten", error));
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token"); // als je auth-token gebruikt
      const user_id = localStorage.getItem("user_id"); // eventueel via context

      const response = await axios.post(
        "http://localhost:8000/api/transactions", // Pas aan naar je API route
        {
          amount,
          description,
          type,
          category_id: categoryId,
          budget_id: budgetId || null,
          date: new Date().toISOString().slice(0, 10), // vandaag als voorbeeld
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Transaction opgeslagen:", response.data);
      setPopupOpen(false);
      // Reset form
      setAmount("");
      setDescription("");
      setType("expense");
      setCategoryId("");
    } catch (err) {
      console.error(err);
      setError("Fout bij opslaan van transactie.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setPopupOpen(true)}
        className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg text-black dark:text-white"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Transaction toevoegen</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <select
                value={budgetId}
                onChange={(e) => setBudgetId(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
              >
                <option value="">Selecteer budget (optioneel)</option>
                {budgets.map((budget) => (
                  <option key={budget.id} value={budget.id}>
                    {budget.name} - €{budget.budget}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Bedrag"
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschrijving"
                className="w-full border px-4 py-2 rounded-lg"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
              >
                <option value="income">Inkomen</option>
                <option value="expense">Uitgave</option>
              </select>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
                required
              >
                <option value="">Selecteer categorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-28 bg-[#6499E9] hover:bg-black text-white font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Opslaan
                </button>
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  className="w-28 bg-black hover:bg-[#6499E9] text-white font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Annuleer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
