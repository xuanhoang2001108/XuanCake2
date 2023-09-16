import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { toast } from "react-toastify";
import { Tab, Tabs } from "react-bootstrap";
export default function StatisticManagement() {
  const totalEarningsChartRef = useRef(null);
  const totalOrdersChartRef = useRef(null);
  const [totalProvisionalEarningsData, setTotalProvisionalEarningsData] =
    useState([]);
  const [totalEarningsData, setTotalEarningsData] = useState([]);
  const [totalOrdersData, setTotalOrdersData] = useState([]);
  const [totalPaidOrdersData, setTotalPaidOrdersData] = useState([]);
  const [cakeData, setCakeData] = useState([]);
  const doughnutChartRef = useRef(null);
  const [activeTab, setActiveTab] = useState([]); 
  const handleSelectTab = (eventKey) => {
    setActiveTab(eventKey);
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const paidOrderRes = await axios.get(
          "https://xuan-cake-be-2.vercel.app/order/calculateTotalPaidOrdersInMonth"
        );
        const provisionalEarningRes = await axios.get(
          "https://xuan-cake-be-2.vercel.app/order/calculateTotalProvisionalEarning"
        );
        const earningsRes = await axios.get(
          "https://xuan-cake-be-2.vercel.app/order/calculateTotalEarn"
        );
        const ordersRes = await axios.get(
          "https://xuan-cake-be-2.vercel.app/order/calculateTotalOrdersInMonth"
        );
        const cakeRes = await axios.get(
          "https://xuan-cake-be-2.vercel.app/cake/calculateCake"
        );

        if (earningsRes.status === 200 && ordersRes.status === 200) {
          const earnings = earningsRes.data.monthlyEarnings;
          const orders = ordersRes.data.monthlyOrders;
          const cakes = cakeRes.data;
          const provisionalEarning =
            provisionalEarningRes.data.monthlyProvisionalEarnings;
          const paidOrders = paidOrderRes.data.monthlyPaidOrders;

          setTotalPaidOrdersData(paidOrders);
          setTotalProvisionalEarningsData(provisionalEarning);
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
                  backgroundColor: "rgba(191, 248, 248, 0.799)",
                  borderColor: "#a8bf10",
                  borderWidth: 0.5,
                },
                {
                  label: "Total provisional earnings",
                  data: provisionalEarning,
                  backgroundColor: "rgba(204, 37, 37, 0.2)",
                  borderColor: "#e5396c",
                  borderWidth: 0.5,
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
                {
                  label: "Total paid orders",
                  data: paidOrders,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "#eb3636",
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
      <Tabs className="" activeKey={activeTab} onSelect={handleSelectTab}>
        <Tab eventKey="earnings" title="Earnings">
          <div
            style={{ width: "400px", height: "400px", display: "inline-block" }}
          >
            <canvas
              ref={totalEarningsChartRef}
              id="totalEarningsChart"
              width={300}
              height={200}
            ></canvas>
          </div>{" "}
        </Tab>
        <div style={{ width: "100px", display: "inline-block" }}></div>
        <Tab eventKey="orders" title="Orders">
          <div
            style={{ width: "400px", height: "400px", display: "inline-block" }}
          >
            <canvas
              ref={totalOrdersChartRef}
              id="totalOrdersChart"
              width={300}
              height={200}
            ></canvas>
          </div>
        </Tab>
        <Tab eventKey="cakes" title="Cakes">
          <div
            style={{ width: "400px", height: "400px", display: "inline-block" }}
          >
            <canvas
              ref={doughnutChartRef}
              id="doughnutChart"
              width={300}
              height={200}
            ></canvas>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
