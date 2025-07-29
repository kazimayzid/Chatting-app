import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Outlet } from "react-router";

const RootlayOut = () => {
  return (
    <div className="flex items-start justify-between gap-x-4 w-[100%] h-[100vh] overflow-hidden p-2">
      <div className="w-[10%] h-[100%] rounded-[20px] bg-[#1E1E1E] overflow-hidden ">
        <Sidebar />
      </div>
      <div className="w-[90%] ">
        <Outlet />
      </div>
    </div>
  );
};

export default RootlayOut;
