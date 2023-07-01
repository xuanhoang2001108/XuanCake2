import React, { useState, useEffect } from "react";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const loggedInEmail = localStorage.getItem("email");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        const username = user.email.split("@")[0];
        setUsername(username);
      } else {
        setEmail(null);
        setUsername(null);
      }
    });
  }, []);
  const handleNavOrder = () => {
    navigate("/OrderHistory");
  };
  const handleNavCart = () => {
    navigate("Cart");
  };
  const handleLogout = () => {
    if (email) {
      // Xử lý logout nếu đã đăng nhập
      setCurrentUserEmail("");
      setCartItems([]);
      localStorage.removeItem("cartItems");
      toast.success(`Logged out successfully!`, {
        autoClose: 100,
        onClose: () => {
          signOut(auth)
            .then(() => {
              localStorage.removeItem("email");
              localStorage.removeItem("updatedCartItems");
              localStorage.removeItem("itemDetails"); // Remove the order details from localStorage
              localStorage.setItem("hasSelectedItems", "false"); // Set hasSelectedItems to false
              navigate("/");
            })
            .catch((error) => {
              toast.error(error.message);
            });
        },
      });
    } else {
      // Xử lý chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
      navigate("/Authorization");
    }
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <ToastContainer />
      <div>
        <div className="hero_area">
          <div className="brand_box">
            <Link className="navbar-brand" href="/">
              <span>
                Xuan
                <img src="images/logo.png"  />
              </span>
            </Link>
          </div>

          <section className=" slider_section position-relative">
            <div
              id="carouselExampleControls"
              className="carousel slide "
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="img-box">
                  <img src="images/slider-img1.png" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="nav_section">
          <div className="container">
            <div className="custom_nav2">
              <nav className="navbar navbar-expand custom_nav-container ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <div className="d-flex  flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">
                          Home <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="About">
                          About
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="Cake">
                          Our Cakes
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="Order">
                          Order
                        </Link>
                      </li>
                      <li className="nav-item">
                        <NavDropdown
                          variant="dark"
                          id="dropdown-basic-button"
                          title={email ? username : "Login"}
                          style={{ marginBottom: "5px" }}
                        >
                          {email ? (
                            <>
                              <DropdownItem
                                className="cart"
                                onClick={handleNavCart}
                              >
                                <i className="fas fa-shopping-cart"> Cart</i>
                              </DropdownItem>
                              <DropdownItem
                                className="userLoggedIn"
                                onClick={handleNavOrder}
                              >
                                Order History
                              </DropdownItem>
                              <DropdownItem
                                className="logoutButton"
                                onClick={handleLogout}
                              >
                                Logout
                              </DropdownItem>
                            </>
                          ) : (
                            <DropdownItem
                              className="loginButton"
                              onClick={handleLogout}
                            >
                              Login
                            </DropdownItem>
                          )}
                        </NavDropdown>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Header;
