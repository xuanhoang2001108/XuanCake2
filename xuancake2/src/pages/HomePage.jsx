import React from "react";
import "../style/style.css";
import "../style/responsive.css";
import "../style/bootstrap.css";
import "../style/style.css.map";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src="images/shop-img.png"
    onDragStart={handleDragStart}
    role="presentation"alt=""
  />,
  <img
    src="images/slider-img2.png"
    onDragStart={handleDragStart}
    role="presentation"alt=""
  />,
  <img
    src="images/slider-img3.png"
    onDragStart={handleDragStart}
    role="presentation"alt=""
  />,
  <img
    src="images/slider-img4.png"
    onDragStart={handleDragStart}
    role="presentation"alt=""
  />,
];

function Home() {
  return (
    <div>
      <section className="shop_section layout_padding">
        <div className="container">
          <div className="box">
            <div className="detail-box">
              <h2>Cakes</h2>
              <p>Making your life sweeter one bite at a time!</p>
            </div>
            <div className="img-box">
              <section className=" slider_section position-relative">
                <div
                  id="carouselExampleControls"
                  className="carousel slide "
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="img-box">
                      <AliceCarousel
                        mouseTracking
                        items={items}
                        autoPlay="true"
                        infinite="true"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="btn-box">
              <Link to="/Cake">Buy Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about_section">
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
                  <h2>About Our Cakes Shop</h2>
                </div>
                <p>
                  When it comes to desserts, cake probably “takes the cake” for
                  being the champion of sweetness and goodness. I love it; you
                  love it; everyone loves it!
                </p>
                <Link to="/About">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cake_section layout_padding">
  <div className="container">
    <div className="heading_container">
      <hr />
      <h2>Our Cakes</h2>
    </div>
  </div>
  <div className="container-fluid">
    <div className="cake_container">
      <div className="row">
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-1.jpg" alt="" />
            <div className="link_box">
              <h5>Dozen cupcake</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-2.jpg" alt="" />
            <div className="link_box">
              <h5>Cookie and cream</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-3.jpg" alt="" />
            <div className="link_box">
              <h5>Gluten free mini dozen</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-4.jpg" alt="" />
            <div className="link_box">
              <h5>Cookie dough</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-5.jpg" alt="" />
            <div className="link_box">
              <h5>Vanilla salted caramel</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-6.jpg" alt="" />
            <div className="link_box">
              <h5>German chocolate</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-7.jpg" alt="" />
            <div className="link_box">
              <h5>German chocolate</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="box">
            <img src="images/product-8.jpg" alt="" />
            <div className="link_box">
              <h5>German chocolate</h5>
              <Link to="/Cake" onClick={() => window.scrollTo(0, 0)}>See more</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    
    </div>
  );
}

export default Home;
