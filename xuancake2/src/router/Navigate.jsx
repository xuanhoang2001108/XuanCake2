import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage";
import Layout from "../pages/Layout";
import Order from "../pages/Order";
import Testimonial from "../pages/Testimonial";
import About from "../pages/About";
import Cake from "../pages/Cake";
import Authorization from "../pages/Authorization";
import Contact from "../pages/Contact";

const Navigate = () => {
  return (
    <Routes>
      <Route element={<Layout renderHeaderAndFooter={true} />}>
        <Route path="/HomePage" element={<Home />}></Route>
        <Route path="/Cake" element={<Cake />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Testimonial" element={<Testimonial />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Order" element={<Order />}></Route>
      </Route>
      <Route path="/" element={<Authorization />}></Route>
    </Routes>
  );
};

export default Navigate;
