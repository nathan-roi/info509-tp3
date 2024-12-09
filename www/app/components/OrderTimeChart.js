"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "@/app/css/charts.css"

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrdersLineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders_intime");
        const orders = response.data;

        // Format data for the line chart
        const labels = orders.map((order) => order.OrderDate); // Dates for the x-axis
        const totalOrders = orders.map((order) => order.TotalOrders); // Total orders for the y-axis

        setChartData({
          labels,
          datasets: [
            {
              label: "Nombre de commandes par jour",
              data: totalOrders,
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: true,
              tension: 0.3, 
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching order data:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="orderTimeChart">
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
            },
            scales: {
              x: {
                ticks: {
                  display: false, // Hide x-axis labels
                },
                grid: {
                  drawTicks: false,
                  display: false,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default OrdersLineChart;
