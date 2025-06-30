import { NavLink } from "react-router";
import Profile from "../../assets/Mayzidpic.JPG";
import { AiOutlineHome } from "react-icons/ai";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Friends from "../../components/Friends/Friends";
import { Userlist } from "../../components/Userlist/Userlist";
import { FriendRequest } from "../../components/FriendRequest/FriendRequest";
import { MyGroups } from "../../components/MyGroups/MyGroups";
import { BlockedUsers } from "../../components/BlockedUsers/BlockedUsers";

export default function Home() {
  // Logic for design start========================
  //  maping for navlist
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
  // maping for Group list

  const groupList = [
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
    }
  ];
  // Logic for design End==============================

  return (
    <div className="flex gap-x-[43px] mt-[20px] ml-[20px]">
      <div className="w-[10%] h-[95vh] rounded-[20px] bg-[#1E1E1E] pt-[38px] flex flex-col items-center gap-5">
        <div className="rounded-full w-[100px] h-[100px] bg-[url(assets/Mayzidpic.JPG)]  bg-center bg-cover bg-no-repeat"></div>
        <div className="w-full mt-5 flex flex-col gap-4 items-start pl-[25px]">
          {navData.map((value, index) => (
            <div
              key={index}
              className="hover:bg-white text-white hover:text-black pl-[45px] pr-[69px] py-[20px] rounded-l-[20px] relative text-[24px]"
            >
              {value.icon}
              <div className="absolute top-0 right-0 w-[10px] h-full bg-[#1E1E1E] rounded-l-[20px]"></div>
            </div>
          ))}
        </div>
        <div className="mb-[35px] mt-auto">
          <VscSignOut className="w-[46px] h-[49px] text-white" />
        </div>
      </div>
      <div className="w-[90%] flex flex-col gap-y-[43px]">
        <div className="flex gap-x-[22px] h-[50%]">
          <div className="w-[34%] h-[100%]">
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
                      <h1 className="font-poppins font-semibold text-lg text-black">{group.name}</h1>
                      <p className="font-poppins font-medium text-[14px] text-homePrimary"> {group.message}</p>
                    </div>
                    </div>
                    <button className="font-poppins font-semibold text-[20px] text-black px-[22px] hover:text-white hover:bg-black rounded-[5px] duration-300 mr-1">{group.button}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[33%] h-[300px] "><Friends/></div>
          <div className="w-[33%] h-[300px]"><Userlist/></div>
        </div>
        <div className="h-[50%] overflow-y-auto flex gap-x-[22px]">
          <div className="w-[34%] h-[300px]"><FriendRequest/></div>
          <div className="w-[33%] h-[300px]"><MyGroups/></div>
          <div className="w-[33%] h-[300px]"><BlockedUsers/></div>
        </div>
      </div>
    </div>
  );
}
