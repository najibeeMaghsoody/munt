import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getCharts } from "../function";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const [expenseData, setExpenseData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getCharts(); // bevat categorieën met: name, total_budget, total_expense, total_income

        // Labels voor alle categorieën
        const labels = chartData.map((item) => item.name);

        // Budget, Uitgaven, Inkomsten per categorie
        const budgetValues = chartData.map((item) =>
          parseFloat(item.total_budget)
        );
        const expenseValues = chartData.map((item) =>
          parseFloat(item.total_expense)
        );
        const incomeValues = chartData.map((item) =>
          parseFloat(item.total_income)
        );

        // Uitgaven chart (Budget vs Uitgaven)
        setExpenseData({
          labels,
          datasets: [
            {
              label: "Budget",
              data: budgetValues,
              backgroundColor: "#60a5fa",
            },
            {
              label: "Uitgaven",
              data: expenseValues,
              backgroundColor: "#f87171",
            },
          ],
        });

        // Inkomsten chart
        setIncomeData({
          labels,
          datasets: [
            {
              label: "Inkomsten",
              data: incomeValues,
              backgroundColor: "#4ade80",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Fout bij ophalen chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <div className="bg-[#F4F8D3] w-full h-[400px] p-6 rounded-2xl shadow-md flex flex-col justify-between">
        <h2 className="text-center font-semibold text-xl mb-4 text-gray-800 ">
          Budget vs Uitgaven
        </h2>
        {expenseData ? (
          <Doughnut
            data={expenseData}
            options={{
              rotation: -90,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-500">Bezig met laden...</p>
        )}
      </div>

      <div className="bg-[#F7CFD8] w-full h-[400px] p-6 rounded-2xl shadow-md flex flex-col justify-between">
        <h2 className="text-center font-semibold text-xl mb-4 text-gray-800">
          Inkomsten
        </h2>
        {incomeData ? (
          <Doughnut
            data={incomeData}
            options={{
              rotation: -90,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-500">Bezig met laden...</p>
        )}
      </div>
    </div>
  );
}

export default Chart;
