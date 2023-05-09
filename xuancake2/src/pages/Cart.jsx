import React from "react";
import "../style/style.css";
import "../style/responsive.css";
import "../style/bootstrap.css";
import "../style/style.css.map";
import { useState } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const Order = () => {
  const [chooseSize, setSelectedSize] = useState("M");
  function handleChangeSizeChange(eventKey) {
    setSelectedSize(eventKey);
  }

  let [count, setCount] = useState(1);
  // let incNum = () => {
  //   if (num < 10) {
  //     setNum(Number(num) + 1);
  //   }
  // };
  // let decNum = () => {
  //   if (num > 0) {
  //     setNum(num - 1);
  //   }
  // };
  // let handleChange = (e) => {
  //   setNum(e.target.value);
  // };

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
  let [totalPrice, setTotalPrice] = useState(price);
  function calTotalPrice() {
    totalPrice = price * count + tax;
    setTotalPrice(totalPrice);
  }

  return (
    <section className="h-100 ">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - 2 items</h5>
              </div>
              <div className="card-body">
                <div className="row"  >
                  <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div
                      className="bg-image hover-overlay hover-zoom ripple rounded"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="/images/product-1.jpg"
                        className="w-100"
                        alt=""
                      />
                      <a href="#">
                        <div className="mask"></div>
                      </a>
                    </div>
                  </div>
                  <div style={{flex:1 }}>
                    <p>
                      <strong>Cuppy cake</strong>
                    </p>
                    <div>
                      <div>
                        <label>
                          Price: <strong style={{marginLeft: "33px"}} >{price}$ </strong>
                        </label >
                        <div  style={{display: "flex", textAlign:"center"}}>
                          <label  >Size:</label>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title={chooseSize}
                            style={{ marginBottom: "5px", marginLeft: "8%"}}
                            onSelect={handleChangeSizeChange}
                          >
                            <DropdownItem eventKey="M">M</DropdownItem>
                            <DropdownItem eventKey="L">L</DropdownItem>
                          </DropdownButton>
                        </div>
                        <div style={{ display: "flex"}}>
                          <label style={{ marginRight: "5%" }}>
                            Quantity:
                          </label>
                          <div className="row" style={{ marginRight: "55%" }}>
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  onClick={(event) => {
                                    decrementCount();
                                  }}
                                >
                                  -
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={count}
                              />
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-primary"
                                  type="button"
                                  onClick={(event) => {
                                    incrementCount();
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "6px",
                            }}
                          ></div>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-1 mb-2"
                            data-mdb-toggle="tooltip"
                            title="Remove item"
                            style={{marginRight: "5%"}}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          {/* <button
                            type="button"
                            className="btn btn-danger btn-sm mb-2 ml-1"
                            data-mdb-toggle="tooltip"
                            title="Move to the wish list"
                          >
                            <i className="fas fa-heart"></i>
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span className="">1</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Tax
                    <span>{tax}$</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>{totalPrice}$</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Create order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
