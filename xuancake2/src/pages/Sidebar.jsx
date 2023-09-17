import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
} from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import "../style/Sidebar.css";
const Sidebar = () => {
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
      
        alert(email + " logged out successfully!");

        localStorage.removeItem("email");
        // Điều hướng về trang đăng nhập
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const menuItem = [
    {
      path: "/CakeManagement",
      name: "Cake Management",
    },
    {
      path: "/StatisticManagement",
      name: "Statistic Management",
    },
    {
      path: "/UserManagement",
      name: "User Management",
    },
    {
      path: "/OrderManagement",
      name: "Order Management",
    },
  ];

  return (
    <div className="sidebar ">
      <div className="sidebar__top d-flex justify-content-center align-items-center">
        <div className="sidebar__top__logo">
          <Link className="navbar-brand" href="/">
            <strong>
              Xuan
              <img src="images/logo.png" alt="" />
            </strong>
          </Link>
        </div>
        <p className="sidebar__top__text"></p>
      </div>

      <div className="sidebar__content d-flex justify-content-center flex-column">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>

      <button className="sidebar__logout__btn btn " onClick={handleLogout}>
        {username} Log out
      </button>
    </div>
  );
};

export default Sidebar;
