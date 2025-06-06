import React, { useEffect, useState } from "react";
import AddTransaction from "../component/AddTransaction";

const Transaction = () => {
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

  return (
    <div className="w-5/6 p-4 sm:ml-64 mt-10 top-0 mb-72">
      <h1 className="text-2xl font-semibold mb-10">Transaction</h1>
      <AddTransaction />
      <div className="p-4 rounded-lg">
        <h1 className="text-gray-500">Alle Transaction</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`relative rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 ${
                  bgColors[index % bgColors.length]
                }`}
                style={{ width: "312px", height: "350px" }}
              >
                {/* Icon boven de card */}
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
              </div>
            ))
          ) : (
            <p className="text-gray-500"> transactions niet gevonden.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
