import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage";
import Layout from "../pages/Layout";
import Order from "../pages/Order";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Cake from "../pages/Cake";
import Authorization from "../pages/Authorization";
import Admin from "../pages/Admin";
const Navigate = () => {
  return (
    <Routes>
      <Route element={<Layout renderHeaderAndFooter={true} />}>
        <Route path="/HomePage" element={<Home />}></Route>
        <Route path="/Cake" element={<Cake />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Order" element={<Order />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
      </Route>
      <Route element={<Layout renderHeaderAndFooter={false} />}>
        <Route path="/Admin" element={<Admin />}></Route>
      </Route>

      <Route path="/" element={<Authorization />}></Route>
    </Routes>
  );
};

export default Navigate;
