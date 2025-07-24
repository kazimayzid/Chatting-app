import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref, remove } from "firebase/database";
export const BlockedUsers = () => {
   const userData = useSelector((state) => state.user.value);
   const [blockList, setBlockList] = useState([])
   const db = getDatabase()

   useEffect(()=> {
    const blockListRef = ref(db, "block/");
    onValue(blockListRef, (snapshot) => {
      let blockArr = []
      snapshot.forEach((item) => {
        const block = item.val();
        if (userData.uid === block.blockId || userData.uid === block.blockerId) {
          blockArr.push({...block, key: item.key})
        }
        
      })
      setBlockList(blockArr);
      
    })
   }, [])
   
   const handleUnblock = (item) => {
        remove(ref(db, `block/${item.key}`)); 
   }
   

  
  return (
    <>
      
        <div className="h-[20%]">
          <div className="flex justify-between items-center px-4">
            <p className="font-poppins font-semibold text-[20px] text-black">
              Block Users
            </p>
            <PiDotsThreeVerticalBold className=" w-[19px] h-[19px] text-black text-[5px] font-bold " />
          </div>
          <div className="relative mx-5 ">
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
         
            {blockList.map((block, index) => (
              <div className=" flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]">
                <div className="flex items-center">
                  <div
                    key={index}
                    className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                    style={{ backgroundImage: `url(${Profile})` }}
                  ></div>
                  <div className="ml-[14px]">
                    <h1 className="font-poppins font-semibold text-lg text-black">
                      {userData.uid === block.blockId? block.blockerName : block.blockName}
                    </h1>
                    <p className="font-poppins font-medium text-[14px] text-homePrimary">
                      {" "}
                      {userData.uid === block.blockId? block.blockerEmail : block.blockEmail}
                    </p>
                  </div>
                </div>
                {
                  userData.uid === block.blockerId ? <button 
                  onClick={() => handleUnblock(block)}
                  className="font-poppins font-medium text-black hover:text-white hover:bg-green-700 border-2 border-green-700 duration-300 px-[8px] py-[4px] rounded-[5px] hover:scale-115">
                  Unblock
                </button> : <div> {block.blockerName} <span className="font-bold text-red-500">blocked</span> you </div>
                }
              </div>
            ))}
          
        </div>
      
    </>
  );
};
