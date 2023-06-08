import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import {
  MDBModalHeader,
  MDBModalBody,
  MDBTable,
  MDBTableBody,
  MDBModal,
  MDBTableHead,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderManagement() {
  const [basicModal, setBasicModal] = useState(false);
  const [storeData, setStoreData] = useState([]);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    type: "",
    tax: "",
    price: "",
    status: "",
  });
  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "text-warning";
      case "Done":
        return "text-success";
      case "Reject":
        return "text-danger"
      default:
        return "";
    }
  };
  const getAllOrderData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/order/getAllOrder`);
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllOrderData();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/order/deleteOrder/${orderId}`
      );
      if (res.status === 200) {
        toast.success("Order deleted successfully");
        getAllOrderData();
      } else {
        toast.error("Failed to delete Order");
      }
    } catch (error) {
      toast.error(error.message);
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
              ID
            </th>
            <th scope="col" className="text-center">
              Email
            </th>
            <th scope="col" className="text-center">
              Phone
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
              Actions
            </th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {storeData.map((item, index) => (
            <tr key={index}>
              <td className="text-center">
                <strong>{index + 1}</strong>
              </td>
              <td className="text-center">
                <p className="fw-bold mb-1 ml-1">
                  {" "}
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
                <p className="fw-bold mb-1 ml-1"> {item.totalPrice}$</p>
              </td>
              <td className="text-center">
                <p
                  className={`fw-bold mb-1 ml-1 ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </p>
              </td>
              <td className="text-center">
                <button className="btn btn-primary" size="sm">
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-1"
                  size="sm"
                  onClick={() => deleteOrder(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <ToastContainer />
    </>
  );
}
