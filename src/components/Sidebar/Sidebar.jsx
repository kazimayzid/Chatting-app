import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { userLogInfo } from "../../features/slice/userSlice";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const data = useSelector(state=> state.user.value);
  console.log(data, "two");
  
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
        <p className="text-white font-poppins text-[16px]">{data.displayName}</p>
        <div className="w-full mt-5 flex flex-col gap-4 items-center pl-[25px]">
          {navData.map((value, index) => (
            <div
              key={index}
              className="relative z-10 hover:bg-white text-white hover:text-black pl-[45px] pr-[69px] py-[20px] rounded-l-[25px] text-[24px] after:absolute after:content-[''] after:top-0 after:right-0 after:w-[100%] after:h-[100%] after:bg-[#1E1E1E] after:rounded-l-[25px] hover:after:w-[8px] after:transition after:-z-10 transition-all"
            >
              {value.icon}
            </div>
          ))}
        </div>
        <div
          onClick={handleLogout}
          className="mb-[35px] mt-auto ml-[25px] cursor-pointer relative z-10 hover:bg-white text-white hover:text-black pl-[45px] pr-[69px] py-[20px] rounded-l-[25px] text-[24px] after:absolute after:content-[''] after:top-0 after:right-0 after:w-[100%] after:h-[100%] after:bg-[#1E1E1E] after:rounded-l-[25px] hover:after:w-[8px] after:transition after:-z-10 transition-all"
        >
          <VscSignOut className="w-[46px] h-[43px]" />
        </div>
      </div>
    </>
  );
};
