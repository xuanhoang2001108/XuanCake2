import React from "react";
import "../style/style.css";
import "../style/responsive.css";
import "../style/bootstrap.css";
import "../style/style.css.map";
import { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBBtn,
} from "mdb-react-ui-kit";

const Order = () => {
  let [count, setCount] = useState(1);

  function incrementCount() {
    
    count = count + 1;
    setCount(count);
    calTotalPrice();
  }
  function decrementCount() {
    if (count > 0) {
      count--;
      setCount(count);
      calTotalPrice();
    }
  }

  let price = 7;
  let tax = 1;
  let[totalPrice, setTotalPrice] = useState(price);
  function calTotalPrice(){
    totalPrice = price*count + tax;
    setTotalPrice(totalPrice);
  }

  return (
    <MDBContainer fluid className="my-4">
      <MDBRow className="justify-content-center">
        <MDBCol md="4">
          <MDBCard className="text-black">
            <MDBCardImage src="images/product-4.jpg" position="top" alt="" />
            <MDBCardBody>
              <div className="text-center">
                <MDBCardTitle>Believing is seeing</MDBCardTitle>
                <p className="text-muted mb-4">Cookie dough</p>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <span>Cake type</span>
                  <span>Sweet</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Price</span>
                  <span className="Price">{price}$</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Tax</span>
                  <span className="tax">{tax}$</span>
                </div>
              </div>
              <div className="d-flex justify-content-between total font-weight-bold mt-4">
                <span>Total</span>
                <span className="total-price">{totalPrice}$</span>
              </div>

              <div className="d-flex justify-content-between">
                <div className="row order-container">
                  <div className="btn btn-box" onClick={decrementCount  }>
                    -
                  </div>
                  <span className="quantity">{count}</span>
                  <div className="btn btn-box" onClick={incrementCount}>
                    +
                  </div>
                </div>
                <div className="btn btn-primary">Create order</div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Order;
