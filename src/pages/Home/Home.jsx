import { NavLink, useNavigate } from "react-router";

import Friends from "../../components/Friends/Friends";
import { Userlist } from "../../components/Userlist/Userlist";
import { FriendRequest } from "../../components/FriendRequest/FriendRequest";
import { MyGroups } from "../../components/MyGroups/MyGroups";
import { BlockedUsers } from "../../components/BlockedUsers/BlockedUsers";
import { Grouplist } from "../../components/Grouplist/Grouplist";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Home() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.user.value);
  console.log(data);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!data?.emailVerified) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  });
  if (loading) return null;

  return (
    <>
      {/* {verify ? ( */}
      <div className=" gap-x-[43px] w-full h-screen overflow-hidden ">
        {/* Sidebar (Left Panel) */}
        

        {/* Main Content */}
        <div className=" flex flex-col h-full overflow-hidden">
          {/* Top Section */}
          <div className="flex-1 flex gap-x-[22px] h-[100%] overflow-hidden p-2">
            <div className="w-[34%] h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
              <Grouplist />
            </div>
            <div className="w-[33%] h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
              <Friends />
            </div>
            <div className="w-[33%] h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
              <Userlist />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex-1 flex gap-x-[22px] h-[100%] overflow-hidden p-2">
            <div className="w-[34%] h-[98%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
              <FriendRequest />
            </div>
            <div className="w-[33%] h-[98%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
              <MyGroups />
            </div>
            <div className="w-[33%] h-[98%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
              <BlockedUsers />
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        <p>not verified</p>
      )} */}
    </>
  );
}
