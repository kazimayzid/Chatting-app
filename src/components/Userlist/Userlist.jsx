import React from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";

export const Userlist = () => {
  // logic for design Start================
  // maping for Friends----
  const groupList = [
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      icon: <FaPlus />,
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      icon: <FaPlus />,
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      icon: <FaPlus />,
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      icon: <FaPlus />,
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      icon: <FaPlus />,
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      icon: <FaPlus />,
    },
  ];
  return (
    <>
      <div className="relative">
        <input
          type="search"
          placeholder="Search"
          className="w-full px-4 border focus:outline-none placeholder:font-poppins placeholder:font-medium placeholder:text-[16px] placeholder:text-[rgba(61,61,61,0.35)] py-[17px] pl-[75px] rounded-[20px] border-none shadow-xl/20"
        />
        <CiSearch className="absolute top-[50%] translate-[-50%] left-[23px] w-[19px] h-[19px] text-black text-[5px] font-bold  " />
        <PiDotsThreeVerticalBold className="absolute top-[50%] translate-[-50%] right-[23px] w-[19px] h-[19px] text-black text-[5px] font-bold " />
      </div>
      <div className="shadow-xl/20 mt-[43px] pt-[13px] px-[22px] rounded-[20px] h-[100%]  overflow-y-auto">
        <div className="flex justify-between items-center">
          <p className="font-poppins font-semibold text-[20px] text-black">
            User List
          </p>
          <PiDotsThreeVerticalBold className=" w-[19px] h-[19px] text-black text-[5px] font-bold " />
        </div>
        <div className="mt-[17px]">
          {groupList.map((group, index) => (
            <div className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]">
              <div className="flex items-center">
                <div
                  key={index}
                  className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                  style={{ backgroundImage: `url(${group.img})` }}
                ></div>
                <div className="ml-[14px]">
                  <h1 className="font-poppins font-semibold text-lg text-black">
                    {group.name}
                  </h1>
                  <p className="font-poppins font-medium text-[14px] text-homePrimary">
                    {" "}
                    {group.message}
                  </p>
                </div>
              </div>
              <button className="text-black hover:text-white hover:bg-black px-[8px] py-[4px] rounded-[5px]">
                {group.icon}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
