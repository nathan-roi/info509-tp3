"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        const products = response.data;

        // Prepare data for the chart
        const labels = products.map((product) => product.productName);
        const unitPrices = products.map((product) => product.unitPrice);
        const unitsInStock = products.map((product) => product.unitsInStock);

        setChartData({
          labels,
          datasets: [
            {
              label: "Unités en stock",
              data: unitsInStock,
              backgroundColor: "#477FA2",
              borderColor: "#477FA2",
              borderWidth: 1,
            },
            {
              label: "Prix unitaire",
              data: unitPrices,
              backgroundColor: "#B0DEDF",
              borderColor: "#B0DEDF",
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
            scales: {
              x: {
                stacked: true,
                ticks: {
                  display: false, // Hide x-axis labels
                },
              },
              y: {
                stacked: true,
                ticks: {
                  display: false, // Hide y-axis labels
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ProductsChart;
