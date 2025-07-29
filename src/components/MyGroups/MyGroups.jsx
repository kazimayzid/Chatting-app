import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { ImCancelCircle } from "react-icons/im";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const MyGroups = () => {
  const userData = useSelector((state) => state.user.value);
  const [groups, setGroups] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const groupListRef = ref(db, "groups/");
    onValue(groupListRef, (snapshot) => {
      let grouplistArr = [];
      snapshot.forEach((items) => {
        const val = items.val();
        console.log(val, "helo");

        if (val.members[userData.uid]) {
          grouplistArr.push({ ...val, key: items.key });
        }
      });
      setGroups(grouplistArr);
    });
  }, []);

  const romveHandle = (items) => {
    remove(ref(db, `groups/${items.key}`));

    toast.error("Group Delete");
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
      <div className="relative h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
        <div className="h-[20%]">
          <div className="flex justify-between items-center px-4">
            <p className="font-poppins font-semibold text-[20px] text-black">
              My Groups
            </p>
            <PiDotsThreeVerticalBold className=" w-[19px] h-[19px] text-black text-[5px] font-bold " />
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
          {groups.map((group, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)] "
            >
              <div className="flex items-center">
                <div
                  className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                  style={{ backgroundImage: `url(${Profile1})` }}
                ></div>
                <div className="ml-[14px]">
                  <h1 className="font-poppins font-semibold text-lg text-black">
                    {group.groupName}
                  </h1>
                  <p className="font-poppins font-medium text-[14px] text-homePrimary">
                    {" "}
                    {group.adminName}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-2">
                <p className="p-1 border-[1px] border-homePrimary rounded-lg cursor-pointer hover:scale-110 duration-300">
                  <FaInfoCircle size={25} className="text-homePrimary" />
                </p>
                <p
                  onClick={() => romveHandle(group)}
                  className="p-1 border-[1px] border-red-400 rounded-lg cursor-pointer hover:scale-110 hover:bg-red-400 duration-300"
                >
                  <RiDeleteBin5Line
                    size={25}
                    className="text-red-400 hover:text-white"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
