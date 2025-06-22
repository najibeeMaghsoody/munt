import React, { useEffect, useState } from "react";
import AddTransaction from "../component/AddTransaction";
import Delete from "../component/Delete";
import ExcelImport from "../component/ExcelImport";
import Logo from "../component/Logo";
import EditTransaction from "../component/EditTransaction";

const Transaction = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const bgColors = [
    "bg-[#B7B1F2]",
    "bg-[#A6D6D6]",
    "bg-[#F4F8D3]",
    "bg-[#F7CFD8]",
    "bg-[#9FB3DF]",
    "bg-[#A5B68D]",
    "bg-[#C599B6]",
  ];
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token"); // zorg dat je token in localStorage staat

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setTransactions(data); // sla op in state
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);
  // handleDelete
  const handleDeleteClick = (id) => {
    setSelectedTransactionId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/transactions/${selectedTransactionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      // Verwijder de transactie uit de UI
      setTransactions(
        transactions.filter((t) => t.id !== selectedTransactionId)
      );
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setShowDeletePopup(false);
      setSelectedTransactionId(null);
    }
  };
  return (
    <div className="w-5/6 p-4 sm:ml-64 mt-10 top-0 mb-72">
      <div className="m-28 -mt-2">
        <Logo />
      </div>
      <h1 className="text-2xl font-semibold mb-10 -mt-10">Transaction ⊹ ࣪ ˖</h1>
      <div className="flex flex-row items-center gap-4 mb-6">
        <AddTransaction />
        <ExcelImport />
      </div>
      <div className="p-4 rounded-lg mt-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 ">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`relative rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 mt-7 ${
                  bgColors[index % bgColors.length]
                }`}
                style={{ width: "312px", height: "350px" }}
              >
                {/* Icon van de card */}
                <div className="absolute -top-8 bg-black shadow-lg shadow-teal-500/40 rounded-full flex items-center justify-center w-20 h-20">
                  {transaction.category?.file?.name ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/icons/${transaction.category.file.name}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-icon.png";
                      }}
                      alt={transaction.category.name}
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-full">
                      <span className="text-gray-500 text-xs">No Icon</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="mt-12 flex flex-col items-center text-gray-800">
                  <span className="mb-2">
                    Date: {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <h2 className="text-lg font-semibold mb-1">
                    Amount: €{transaction.amount}
                  </h2>
                  <p className="text-lg font-semibold">
                    {transaction.description}
                  </p>
                </div>
                {/* Buttons edit & delete */}
                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => handleDeleteClick(transaction.id)}
                    className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-black drop-shadow-lg hover:bg-[#6499E9] pointer-events-auto"
                    title="Delete transaction"
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

                  <button
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-black drop-shadow-lg hover:bg-[#6499E9] pointer-events-auto"
                    title="Edit transaction"
                    onClick={() => {
                      setTransactionToEdit(transaction);
                      setShowEditPopup(true);
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-[#bdb395] dark:text-white"
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
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500"> transactions niet gevonden.</p>
          )}
          <Delete
            open={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
            onConfirm={handleConfirmDelete}
          />
          <EditTransaction
            open={showEditPopup}
            onClose={() => setShowEditPopup(false)}
            transaction={transactionToEdit}
            onSave={(updatedTransaction) => {
              setTransactions((prev) =>
                prev.map((t) =>
                  t.id === updatedTransaction.id ? updatedTransaction : t
                )
              );
              setShowEditPopup(false);
              setTransactionToEdit(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
