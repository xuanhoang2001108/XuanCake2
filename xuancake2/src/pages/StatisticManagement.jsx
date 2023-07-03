import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { toast } from "react-toastify";

export default function StatisticManagement() {
  const totalEarningsChartRef = useRef(null);
  const totalOrdersChartRef = useRef(null);
  const [totalEarningsData, setTotalEarningsData] = useState([]);
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [cakeData, setCakeData] = useState([]);
  const doughnutChartRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const earningsRes = await axios.get(
          "http://localhost:5000/order/calculateTotalEarn"
        );
        const ordersRes = await axios.get(
          "http://localhost:5000/order/calculateTotalOrdersInMonth"
        );
        const cakeRes = await axios.get(
          "http://localhost:5000/cake/calculateCake"
        );

        if (earningsRes.status === 200 && ordersRes.status === 200) {
          const earnings = earningsRes.data.monthlyEarnings;
          const orders = ordersRes.data.monthlyOrders;
          const cakes = cakeRes.data;

          setTotalEarningsData(earnings);
          setTotalOrdersData(orders);
          setCakeData(cakes);
          const earningsCtx = totalEarningsChartRef.current.getContext("2d");
          new Chart(earningsCtx, {
            type: "bar",
            data: {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Total Earnings",
                  data: earnings,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

          const ordersCtx = totalOrdersChartRef.current.getContext("2d");
          new Chart(ordersCtx, {
            type: "line",
            data: {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Total Orders",
                  data: orders,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            },
          });
          const doughnutCtx = doughnutChartRef.current.getContext("2d");
          new Chart(doughnutCtx, {
            type: "doughnut",
            data: {
              labels: cakes ? cakes.map((cake) => cake._id) : [],
              datasets: [
                {
                  label: "Cake",
                  data: cakes ? cakes.map((cake) => cake.count) : [],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ width: "400px", height: "400px", display: "inline-block" }}>
        <canvas
          ref={totalEarningsChartRef}
          id="totalEarningsChart"
          width={300}
          height={200}
        ></canvas>
      </div>
      <div style={{ width: "100px", display: "inline-block" }}></div>

      <div style={{ width: "400px", height: "400px", display: "inline-block" }}>
        <canvas
          ref={totalOrdersChartRef}
          id="totalOrdersChart"
          width={300}
          height={200}
        ></canvas>
      </div>
      <div style={{ width: "400px", height: "400px", display: "inline-block" }}>
        <canvas
          ref={doughnutChartRef}
          id="doughnutChart"
          width={300}
          height={200}
        ></canvas>
      </div>
    </div>
  );
}
