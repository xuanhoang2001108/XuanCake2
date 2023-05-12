import { React, useEffect, useState } from "react";
import axios from "axios";

const Cake = () => {
  const [storeData, setStoreData] = useState([]);
  const getAllCakeData = async () => {
    try {
      console.log("aa");

      const res = await axios.get(`http://localhost:5000/cake/getAll`);
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllCakeData();
  }, []);

  return (
    <div className="sub_page">
      <section className="cake_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <hr />
            <h2>Sweet cakes</h2>
          </div>
        </div>
        <div className="container-fluid">
          <div className="cake_container">
            {storeData.map((item) => {
              if (item.type == "Sweet") {
                return (
                  <div className="box">
                    <img src={item.image} alt="" />
                    <div className="link_box">
                      <h5 className="name">{item.name}</h5>
                      <div className="type">{item.type}</div>
                      <div className="price">{item.price}$</div>
                      <hr />
                      <a href="/Cart">Add to cart</a>
                    </div>
                  </div>
                );
              }
            })}

            {/* <div className="box">
              <img src="images/product-1.jpg" alt="" />
              <div className="link_box">
                <h5 className="name">Dozen cupcake</h5>
                <div className="type">Sweet</div>
                <div className="price">19$</div>
                <hr/>
                <a href="/Cart">Add to cart</a>
              </div>
            </div> */}

            {/* <div className="box">
              <img src="images/product-2.jpg" alt="" />
              <div className="link_box">
                <h5>Cookie and cream</h5> <div className="cake-price1">19$</div>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-3.jpg" alt="" />
              <div className="link_box">
                <h5>Gluten free mini dozen</h5>{" "}
                <div className="cake-price1">19$</div>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-4.jpg" alt="" />
              <div className="link_box">
                <h5>Cookie dough</h5> <div className="cake-price1">19$</div>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-5.jpg" alt="" />
              <div className="link_box">
                <h5>Vanilla salted caramel</h5>{" "}
                <div className="cake-price1">19$</div>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-6.jpg  " alt="" />
              <div className="link_box">
                <h5>German chocolate</h5> <div className="cake-price1">19$</div>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-7.jpg  " alt="" />
              <div className="link_box">
                <h5>German chocolate</h5> <div className="cake-price1">19$</div>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-8.jpg  " alt="" />
              <div className="link_box">
                <h5>German chocolate</h5> <div className="cake-price1">19$</div>
                <a href="/Cart">Add to cart</a>
              </div>
            </div> */}
          </div>
        </div>
        <div className="container">
          <div className="heading_container">
            <hr />
            <h2>Salty cakes</h2>
          </div>
        </div>
        <div className="container-fluid">
          <div className="cake_container">
            <div className="box">
              <img src="images/product-1.jpg" alt="" />
              <div className="link_box">
                <h5>Dozen cupcake</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-2.jpg" alt="" />
              <div className="link_box">
                <h5>Cookie and cream</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-3.jpg" alt="" />
              <div className="link_box">
                <h5>Gluten free mini dozen</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-4.jpg" alt="" />
              <div className="link_box">
                <h5>Cookie dough</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-5.jpg" alt="" />
              <div className="link_box">
                <h5>Vanilla salted caramel</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-6.jpg  " alt="" />
              <div className="link_box">
                <h5>German chocolate</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-7.jpg  " alt="" />
              <div className="link_box">
                <h5>German chocolate</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
            <div className="box">
              <img src="images/product-8.jpg  " alt="" />
              <div className="link_box">
                <h5>German chocolate</h5>
                <a href="/Cart">Add to cart</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cake;
