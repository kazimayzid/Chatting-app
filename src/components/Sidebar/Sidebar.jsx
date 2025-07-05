import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { userLogInfo } from "../../features/slice/userSlice";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(userLogInfo(null));
    navigate("/login"); 
  };

  const navData = [
    {
      icon: <AiOutlineHome className="w-[46px] h-[43px]" />,
    },
    {
      icon: <AiTwotoneMessage className="w-[46px] h-[43px]" />,
    },
    {
      icon: <IoSettingsOutline className="w-[46px] h-[43px]" />,
    },
  ];

  return (
    <>
      <div className="flex flex-col h-full items-center gap-5">
        <div className="rounded-full w-[100px] h-[100px] bg-[url(assets/Mayzidpic.JPG)] bg-center bg-cover bg-no-repeat"></div>
        <div className="w-full mt-5 flex flex-col gap-4 items-center pl-[25px]">
          {navData.map((value, index) => (
            <div
              key={index}
              className="hover:bg-white text-white duration-300 hover:text-black pl-[45px] pr-[69px] py-[20px] rounded-l-[20px] relative text-[24px]"
            >
              {value.icon}
              <div className="absolute top-0 right-0 w-[10px] h-full bg-[#1E1E1E] rounded-l-[20px]"></div>
            </div>
          ))}
        </div>
        <div onClick={handleLogout} className="mb-[35px] mt-auto cursor-pointer">
          <VscSignOut className="w-[46px] h-[49px] text-white" />
        </div>
      </div>
    </>
  );
};
