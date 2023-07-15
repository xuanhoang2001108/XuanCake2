import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage";
import Layout from "../pages/Layout";
import Order from "../pages/Order";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Cake from "../pages/Cake";
import Authorization from "../pages/Authorization";
import CakeDetail from "../pages/CakeDetail";
import AdminLayout from "../pages/AdminLayout";
import StatisticManagement from "../pages/StatisticManagement";
import UserManagement from "../pages/UserManagement";
import CakeManagement from "../pages/CakeManagement";
import OrderManagement from "../pages/OrderManagement";
import OrderHistory from "../pages/OrderHistory"
import AddCake from "../pages/AddCake"

const Navigate = () => {
  return (
    <Routes>
      <Route element={<Layout renderHeaderAndFooter={true} />}>
      <Route path="/" element={<Home />}></Route>
        <Route path="/Cake" element={<Cake />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Order" element={<Order />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/CakeDetail/:productId" element={<CakeDetail/>} />  
        <Route path="/OrderHistory" element={<OrderHistory />}></Route>
      </Route>
      <Route element={<AdminLayout renderHeaderAndFooter={false} />}>
       
        <Route path="/StatisticManagement" element={<StatisticManagement />}></Route>
        <Route path="/UserManagement" element={<UserManagement />}></Route>
        <Route path="/CakeManagement" element={<CakeManagement />}></Route>
        <Route path="/OrderManagement" element={<OrderManagement />}></Route>
        <Route path="/AddCake" element={<AddCake />}></Route>
      </Route>

    
      <Route path="/Authorization" element={<Authorization />}></Route>
    </Routes>
  );
};

export default Navigate;
