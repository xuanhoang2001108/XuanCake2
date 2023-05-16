import { React, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cake = () => {
  const [storeData, setStoreData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (item) => {
    let cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

    // Tạo một bản sao mới của mảng cartItems
    const updatedCartItems = [...cartItems];

    // Kiểm tra xem mục đã có trong giỏ hàng hay chưa
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      // Nếu mục đã có trong giỏ hàng, cập nhật số lượng
      updatedCartItems[existingItemIndex].quantity++;
    } else {
      // Nếu mục chưa có trong giỏ hàng, thêm vào
      updatedCartItems.push({ ...item, quantity: 1 });
    }

    // Cập nhật state cartItems và lưu vào local storage
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    console.log(updatedCartItems);
    toast.success("Add successfully!");
  };

  const getAllCakeData = async () => {
    try {
      console.log();

      const res = await axios.get(`http://localhost:5000/cake/getAll`);
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllCakeData();
  }, []);

  return (
    <div className="sub_page">
      <ToastContainer />
      <section className="cake_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <hr />
            <h2>Sweet cakes</h2>
          </div>
        </div>
        <div className="container-fluid">
          <div className="cake_container">
            {storeData.map((item, index) => {
              if (item.type === "Sweet") {
                return (
                  <div className="box" key={item._id}>
                    <img src={item.image} alt="" />
                    <div className="link_box">
                      <h5 className="name">{item.name}</h5>
                      <div className="type">{item.type}</div>
                      <div className="price">{item.price}$</div>
                      <hr />
                      <a className="my-link" onClick={() => addToCart(item)}>
                        Add to cart{" "}
                      </a>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="container">
          <div className="heading_container">
            <hr />
            <h2>Salty cakes</h2>
          </div>
        </div>
        {/* <div className="container-fluid">
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
        </div> */}
      </section>
     
    </div>
  );
};

export default Cake;
