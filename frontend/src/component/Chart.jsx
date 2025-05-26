import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const data = {
    labels: ["Huur", "Boodschappen", "Vervoer", "Vrije tijd"],
    datasets: [
      {
        label: "Maandelijks budget",
        data: [600, 300, 100, 200],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-64 mx-auto bg-slate-50 p-4 rounded-3xl shadow-md">
      <h2 className="text-center font-bold mb-4">Budget Verdeling</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default Chart;
