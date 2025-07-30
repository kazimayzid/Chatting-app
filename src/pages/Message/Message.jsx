import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { BiLogoTelegram } from "react-icons/bi";

import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { SlOptions } from "react-icons/sl";
import { useToaster } from "react-hot-toast";

const Friends = () => {
  const userData = useSelector((state) => state.user.value);
  const [friendsData, setFriendsData] = useState([]);
  const [chat, setChat] = useState([]);
  const [openOptionIdx, setOpenOptionIdx] = useState(null);
  const [show, setShow] = useState(false);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      // const data = snapshot.val();
      let friendsArr = [];
      snapshot.forEach((item) => {
        const request = item.val();
        if (
          userData.uid === request.senderId ||
          userData.uid === request.receiverId
        ) {
          friendsArr.push({ ...request, key: item.key });
        }
      });
      setFriendsData(friendsArr);
    });
  }, [userData.uid]);

  const optionHandle = (index) => {
    setOpenOptionIdx((prevIndex) => (prevIndex === index ? null : index));
  };

  const blockHandle = (user) => {
    const blockId =
      userData.uid === user.senderId ? user.receiverId : user.senderId;
    const blockName =
      userData.uid === user.senderId ? user.receiverName : user.senderName;
    const blockEmail =
      userData.uid === user.senderId ? user.receiverEmail : user.senderEmail;
    const blockerId = userData.uid;
    const blockerName = userData.displayName;
    const blockerEmail = userData.email;
    // console.log(user, "ok");
    set(push(ref(db, "block/")), {
      blockId: blockId,
      blockName: blockName,
      blockEmail: blockEmail,
      blockerId: blockerId,
      blockerName: blockerName,
      blockerEmail: blockerEmail,
    });
    console.log(user);

    remove(ref(db, `friends/${user.key}`));
  };
  const unfriendHandel = (user) => {
    remove(ref(db, `friends/${user.key}`));
  };
  const chatHandle = (items) => {
    let chatArr = [items];
    setChat(chatArr);
    setShow(true);
  };

  return (
    <>
      <div className="flex gap-x-3">
        <div className="w-[30%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
          <div className="h-[10vh]">
            <div className="flex justify-between items-center px-4">
              <p className="font-poppins font-semibold text-[20px] text-black">
                Friends
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
          <div className=" mt-[15px] px-[22px] rounded-[20px] h-[85vh] overflow-y-auto">
            {friendsData.map((friend, index) => (
              <div className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]">
                <div className="flex items-center">
                  <div
                    key={index}
                    className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                    style={{ backgroundImage: `url(${Profile2})` }}
                  ></div>
                  <div className="ml-[14px]">
                    <h1 className="font-poppins font-semibold text-lg text-black">
                      {/* {friend.friendName} */}
                      {userData.uid === friend.senderId
                        ? friend.receiverName
                        : friend.senderName}
                    </h1>
                    <p className="font-poppins font-medium text-[14px] text-homePrimary">
                      {" "}
                      {userData.uid === friend.senderId
                        ? friend.receiverEmail
                        : friend.senderEmail}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <p
                    onClick={() => optionHandle(index)}
                    className="cursor-pointer"
                  >
                    <SlOptions
                      className="hover:scale-150 duration-500"
                      size={20}
                    />
                  </p>
                  {openOptionIdx === index && (
                    <div className=" absolute top-[-15px] gap-2 right-[30px] flex bg-indigo-50 py-2 px-2.5 rounded-lg">
                      <button
                        onClick={() => unfriendHandel(friend)}
                        className="font-poppins border-black border-[1px] px-3 py-1 rounded-[6px] hover:bg-black hover:text-white duration-300 hover:scale-115"
                      >
                        Unfriend
                      </button>
                      <button
                        onClick={() => blockHandle(friend)}
                        className="font-poppins border-red-400 border-[1px] px-3 py-1 rounded-[6px] hover:bg-red-400 hover:text-white duration-300 hover:scale-115"
                      >
                        Block
                      </button>
                      <button
                        onClick={() => chatHandle(friend)}
                        className="font-poppins border-blue-400 border-[1px] px-3 py-1 rounded-[6px] hover:bg-blue-400 hover:text-white duration-300 hover:scale-115"
                      >
                        Chat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[70%]  rounded-[20px] h-[98vh] px-5 py-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          {show &&
            chat.length > 0 &&
            chat.map((items) => (
              <div
                key={items.key}
                className="flex flex-col justify-between h-full"
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-center border-b-[1px] border-[rgba(0,0,0,0.25)] pb-5">
                    <div className="flex items-center">
                      <div
                        className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                        style={{ backgroundImage: `url(${Profile2})` }}
                      ></div>
                      <div className="ml-[14px]">
                        <h1 className="font-poppins font-semibold text-lg text-black">
                          {/* {friend.friendName} */}
                          {userData.uid === items.senderId
                            ? items.receiverName
                            : items.senderName}
                        </h1>
                        <p className="font-poppins font-medium text-[14px] text-homePrimary">
                          {" "}
                          {userData.uid === items.senderId
                            ? items.receiverEmail
                            : items.senderEmail}
                        </p>
                      </div>
                    </div>
                    <div>
                      <SlOptions
                        className="hover:scale-150 duration-500"
                        size={20}
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto mt-4"></div>
                </div>
                <div className="flex justify-between items-center border-t-[1px] border-[rgba(0,0,0,0.25)] pt-4">
                  <input
                    className="w-[95%]  py-2 px-1 focus:outline-none bg-[#F1F1F1] rounded-[10px]"
                    type="text"
                  />
                  <button className="border-[1px] px-2 py-2 rounded-[10px] hover:bg-black duration-300 hover:text-white">
                    <BiLogoTelegram size={24} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Friends;
