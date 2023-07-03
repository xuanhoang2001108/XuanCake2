import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/Sidebar";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <div className="content-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
