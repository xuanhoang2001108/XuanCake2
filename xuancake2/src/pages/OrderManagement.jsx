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
  const [selectedOrder, ] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [, setFormData] = useState({
    _id: "",
    email: "",
    phone: "",
    totalQuantity: "",
    totalPrice: "",
    status: "",
    paymentStatus: "",
    createdAt: "",
  });
  const [editFormData, setEditFormData] = useState({
    _id: "",
    email: "",
    phone: "",
    totalQuantity: "",
    totalPrice: "",
    status: "",
    paymentStatus: "",
    createdAt: "",
  });
  const getStatusColor = (status) => {
    switch (status) {
      case "Waiting":
        return "text-warning";
      case "Done":
        return "text-success";
      case "Reject":
        return "text-danger";
      case "Paid":
        return "text-success";
      case "Not Paid":
        return "text-danger";
      default:
        return "";
    }
  };
  const toggleShow = () => {
    setBasicModal(!basicModal);
    if (selectedOrder) {
      setFormData({
        _id: selectedOrder._id,
        email: selectedOrder.email,
        phone: selectedOrder.phoneNumber,
        totalQuantity: selectedOrder.totalQuantity,
        totalPrice: selectedOrder.totalPrice,
        status: selectedOrder.status,
        paymentStatus: selectedOrder.paymentStatus,
        createdAt: selectedOrder.createdAt,
      });
    }
  };
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://xuancakebe.onrender.com/order/searchOrder?searchTerm=${searchTerm}`
      );
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSave = async (_id) => {
    try {
      console.log("Edit Form Data:", editFormData);
      const res = await axios.patch(
        `https://xuancakebe.onrender.com/order/updateOrder/${editFormData._id}`,
        editFormData
      );
      if (res.status === 200) {
        toast.success("Order updated successfully");
        toggleShow();
        getAllOrderData();
      } else {
        toast.error("Failed to update Order");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllOrderData = async () => {
    try {
      const res = await axios.get(`https://xuancakebe.onrender.com/order/getAllOrder`);
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
  const editOrder = (order) => {
    setEditFormData({
      _id: order._id,
      email: order.email,
      phone: order.phoneNumber,
      totalQuantity: order.totalQuantity,
      totalPrice: order.totalPrice,
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
    });
    setBasicModal(true);
  };
  const deleteOrder = async (orderId) => {
    try {
      const res = await axios.delete(
        `https://xuancakebe.onrender.com/order/deleteOrder/${orderId}`
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button className="btn btn-primary ml-2 mb-2" onClick={handleSearch}>
        Search
      </button>
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
              Payment Status
            </th>
            <th scope="col" className="text-center">
              Create At
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
                <p className="fw-bold mb-1 ml-1">
                  {formatDate(item.createdAt)}
                </p>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-primary"
                  size="sm"
                  onClick={() => editOrder(item)}
                >
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
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit order</MDBModalTitle>

              <div className="btn btn-close" color="none" onClick={toggleShow}>
                <i className="fa fa-times"></i>
              </div>
            </MDBModalHeader>
            <MDBModalBody>
              <Form.Control
                className="mb-2"
                value={editFormData._id || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, _id: e.target.value })
                }
                readOnly
              />
              <Form.Control
                className="mb-2"
                value={editFormData.email || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, email: e.target.value })
                }
                readOnly
              />
              <Form.Control
                className="mb-2"
                value={editFormData.phone || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    phoneNumber: e.target.value,
                  })
                }
                readOnly
              />
              <Form.Control
                className="mb-2"
                value={editFormData.totalQuantity || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    totalQuantity: e.target.value,
                  })
                }
                readOnly
              />
              <Form.Control
                className="mb-2"
                value={editFormData.totalPrice || ""}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    totalPrice: e.target.value,
                  })
                }
                readOnly
              />
              <Form.Select
                className="mb-2"
                value={editFormData.status}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, status: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Waiting">Waiting</option>
                <option value="Done">Done</option>
                <option value="Reject">Reject</option>
              </Form.Select>
              <Form.Select
                className="mb-2 ml-2"
                value={editFormData.paymentStatus}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    paymentStatus: e.target.value,
                  })
                }
              >
                <option value="Paid">Paid</option>
                <option value="Not Paid">Not Paid</option>
              </Form.Select>
            </MDBModalBody>

            <MDBModalFooter>
              <div className="btn btn-primary btn-sm" onClick={toggleShow}>
                Close
              </div>
              <div className="btn btn-primary btn-sm" onClick={handleSave}>
                Save
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer />
    </>
  );
}
