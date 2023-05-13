import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useNavigate } from "react-router-dom";

function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // Lấy email đã lưu từ localStorage
    const email = localStorage.getItem("email");
    console.log("email from local storage:", email);
    setEmail(email);
    if (email) {
      const username = email.split("@")[0];
      setUsername(username);
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Xóa email từ localStorage
        alert(email+" "+" logged out successfully!")
        localStorage.removeItem('email'); 
        // Điều hướng về trang đăng nhập
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero_area">
        <div className="brand_box">
          <Link className="navbar-brand" href="/home">
            <span>
              {" "}
              Xuan
              <img src="images/logo.png" alt="" />
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
                      <a className="nav-link" href="HomePage">
                        Home <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="About">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="Cake">
                        Our Cakes
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="Cart">
                        Cart
                      </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="Order">
                        Order
                      </a>
                    </li>

                    <li className="nav-item">
                      <NavDropdown
                        variant="dark"
                        id="dropdown-basic-button"
                        title={username}
                        style={{ marginBottom: "5px" }}
                      >
                        <DropdownItem className="userLoggedIn">
                          Order History
                        </DropdownItem>
                        <DropdownItem
                          className="logoutButton"
                          onClick={handleLogout}
                        >
                          Log Out
                        </DropdownItem>
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
  );
}

export default Header;
