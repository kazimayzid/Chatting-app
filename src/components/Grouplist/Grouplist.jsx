import React, { useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi2";
import { ImCancelCircle } from "react-icons/im";

export const Grouplist = () => {
  const [show, setShow] = useState(false);
  const optionHandle = () => {
    setShow(true);
  };
  const optionCancelHandle = () =>{
    setShow(false)
  }
  // logic for design section====================
  // maping for Group list

  const groupList = [
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile1,
      name: "Johan",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile2,
      name: "Adam ambros",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile1,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
  ];
  // Logic for design End==============================
  return (
    <>
      <div className="relative h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
        <div className="h-[20%]">
          <div className="flex justify-between items-center px-4">
            <p className="font-poppins font-semibold text-[20px] text-black">
              Groups List
            </p>
            <button
              onClick={optionHandle}
              className="border-[1px] py-1 px-2 rounded-xl border-green-500 hover:scale-115 hover:bg-green-500 hover:text-white text-black  duration-500"
            >
              <HiUserGroup />
            </button>
          </div>

          <div className="relative mx-5">
            <input
              type="search"
              placeholder="Search"
              className="w-full px-4 border focus:outline-none placeholder:font-poppins placeholder:font-medium placeholder:text-[16px] placeholder:text-[rgba(61,61,61,0.35)] py-[17px] pl-[75px] rounded-[20px] border-none shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            />
            <CiSearch className="absolute top-[50%] translate-[-50%] left-[23px] w-[19px] h-[19px] text-black text-[5px] font-bold  " />
            <PiDotsThreeVerticalBold className="absolute top-[50%] translate-[-50%] right-[23px] w-[19px] h-[19px] text-black text-[5px] font-bold " />
          </div>
        </div>

        <div className=" mt-[15px] px-[22px] rounded-[20px] h-[75%] overflow-y-auto">
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
              <button className="font-poppins font-semibold text-[20px] text-black px-[22px] hover:text-white hover:bg-black rounded-[5px] duration-300 mr-1">
                {group.button}
              </button>
            </div>
          ))}
        </div>
        {show && (
          <div className="absolute top-0 right-0 z-50 w-[100%] h-[100vh] backdrop-blur-[4px] p-5">
            <div>
               <ImCancelCircle onClick={ optionCancelHandle } className="text-[25px] hover:scale-120 duration-500 text-red-500 " />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
