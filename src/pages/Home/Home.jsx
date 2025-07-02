import { NavLink } from "react-router";

import Friends from "../../components/Friends/Friends";
import { Userlist } from "../../components/Userlist/Userlist";
import { FriendRequest } from "../../components/FriendRequest/FriendRequest";
import { MyGroups } from "../../components/MyGroups/MyGroups";
import { BlockedUsers } from "../../components/BlockedUsers/BlockedUsers";
import { Grouplist } from "../../components/Grouplist/Grouplist";
import { Sidebar } from "../../components/Sidebar/Sidebar";
export default function Home() {

 

  return (
    <div className="flex gap-x-[43px] w-full h-screen overflow-hidden p-[20px]">
      {/* Sidebar (Left Panel) */}
      <div className="w-[10%] h-full rounded-[20px] bg-[#1E1E1E] pt-[38px] overflow-hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-[90%] flex flex-col h-full overflow-hidden">
        {/* Top Section */}
        <div className="flex-1 flex gap-x-[22px] overflow-hidden m-[20px]">
          <div className="w-[34%] h-full shadow-xl/30 overflow-visible"><Grouplist /></div>
          <div className="w-[33%] h-full "><Friends /></div>
          <div className="w-[33%] h-full "><Userlist /></div>
        </div>

        {/* Bottom Section */}
        <div className="flex-1 flex gap-x-[22px] overflow-hidden m-[20px]">
          <div className="w-[34%] h-full "><FriendRequest /></div>
          <div className="w-[33%] h-full "><MyGroups /></div>
          <div className="w-[33%] h-full "><BlockedUsers /></div>
        </div>
      </div>
    </div>
  );
}
