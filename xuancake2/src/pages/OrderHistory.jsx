import React, { useState, useEffect } from "react";

import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderHistory() {
  const [storeData, setStoreData] = useState([]);
  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "text-warning";
      case "Done":
        return "text-success";
      case "Reject":
        return "text-danger";
      default:
        return "";
      case "Pending":
        return "text-primary";
      case "Paid":
        return "text-success";
      case "Not Paid":
        return "text-danger";
    }
  };

  const loggedInEmail = localStorage.getItem("email");

  const filteredStoreData = storeData.filter(
    (item) => item.email === loggedInEmail
  );
  const getSpecificOrder = async () => {
    try {
      const res = await axios.get(
        `https://xuancakebe.onrender.com/order/getSpecificOrder/${loggedInEmail}`
      );
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {
      toast.error("No order");
    }
  };
  useEffect(() => {
    getSpecificOrder();
  }, [getSpecificOrder]);
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await axios.patch(
        `https://xuancakebe.onrender.com/order/cancelOrder/${orderId}`
      );
      if (res.status === 200) {
        toast.success("Order canceled successfully!");
        getSpecificOrder();
      }
    } catch (error) {
      toast.error("Failed to cancel order");
    }
  };
  return (
    <>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col" className="text-center">
              Your ID
            </th>
            <th scope="col" className="text-center">
              Your Email
            </th>
            <th scope="col" className="text-center">
              Your Phone
            </th>
            <th scope="col" className="text-center">
              Total Quantity
            </th>
            <th scope="col" className="text-center">
              Total Price
            </th>
            <th scope="col" className="text-center">
              Status
            </th>
            <th scope="col" className="text-center">
              Payment Status
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {storeData.map((item, index) => (
            <tr className="ml-2 mr-2" key={index}>
              <td className="text-center">
                <strong>{index + 1}</strong>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1">
                  {`${item._id.substring(0, 10)}...`}
                </p>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1"> {item.email}</p>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1"> {item.phoneNumber}</p>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1"> {item.totalQuantity}</p>
              </td>

              <td className="text-center">
                <p className="fw-bold mb-1 ml-1">
                  {item.totalPrice.toFixed(2)}$
                </p>
              </td>
              <td className="text-center">
                <p
                  className={`fw-bold mb-1 ml-1 ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </p>
              </td>
              <td className="text-center">
                <p
                  className={`fw-bold mb-1 ml-1 ${getStatusColor(
                    item.paymentStatus
                  )}`}
                >
                  {item.paymentStatus}
                </p>
              </td>
              <td className="text-center">
                {item.status === "Pending" && ( // Add this condition
                  <button
                    type="button"
                    className="btn btn-sl"
                    onClick={() => handleCancelOrder(item._id)}
                  >
                    Cancel order
                  </button>
                )}
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <ToastContainer />
    </>
  );
}
