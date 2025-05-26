import React, { useState, useEffect } from "react";
import { updateBudget } from "../function";

function EditBudget({ budgetId, initialData, onSuccess }) {
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        budget: initialData.budget || "",
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || "",
        recurrence: initialData.recurrence || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditBudget = async (e) => {
    e.preventDefault();
    if (!formData.budget || isNaN(formData.budget)) {
      alert("Voer een geldig budgetbedrag in.");
      return;
    }

    setLoading(true);
    try {
      await updateBudget(budgetId, {
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
      setError("Fout bij bijwerken van budget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log("Edit button clicked"); // Debug log
          setPopupOpen(true);
        }}
        className="mr-2 bg-black text-[#bdb395] py-2 px-5 rounded-md items-center flex justify-center dark:text-white"
      >
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
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>
        Edit
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nieuw Budget</h2>
            {loading && <p>⏳ Bezig...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleEditBudget} className="space-y-4">
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
                className="w-full btn text-white py-2 rounded bg-[#6499E9] hover:bg-[#bdb395]"
              >
                Toevoegen
              </button>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="w-full bg-gray-300 text-gray-800 py-2 rounded mt-2"
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

export default EditBudget;
