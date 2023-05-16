import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/Sidebar"

const AdminLayout = () => {
    return (
        <div className='d-flex'>
            <SideBar/>
            <div className="main flex-grow-1 p-5">
                <Outlet />
            </div>
        </div>
    )
}


export default AdminLayout

