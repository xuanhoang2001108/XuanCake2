import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = ({ renderHeaderAndFooter}) => {
  return (
    <div>
      {renderHeaderAndFooter && <Header />}
      <Outlet></Outlet>
      {renderHeaderAndFooter && <Footer />}
    </div>
  );
};

export default Layout;
