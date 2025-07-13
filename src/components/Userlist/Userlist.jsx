import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

export const Userlist = () => {
  const data = useSelector(state => state.user.value)
  console.log(data, "hwllo");
  
  const db = getDatabase();
  const [userlist, setUserList] = useState([])
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let userListAry = [];
      snapshot.forEach((items) => {
        if (data.uid !== items.key) {
          
          userListAry.push(items.val());
        }
      });
      setUserList(userListAry);
     
     
    });
  }, []);

  const handleRequest

  
  return (
    <>
      <div className="h-[100%]">
        <div>
          <div className="flex justify-between items-center px-4">
            <p className="font-poppins font-semibold text-[20px] text-black">
              User List
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
        <div className="shadow-2xl mt-[15px] px-[22px] rounded-[20px] h-[85%]  overflow-y-auto">
          <div>
            {userlist.map((user, index) => (
              <div className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]">
                <div className="flex items-center">
                  <div
                    key={index}
                    className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                    style={{ backgroundImage: `url(${user.profile ? user.profile : Profile})`, }}
                  ></div>
                  <div className="ml-[14px]">
                    <h1 className="font-poppins font-semibold text-lg text-black">
                      {user.username}
                    </h1>
                    <p className="font-poppins font-medium text-[14px] text-homePrimary">
                      
                      {user.email}
                    </p>
                  </div>
                </div>
                <button className="text-black hover:text-white hover:bg-black px-[8px] py-[4px] rounded-[5px]">
                  <FaPlus onClick={()=>handleRequest(items)}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
