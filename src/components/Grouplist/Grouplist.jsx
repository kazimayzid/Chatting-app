import React, { useEffect, useState } from "react";
import Profile from "../../assets/Mayzidpic.JPG";
import Profile1 from "../../assets/Profile1.png";
import Profile2 from "../../assets/profile2.png";
import { CiSearch } from "react-icons/ci";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi2";
import { ImCancelCircle } from "react-icons/im";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

export const Grouplist = () => {
  const db = getDatabase();
  const [show, setShow] = useState(false);
  const [create, setCreate] = useState(false);
  const [grupName, setGrupName] = useState("");
  const [grupNameErr, setGrupNameErr] = useState("");
  const [groupName, setGroupName] = useState("");
  const [friendsData, setFriendsData] = useState([]);
  const userData = useSelector((state) => state.user.value);
  const optionHandle = () => {
    setShow(true);
  };
  const optionCancelHandle = () => {
    setShow(false);
    setCreate(false);
  };

  const inputHandle = (e) => {
    setGrupName(e.target.value);
    setGrupNameErr("");
  };
  const createHandle = () => {
    if (!grupName) {
      setGrupNameErr("Plz give a Group name");
    } else {
      set(push(ref(db, "groups/")), {
        groupName: grupName,
        adminId: userData.uid,
        adminName: userData.displayName,
        createdAt: Date.now(),
      });
      setGroupName(grupName);
    }
    setGrupName("");
    setCreate(true);
    setShow(false);
  };

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

  const addHandle = (friend) => {
    const memberRef = ref(db, `groups/${groupName}/members/${friend.key}`);
    set(memberRef, {
      userId:
        userData.uid === friend.senderId ? friend.receiverId : friend.senderId,
      userName:
        userData.uid === friend.senderId
          ? friend.receiverName
          : friend.senderName,
      addedAt: Date.now(),
    })
  };

  // logic for design section====================
  // maping for Group list

  const groupList = [
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile1,
      name: "Johan",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile2,
      name: "Adam ambros",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile1,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
    {
      img: Profile,
      name: "kazi mayzid",
      message: "how are you",
      button: "Join",
    },
  ];
  // Logic for design End==============================
  return (
    <>
      <div className="relative h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden">
        <div className="h-[20%]">
          <div className="flex justify-between items-center px-4">
            <p className="font-poppins font-semibold text-[20px] text-black">
              Groups List
            </p>
            <button
              onClick={optionHandle}
              className="border-[1px] py-1 px-2 rounded-xl border-green-500 hover:scale-103 font-poppins font-medium hover:bg-green-500 hover:text-white text-black  duration-500 flex items-center gap-x-0.5"
            >
              Create Group <HiUserGroup />
            </button>
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
          {groupList.map((group, index) => (
            <div className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]">
              <div className="flex items-center">
                <div
                  key={index}
                  className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                  style={{ backgroundImage: `url(${group.img})` }}
                ></div>
                <div className="ml-[14px]">
                  <h1 className="font-poppins font-semibold text-lg text-black">
                    {group.name}
                  </h1>
                  <p className="font-poppins font-medium text-[14px] text-homePrimary">
                    {" "}
                    {group.message}
                  </p>
                </div>
              </div>
              <button className="font-poppins font-semibold text-[20px] text-black px-[22px] hover:text-white hover:bg-black rounded-[5px] duration-300 mr-1">
                {group.button}
              </button>
            </div>
          ))}
        </div>
        {show && (
          <div className="absolute top-0 right-0 z-50 w-[100%] h-[100vh] backdrop-blur-[4px] p-5">
            <div>
              <ImCancelCircle
                onClick={optionCancelHandle}
                className="text-[25px] hover:scale-120 duration-500 text-red-500 "
              />
            </div>
            <div className="text-center mt-[50px]">
              <p className="font-poppins font-bold text-3xl mb-[20px]">
                Group Name
              </p>
              <input
                value={grupName}
                onChange={inputHandle}
                className="border-black focus:outline-none border-[2px] px-1 py-2 font-poppins text-2xl w-[300px] rounded-lg"
                type="text"
              />
              <p className="font-poppins font-medium text-red-500">
                {grupNameErr}
              </p>
              <button
                onClick={createHandle}
                className="font-poppins font-semibold text-[20.64px] text-black border-2 border-black  hover:bg-black hover:text-white duration-300 hover:scale-105 py-2 px-10 bg-[#ffffff] rounded-[86px] hover:border-2 cursor-pointer mt-5"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {create && (
          <div className="absolute top-0 right-0 z-50 w-[100%] h-[100vh] backdrop-blur-[4px] p-5">
            <div className="text-center">
              <ImCancelCircle
                onClick={optionCancelHandle}
                className="text-[25px] hover:scale-120 duration-500 text-red-500 "
              />
              <p className="font-poppins font-bold text-2xl text-homePrimary">
                {groupName}
              </p>
            </div>
            <div className="border-b-[1px] border-[#00000050] mb-3">
              <p className="font-poppins font-normal text-[20px] text-homePrimary">
                Add member
              </p>
            </div>
            <div className="overflow-y-auto h-[300px]">
              {friendsData.map((friend, index) => (
                <div className=" flex items-center justify-between border-[1px] border-[#00000049] p-2 rounded-xl mb-2">
                  <div className="flex items-center">
                    <div
                      key={index}
                      className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                      style={{ backgroundImage: `url(${Profile})` }}
                    ></div>
                    <div className="ml-[14px]">
                      <h1 className="font-poppins font-semibold text-lg text-black">
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
                  <div>
                    <button
                      onClick={() => addHandle(friend)}
                      className="font-poppins border-black border-[1px] px-3 py-1 rounded-[6px] hover:bg-black hover:text-white duration-300 hover:scale-115"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
