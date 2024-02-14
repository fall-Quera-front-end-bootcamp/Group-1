import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="relative z-0">
      <div className=" transform rotate-177 h-screen"></div>
      <span className="absolute inset-0 bg-white clip-polygon"></span>
    </div>
  );
}

export default AuthLayout;
