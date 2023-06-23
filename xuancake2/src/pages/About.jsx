import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const itemTestimonial = [];
const itemStaff = [
  <div style={{ textAlign: "center", fontSize: "20px" }}>
    <div className="mb-2">Main Chef</div>
    <img
      src="images/team-1.jpg.webp"
      onDragStart={handleDragStart}
      role="presentation"
    />
    <span className="d-inline-flex mt-4">Hanry Bulter</span>
  </div>,
  <div style={{ textAlign: "center", fontSize: "20px" }}>
    <div className="mb-2">Decorator</div>
    <img
      src="images/team-2.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />
    <span className="d-inline-flex mt-4">Mary May</span>
  </div>,
  <div style={{ textAlign: "center", fontSize: "20px" }}>
    <div className="mb-2">Decorator</div>
    <img
      src="images/team-3.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />
    <span className="d-inline-flex mt-4">Jone Mark</span>
  </div>,
  <div style={{ textAlign: "center", fontSize: "20px" }}>
    <div className="mb-2">Decorator</div>
    <img
      src="images/team-4.jpg"
      onDragStart={handleDragStart}
      role="presentation"
    />
    <span className="d-inline-flex mt-4">Jame Hardy</span>
  </div>,
];

const About = () => {
  return (
    <div className="sub_page">
      <section className="about_section layout_padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 px-0">
              <div className="img-box">
                <img src="images/about-img.png" alt="" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="detail-box">
                <div className="heading_container">
                  <hr />
                  <h2>About Our Cake Shop</h2>
                </div>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour
                </p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="detail-box">
                <div className="heading_container">
                  <hr />
                  <h2>With 20 years of cake making</h2>
                </div>
                <p />
                The "Cake Shop" is a Xuan Brand that started as a small family
                business. The owners are Dr. Xuan, supported by a staff of 80
                employees.
              </div>
            </div>{" "}
            <div className="col-md-6 px-0">
              <div className="img-box">
                <img src="images/about-video.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="slider_section layout_padding-bottom">
        <div className="container ">
          <div className="heading_container">
            <h2>Our staffs</h2>
            <hr />
          </div>
          <div
            id="carouselExample2Controls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="img-box">
                <AliceCarousel
                  mouseTracking
                  items={itemStaff}
                  autoPlay="false"
                  disableButtonsControls="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="slider_section layout_padding-bottom">
        <div className="container ">
          <div className="heading_container">
            <h2>Our Customers Say</h2>
            <hr />
          </div>
          <div
            id="carouselExample2Controls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="img-box">
                <AliceCarousel
                  mouseTracking
                  items={itemTestimonial}
                  autoPlay="false"
                  infinite="false"
                  disableButtonsControls="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
