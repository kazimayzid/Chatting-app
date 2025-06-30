import React from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png"
import Profile2 from "../../assets/profile2.png"
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
export const Grouplist = () => {
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
      <div>
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-full px-4 border focus:outline-none placeholder:font-poppins placeholder:font-medium placeholder:text-[16px] placeholder:text-[rgba(61,61,61,0.35)] py-[17px] pl-[75px] rounded-[20px] border-none shadow-xl/20"
          />
          <CiSearch className="absolute top-[50%] translate-[-50%] left-[23px] w-[19px] h-[19px] text-black text-[5px] font-bold  " />
          <PiDotsThreeVerticalBold className="absolute top-[50%] translate-[-50%] right-[23px] w-[19px] h-[19px] text-black text-[5px] font-bold " />
        </div>
        <div className="shadow-xl/20 mt-[43px] pt-[13px] px-[22px] rounded-[20px]  h-[300px]  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-[2px]">
          <div className="flex justify-between items-center">
            <p className="font-poppins font-semibold text-[20px] text-black">
              Groups List
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
                <button className="font-poppins font-semibold text-[20px] text-black px-[22px] hover:text-white hover:bg-black rounded-[5px] duration-300 mr-1">
                  {group.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
