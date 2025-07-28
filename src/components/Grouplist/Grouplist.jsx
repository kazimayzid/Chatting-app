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
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Grouplist = () => {
  const db = getDatabase();
  const [show, setShow] = useState(false);
  const [create, setCreate] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [grupName, setGrupName] = useState("");
  const [grupNameErr, setGrupNameErr] = useState("");
  const [groupName, setGroupName] = useState("");
  const [friendsData, setFriendsData] = useState([]);
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
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

  const addHandle = (member) => {
    const mbrName =
      userData.uid === member.senderId
        ? member.receiverName
        : member.senderName;
    const mbrEmail =
      userData.uid === member.senderId
        ? member.receiverEmail
        : member.senderEmail;

    const mbrId =
      userData.uid === member.senderId ? member.receiverId : member.senderId;
    if (!members.find((m) => m.memberId === member.mbrId)) {
      setMembers([
        ...members,
        { memberName: mbrName, memberEmail: mbrEmail, memberId: mbrId },
      ]);
      setCancel(true);
    }
  };

  // const cancelHandle = (member) => {
  //   const mbrName =
  //     userData.uid === member.senderId
  //       ? member.receiverName
  //       : member.senderName;
  //   const mbrEmail =
  //     userData.uid === member.senderId
  //       ? member.receiverEmail
  //       : member.senderEmail;

  //   const mbrId =
  //     userData.uid === member.senderId ? member.receiverId : member.senderId;

  //     setMembers(members.filter((m)=> m.){ memberName: mbrName, memberEmail: mbrEmail, memberId: mbrId },
  //     );

  // };

  const cancelHandle = (member) => {
    const mbrId =
      userData.uid === member.senderId ? member.receiverId : member.senderId;
    setMembers(members.filter((m) => m.memberId !== mbrId));
  };

  const createGroupHandle = () => {
    if (members.length < 2) {
      toast.error("Add at least 2 members to create a group");
      return;
    }
    toast.success("Group Created!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setTimeout(() => {
      setCreate(false);
    }, 1000);
    set(push(ref(db, "groups/")), {
      groupName,
      adminId: userData.uid,
      adminName: userData.displayName,
      createdAt: Date.now(),
      members: members.reduce(
        (acc, member) => {
          acc[member.memberId] = {
            name: member.memberName,
            email: member.memberEmail,
            id: member.memberId,
          };
          return acc;
        },
        {
          [userData.uid]: {
            name: userData.displayName,
            email: userData.email,
            id: userData.uid,
          },
        }
      ),
    });

    setMembers([]);
  };

  useEffect(() => {
    const groupListRef = ref(db, "groups/");
    onValue(groupListRef, (snapshot) => {
      let grouplistArr = [];
      snapshot.forEach((items) => {
        const val = items.val();
        console.log(val, "helo");

        if (!val.members[userData.uid]) {
          grouplistArr.push({ ...val, key: items.key });
        }
      });
      setGroups(grouplistArr);
    });
  }, []);

  const joinGroupHandle = (groupKey) => {
    const groupRef = ref(db, `groups/${groupKey}/members/${userData.uid}`);
    set(groupRef, {
      name: userData.displayName,
      email: userData.email,
      id: userData.uid,
    }).then(() => {
      toast.success("Joined the group!");
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
          {groups.map((group, index) => (
            <div className="flex items-center justify-between pb-[13px] mb-[13px] border-b-[1px] border-[rgba(0,0,0,0.25)]">
              <div className="flex items-center">
                <div
                  key={index}
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
              <button
                onClick={() => joinGroupHandle(group.key)}
                className="font-poppins font-semibold text-[20px] text-black px-[22px] hover:text-white hover:bg-green-500 border-green-500 hover:scale-105 border-[1px] rounded-[5px] duration-300 mr-1"
              >
                Join
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
                Set Group Name
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
                Enter
              </button>
            </div>
          </div>
        )}

        {create && (
          <div className="absolute top-0 right-0 z-50 w-[100%] h-[100vh] bg-white p-5">
            <div className="text-center">
              <div className="flex justify-between items-center">
                <ImCancelCircle
                  onClick={optionCancelHandle}
                  className="text-[25px] hover:scale-120 duration-500 text-red-500 "
                />
                <button
                  onClick={createGroupHandle}
                  className="font-poppins font-normal text-[18px] text-homePrimary border-[1px] rounded-[6px] px-1 border-green-500 hover:scale-105 hover:bg-green-500 hover:text-white duration-300"
                >
                  Create Group
                </button>
              </div>
            </div>
            <div className="border-b-[1px] border-[#00000050] mb-3">
              <p className="font-poppins font-normal text-[20px] text-homePrimary py-3">
                Add members in <span className="font-bold">{groupName}</span>{" "}
                group
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
                    {members.find(
                      (m) =>
                        m.memberId ===
                        (userData.uid === friend.senderId
                          ? friend.receiverId
                          : friend.senderId)
                    ) ? (
                      <button
                        onClick={() => cancelHandle(friend)}
                        className="font-poppins border-red-600 border-[1px] px-3 py-1 rounded-[6px] hover:bg-red-600 hover:text-white duration-300 hover:scale-115"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => addHandle(friend)}
                        className="font-poppins border-black border-[1px] px-3 py-1 rounded-[6px] hover:bg-black hover:text-white duration-300 hover:scale-115"
                      >
                        Add
                      </button>
                    )}
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
