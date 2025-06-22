import React, { useState, useEffect } from "react";

const EditTransaction = ({ open, onClose, transaction, onSave }) => {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
      });
    }
  }, [transaction]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/api/transactions/${transaction.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    if (response.ok) {
      const updated = await response.json();
      onSave(updated);
    } else {
      console.error("Update failed");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Edit Transaction</h2>
        <input
          type="text"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          placeholder="Amount"
          className="mb-2 border p-2 w-full"
        />
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="mb-2 border p-2 w-full"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="mb-4 border p-2 w-full"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="w-28 bg-[#6499E9] hover:bg-black text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Opslaan
          </button>
          <button
            onClick={onClose}
            className="w-28 bg-black hover:bg-[#6499E9] text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Annuleer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
