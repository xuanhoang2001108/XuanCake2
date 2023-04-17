import React from "react";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/alice-carousel.css";

const Header = () => {
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
                      <a className="nav-link" href="Testimonial">
                        Testimonial
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="Contact">
                        Contact Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="Order">
                        Order
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Log Out
                      </a>
                    </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                    <button
                      className="btn  my-2 my-sm-0 nav_search-btn"
                      type="submit"
                    ></button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
