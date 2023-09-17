import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/style.css";
import "../style/responsive.css";
import "../style/bootstrap.css";
import "../style/style.css.map";
const Cart = () => {
  const navigate = useNavigate();

  const handleDecreaseQuantity = (itemId) => {
    // Tìm kiếm sản phẩm trong giỏ hàng theo itemId
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        // Giảm số lượng đi 1 đơn vị nếu số lượng hiện tại lớn hơn 1
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    // Cập nhật giỏ hàng với số lượng đã thay đổi
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleIncreaseQuantity = (itemId) => {
    // Tìm kiếm sản phẩm trong giỏ hàng theo itemId
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === itemId) {
        // Tăng số lượng lên 1 đơn vị
        item.quantity += 1;
      }
      return item;
    });

    // Cập nhật giỏ hàng với số lượng đã thay đổi
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const handleRemoveItem = (itemId) => {
    const newCartItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(newCartItems);

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };


  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalTax = cartItems.reduce(
    (total, item) => total + item.tax * item.quantity,
    0
  );
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity + item.tax * item.quantity,
    0
  );
  const hasItemsInCart = cartItems.length > 0;
  const handleCreateOrder = () => {
    const itemDetails = cartItems.map((item) => {
      return {
        image: item.image,
        type: item.type,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        tax: item.tax,
        totalAmount: item.totalAmount,
      };
    });
     cartItems.map((item) => item.name);
    // Save total amount and number of products to local storage
    localStorage.setItem("totalAmount", totalAmount);
    localStorage.setItem("numProducts", totalQuantity);
    localStorage.setItem("itemDetails", JSON.stringify(itemDetails));
    navigate("/Order");
  };
  const handleClearAll = () => {
    // Xóa tất cả các sản phẩm trong giỏ hàng
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <section className="h-100 ">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3 d-flex justify-content-between">
                <h5 className="mb-0">Your Cart</h5>
                {cartItems.length > 0 && (
                  <div
                    className="btn btn-primary btn-sm"
                    onClick={handleClearAll}
                  >
                    Clear all
                  </div>
                )}
              </div>
              {cartItems.length === 0 ? (
                <div className="card-body text-center">
                  <p className="mb-0">You have no items in your cart.</p>
                  <Link to="/Cake" className="btn btn-primary mt-3">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div className="card-body mb-0" key={item._id}>
                    <div className="row">
                      <div className="col-lg-4 col-md-12 mb-2 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img src={item.image} className="w-100 " alt="" />
                        </div>
                      </div>
                      <div
                        className="container d-flex item_info"
                        style={{ flex: 1 }}
                      >
                        <div className="flex-grow-1 mt-5 ml-2 ">
                          <strong className="row item_name eee">{item.name}</strong>
                          <label className="row item_price">
                            Price: {item.price}$
                          </label>
                          <label className="row item_type">
                            Type: {item.type}
                          </label>
                          <div className="row ml-0">
                            <label className="row item_qty">
                              Quantity:
                              <div className="d-flex align-items-center ml-2 ">
                                <div
                                  type="button"
                                  onClick={() =>
                                    handleDecreaseQuantity(item._id)
                                  }
                                  style={{ marginRight: "10px" }}
                                >
                                  <i className="fas fa-arrow-left " />
                                </div>
                                <label className="item_qty">
                                  {item.quantity}
                                </label>
                                <div
                                  type="button"
                                  onClick={() =>
                                    handleIncreaseQuantity(item._id)
                                  }
                                  style={{ marginLeft: "10px" }}
                                >
                                  <i className="fas fa-arrow-right " />
                                </div>
                              </div>
                            </label>
                            <div className="ml-auto mr-5">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                data-mdb-toggle="tooltip"
                                title="Remove item"
                                style={{ marginRight: "5%" }}
                                onClick={() => handleRemoveItem(item._id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-3" />
                  </div>
                ))
              )}
            </div>
          </div>

          {hasItemsInCart && (
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span className="">{totalQuantity}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Tax
                      <span>{totalTax.toFixed(2)}$</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including VAT)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>{totalAmount.toFixed(2)}$</strong>
                      </span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handleCreateOrder}
                  >
                    Create order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
