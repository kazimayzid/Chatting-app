import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { SlOptions } from "react-icons/sl";

const Friends = () => {
  const userData = useSelector((state) => state.user.value);
  const [friendsData, setFriendsData] = useState([]);
  const [openOptionIdx, setOpenOptionIdx] = useState(null);
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
          friendsArr.push(request);
        }
      });
      setFriendsData(friendsArr);
    });
  }, [userData.uid]);

  const optionHandle = (index) => {
    setOpenOptionIdx((prevIndex) => prevIndex === index? null : index);
  };
  
  const blockHandle = (user) => {
    // console.log(user, "ok");
    set(push(ref(db, 'block/')),{
      senderId: user.senderId,
      senderName: user.senderName,
      senderEmail: user.senderEmail,
      receiverId: user.receiverId,
      receiverName: user.receiverName,
      receiverEmail: user.receiverEmail,
    });
  }

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
                  {
                    userData.uid === friend.senderId
                    ? friend.receiverEmail
                    : friend.senderEmail
                  }
                </p>
              </div>
            </div>
            <div className="relative">
              <p onClick={() => optionHandle(index)} className="cursor-pointer">
                <SlOptions className="hover:scale-110" size={20} />
              </p>
              {
                openOptionIdx === index && (<div 
                className=" absolute top-[-5px] gap-2 right-[30px] flex">
                <button className="font-poppins border-black border-[1px] px-3 py-1 rounded-[6px] hover:bg-black hover:text-white duration-300">Unfriend</button>
                <button onClick={() => blockHandle(friend)} className="font-poppins border-black border-[1px] px-3 py-1 rounded-[6px] hover:bg-black hover:text-white duration-300">Block</button>
              </div>)
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
