import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";

export const FriendRequest = () => {
  const userData = useSelector((state) => state.user.value);
  const db = getDatabase();
  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      // const data = snapshot.val();
      let requestArr = [];
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.receiverId === userData.uid) {
          requestArr.push(request);
        }
      });
      setRequestList(requestArr);
    });
  }, [userData.uid]);

  const cancelHandler = (item) => {
    const cancelData = ref(
      db,
      `friendRequest/${item.senderId}_${item.receiverId}`
    );
    remove(cancelData);
  };
  // console.log(requestList, "reqlit");

  const acceptHandle = (friend) => {
    set(push(ref(db, `friends/`)), {
      senderId: friend.senderId,
      senderName: friend.senderName,
      senderEmail: friend.senderEmail,
      receiverId: friend.receiverId,
      receiverName: friend.receiverName,
      receiverEmail: friend.receiverEmail
    });
    const addFriend = ref(
      db,
      `friendRequest/${friend.senderId}_${friend.receiverId}`
    );
    remove(addFriend);
  };
  return (
    <>
      <div className="h-[20%]">
        <div className="flex justify-between items-center px-4">
          <p className="font-poppins font-semibold text-[20px] text-black">
            Friend Request
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
        {requestList.map((req, index) => (
          <div
            key={index}
            className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center">
              <div
                className="bg-blue-100 text-3xl flex items-center justify-center font-bold text-[#000000b6] w-[70px] h-[70px] bg-center bg-cover rounded-full"
                // style={{ backgroundImage: `url(${Profile})` }}
              >{(req.senderName).charAt(0).toUpperCase()}</div>
              <div className="ml-[14px]">
                <h1 className="font-poppins font-semibold text-lg text-black">
                  {req.senderName}
                </h1>
                <p className="font-poppins font-medium text-[14px] text-homePrimary">
                  {" "}
                  {requestList.message}
                </p>
              </div>
            </div>
            <div className="flex gap-x-1">
              <button
                onClick={() => cancelHandler(req)}
                className="text-black hover:text-white hover:bg-red-400 px-[8px] py-[4px] rounded-[5px] duration-300 mr-0.5 border-[1px] border-red-400 hover:scale-110"
              >
                Cancel
              </button>
              <button
                onClick={() => acceptHandle(req)}
                className="text-black hover:text-white hover:bg-green-400 px-[8px] py-[4px] rounded-[5px] duration-300 border-[1px] border-green-400 hover:scale-110"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
