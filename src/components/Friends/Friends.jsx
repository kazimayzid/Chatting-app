import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { SlOptions } from "react-icons/sl";


const Friends = () => {
  const userData = useSelector((state) => state.user.value);
  const [friendsData, setFriendsData] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      // const data = snapshot.val();
      let friendsArr = [];
      snapshot.forEach((item) => {
        const request = item.val();
        if (userData.uid === request.senderId || userData.uid === request.receiverId) {
          friendsArr.push(request);
        }
      });
      setFriendsData(friendsArr);
    });
  }, [userData.uid]);
  console.log(friendsData, "friends");

  return (
    <>
      <div className="h-[20%]">
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
      <div className=" mt-[15px] px-[22px] rounded-[20px] h-[85%] overflow-y-auto">
        {friendsData.map((friend, index) => (
          <div className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]">
            <div className="flex items-center">
              <div
                key={index}
                className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                style={{ backgroundImage: `url(${Profile})` }}
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
                  {friend.message}
                </p>
              </div>
            </div>
            <p className="font-poppins font-medium text-[10px] text-[rgba(0,0,0,0.5)]">
              <SlOptions size={20}/>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
