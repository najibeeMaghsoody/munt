import React, { useState } from "react";
import { addBudget } from "../function";

function AddBudget({ onSuccess }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    budget: "",
    start_date: "",
    end_date: "",
    recurrence: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    if (!formData.budget || isNaN(formData.budget)) {
      alert("Voer een geldig budgetbedrag in.");
      return;
    }

    setLoading(true);
    try {
      await addBudget({
        name: formData.name,
        budget: parseFloat(formData.budget),
        start_date: formData.start_date,
        end_date: formData.end_date,
        recurrence: formData.recurrence,
      });

      setFormData({
        name: "",
        budget: "",
        start_date: "",
        end_date: "",
        recurrence: "",
      });
      setPopupOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Fout bij toevoegen budget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setPopupOpen(true)}
        className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#6499E9] drop-shadow-lg "
      >
        ➕
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 dark:text-black">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nieuw Budget</h2>
            {loading && <p>⏳ Bezig...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleAddBudget} className="space-y-4">
              <div>
                <label>Budget Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-2 rounded bg-brown-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label>Budget (€):</label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-2 rounded bg-brown-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label>Startdatum:</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-2 py-2 rounded bg-brown-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label>Einddatum:</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-2 py-2 rounded bg-brown-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1">Herhaling:</label>
                <select
                  name="recurrence"
                  value={formData.recurrence}
                  onChange={handleChange}
                  className="w-full px-2 py-2 rounded bg-brown-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Geen</option>
                  <option value="daily">Dagelijks</option>
                  <option value="weekly">Wekelijks</option>
                  <option value="monthly">Maandelijks</option>
                  <option value="yearly">Jaarlijks</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn text-white py-2 rounded hover:bg-[#6499E9]"
              >
                Toevoegen
              </button>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="w-full bg-[#bdb395] hover:bg-black hover:text-[#bdb395] text-gray-800 py-2 rounded mt-2"
              >
                Annuleren
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBudget;
