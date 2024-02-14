import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <div className="relative z-0">
        <div className=" transform rotate-177 h-screen"></div>
        <span className="absolute inset-0 bg-white clip-polygon"></span>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
