import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderDetails3() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [showNoItemMessage, setShowNoItemMessage] = useState(false);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [itemDetails, setItemDetails] = useState([]); // Define the itemDetails state
  const [hasSelectedItems, setHasSelectedItems] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalTax, setTotalTax] = useState(0); // Add totalTax state
  const [totalQuantity, setTotalQuantity] = useState(0); // Add totalQuantity state

  const formData = {
    email: email,
    totalQuantity: totalQuantity,
    totalPrice: totalPrice,
    phoneNumber: phoneNumber,
    totalTax: totalTax,
  };

  useEffect(() => {
    // Lấy email đã lưu từ localStorage
    const email = localStorage.getItem("email");

    setEmail(email);
    if (email) {
      const username = email.split("@")[0];
      setUsername(username);
    }
    const storedItemDetails = JSON.parse(localStorage.getItem("itemDetails"));
    if (storedItemDetails) {
      setItemDetails(storedItemDetails);
      setHasSelectedItems(true);
      calculateTotalPrice(storedItemDetails);
    } else {
      setHasSelectedItems(false);
    }
    const storedHasSelectedItems = localStorage.getItem("hasSelectedItems");
    if (storedHasSelectedItems === "false") {
      setShowNoItemMessage(true);
    }
  }, []);
  const handleCancelOrder = () => {
    setItemDetails([]);
    setHasSelectedItems(false);
    setTotalPrice(0);
    localStorage.removeItem("itemDetails"); // Xóa dữ liệu trong localStorage
    localStorage.setItem("hasSelectedItems", "false");
  };
  const handleGoToShopping = () => {
    navigate("/Cake"); // Chuyển hướng đến trang cake
  };
  const calculateTotalPrice = (items) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let totalTax = 0;
    items.forEach((item) => {
      totalPrice += (item.price + item.tax) * item.quantity;
      totalTax += item.tax * item.quantity;
      totalQuantity += item.quantity;
    });

    setTotalPrice(totalPrice);
    setTotalTax(totalTax);
    setTotalQuantity(totalQuantity);
  };
  const handleAdd = async () => {
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
  
    try {
      const res = await axios.post(
        "http://localhost:5000/order/postOrder",
        formData
      );
  
      if (res.status >= 200 && res.status < 300) {
        toast.success("Order added successfully");
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };
  
  return (
    <>
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="8">
              <MDBCard style={{ borderRadius: "10px" }}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Thanks for your Order,{" "}
                    <span style={{ color: "#a8729a" }}>{username}</span>!
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p
                      className="lead fw-normal mb-0"
                      style={{ color: "#a8729a" }}
                    >
                      Receipt
                    </p>
                  </div>
                  {itemDetails.map((item, index) => (
                    <MDBCard className="shadow-0 border mb-4" key={index}>
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol md="2">
                            <MDBCardImage src={item.image} fluid alt="Cake" />
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0">{item.name} </p>
                          </MDBCol>

                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">
                              {" "}
                              Quantity: {item.quantity}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">
                              Price: {item.price}$
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">
                              Type: {item.type}
                            </p>
                          </MDBCol>
                          <MDBCol
                            md="2"
                            className="text-center d-flex justify-content-center align-items-center"
                          >
                            <p className="text-muted mb-0 small">
                              Tax: {item.tax}${" "}
                            </p>
                          </MDBCol>
                        </MDBRow>
                        <hr
                          className="mb-4"
                          style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                        />
                      </MDBCardBody>
                    </MDBCard>
                  ))}
                  {!hasSelectedItems && (
                    <div className="d-flex justify-content-center mt-4">
                      <p className="text-muted">You have no item now</p>
                    </div>
                  )}
                  <div className="col d-flex justify-content-end">
                    {hasSelectedItems ? (
                      <div
                        className="btn btn_primary"
                        onClick={handleCancelOrder}
                      >
                        Cancel order <i className="fa fa-times"></i>
                      </div>
                    ) : (
                      <div
                        className="btn btn_primary"
                        onClick={handleGoToShopping}
                      >
                        Go to Shopping <i className="fa fa-arrow-right"></i>
                      </div>
                    )}
                  </div>

                  <div className="d-flex pt-2">
                    <p className="text-muted mb-0">
                      Please provide us your phone number:
                      <Form.Control
                        type="phone"
                        placeholder="Your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold" style={{ marginLeft: "160px" }}>
                        We will contact you when done!
                      </span>
                    </p>
                  </div>
                </MDBCardBody>
                <MDBCardFooter
                  className="border-0 px-4 py-5"
                  style={{
                    backgroundColor: "#a8729a",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <MDBTypography
                    tag="h5"
                    className="d-flex align-items-center justify-content-between text-white text-uppercase mb-0"
                  >
                    <span className="h2 mb-0 ms-2">
                      Total paid: {totalPrice.toFixed(2)}$(VAT)
                    </span>
                    <button
                      type="button"
                      className="btn  btn-outline-light btn-sl "
                      onClick={handleAdd}
                    >
                      Confirm order
                    </button>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <ToastContainer />
      </section>
    </>
  );
}
