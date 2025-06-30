import { NavLink } from "react-router";

import { AiOutlineHome } from "react-icons/ai";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import Friends from "../../components/Friends/Friends";
import { Userlist } from "../../components/Userlist/Userlist";
import { FriendRequest } from "../../components/FriendRequest/FriendRequest";
import { MyGroups } from "../../components/MyGroups/MyGroups";
import { BlockedUsers } from "../../components/BlockedUsers/BlockedUsers";
import { Grouplist } from "../../components/Grouplist/Grouplist";

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
 

  return (
    // Navbar Section ===================
    <div className="flex gap-x-[43px] mt-[20px] ml-[20px]">
      <div className="w-[10%] h-[95vh] rounded-[20px] bg-[#1E1E1E] pt-[38px] flex flex-col items-center gap-5">
        <div className="rounded-full w-[100px] h-[100px] bg-[url(assets/Mayzidpic.JPG)]  bg-center bg-cover bg-no-repeat"></div>
        <div className="w-full mt-5 flex flex-col gap-4 items-start pl-[25px]">
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
        <div className="mb-[35px] mt-auto">
          <VscSignOut className="w-[46px] h-[49px] text-white" />
        </div>
      </div>
      <div className="w-[90%] flex flex-col gap-y-[43px]">
        <div className="flex gap-x-[22px] h-[50%]">
          <div className="w-[34%] h-[100%]"><Grouplist/></div>
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
