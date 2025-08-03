import { useSelector } from "react-redux";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdEditDocument, MdOutlineDeleteForever } from "react-icons/md";
import { RiImageEditLine } from "react-icons/ri";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export default function Settings() {
  const userData = useSelector((state) => state.user.value);

  return (
    <>
      <div className="flex gap-x-15 w-[100%] h-[98vh]">


        <div className="w-[50%] px-5 py-2 rounded-lg h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <div>
            <p className="font-poppins font-semibold text-[20px]">
              Profile Settings
            </p>
          </div>
          <div className="mt-10 pb-4 border-b-[1px] border-[#0000002a] flex flex-col justify-center items-center text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="bg-blue-100 text-[80px] flex items-center justify-center font-bold text-[#000000b6] w-[200px] h-[200px] bg-center bg-cover rounded-full mb-8">
                {userData?.displayName?.charAt(0).toUpperCase() || "?"}
              </div>
              <div>
                <h1 className="font-poppins font-semibold text-lg text-black">
                  {userData.displayName}
                </h1>
                <p className="font-poppins font-medium text-[14px] text-homePrimary">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 mt-12 ml-70">
            <div className="font-poppins font-normal text-[20px] flex items-center">
              <BiSolidEditAlt className="mr-4" />
              Edit Profile Name.
            </div>
            <div className="font-poppins font-normal text-[20px] flex items-center">
              <MdEditDocument className="mr-4" />
              Edit Profile Status Info.
            </div>
            <div className="font-poppins font-normal text-[20px] flex items-center">
              <RiImageEditLine className="mr-4" />
              Edit Profile Photo.
            </div>
            <div className="font-poppins font-normal text-[20px] flex items-center">
              <IoMdHelpCircleOutline className="mr-4" />
              Help.
            </div>
          </div>
        </div>





        <div className="w-[50%] px-5 py-2 rounded-lg h-[100%] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
          <div>
            <p className="font-poppins font-semibold text-[20px]">
              Account Settings
            </p>
          </div>
          <div className="ml-15 mt-5 flex flex-col gap-y-5">
            <div className="font-poppins font-normal text-[20px] flex items-center">
              <FaKey className="mr-4" />
              Change Password
            </div>
            <div className="font-poppins font-normal text-[20px] flex items-center">
              <AiFillDelete className="mr-4" />
              Delete Account.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
