import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { toast } from "react-toastify";

export default function StatisticManagement() {
  const totalEarningsChartRef = useRef(null);
  const totalOrdersChartRef = useRef(null);
  const [totalEarningsData, setTotalEarningsData] = useState([]);
  const [totalOrdersData, setTotalOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const earningsRes = await axios.get(
          "http://localhost:5000/order/calculateTotalEarn"
        );
        const ordersRes = await axios.get(
          "http://localhost:5000/order/calculateTotalOrdersInMonth"
        );

        if (earningsRes.status === 200 && ordersRes.status === 200) {
          const earnings = earningsRes.data.monthlyEarnings;
          const orders = ordersRes.data.monthlyOrders;
          setTotalEarningsData(earnings);
          setTotalOrdersData(orders);

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
    </div>
  );
}
