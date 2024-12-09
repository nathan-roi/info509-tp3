"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import "@/app/css/charts.css";

// Register necessary Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function FiveBestProducts (){
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/top5_best_products");
                const products = response.data;

                // Example data formatting for a pie chart
                const labels = products.map((product) => product._id); // Product names
                const dataValues = products.map((product) => product.nbProducts); // Total orders

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Nombre de produits',
                        data: dataValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                        hoverOffset: 4,
                    }],
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="list-data">
                <div className="header-list">
                    <h2>Les 5 produits les plus commandés actuellement</h2>
                </div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="list-data chart">
            <div className="header-list">
                <h2>Les 5 produits les plus commandés actuellement</h2>
            </div>
            <div className="pieChart">
                {chartData && (
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                },
                                tooltip: {
                                    enabled: true,
                                },
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
};