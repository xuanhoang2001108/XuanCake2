import React from 'react'
import '../style/style.css';
import '../style/responsive.css';
import '../style/bootstrap.css';
import '../style/style.css.map';

const Footer = () => {
  return (
    <div>
    <section className="info_section layout_padding">
    <div className="container">
      <div className="info_logo">
        <h2 className="footer-text">
          Xuan 
          <img src="images/footer-logo.png" alt=""/>
        </h2>
      </div>
      <div className="info_contact">
        <div className="row">
          <div className="col-md-4">
            <a href="">
              <img src="images/location.png" alt=""/>
              <span>
                123, 9 districts, HCM City
              </span>
            </a>
          </div>
          <div className="col-md-4">
            <a href="">
              <img src="images/call.png" alt=""/>
              <span>
                Call : +84123456
              </span>
            </a>
          </div>
          <div className="col-md-4">
            <a href="">
              <img src="images/mail.png" alt=""/>
              <span>
                xuancake@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 col-lg-9">
          <div className="info_form">
            <form action="">
              <input type="text" placeholder="Enter your email"/>
              <button>
                subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4 col-lg-3">
          <div className="info_social">
            <div>
              <a href="">
                <img src="images/facebook-logo-button.png" alt=""/>
              </a>
            </div>
            <div>
              <a href="">
                <img src="images/twitter-logo-button.png" alt=""/>
              </a>
            </div>
            <div>
              <a href="#">
                <img src="images/linkedin.png" alt=""/>
              </a>
            </div>
            <div>
              <a href="#">
                <img src="images/instagram.png" alt=""/>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
    </section>
    <section className="container-fluid footer_section">
    <p>
      &copy; <span id="displayYear"></span> All Rights Reserved By
      <a href=""> xuanhoangdev</a>
    </p>
  </section>
  </div>
  )
}

export default Footer