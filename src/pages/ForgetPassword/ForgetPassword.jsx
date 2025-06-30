import React, { useState } from "react";
import { Link } from "react-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ForgetPassword = () => {
  const [emailerr, setEmailErr] = useState("");
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  const auth = getAuth();

  const resetHandle = () => {
    if (!email) {
      setEmailErr("plz enter your email");
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailErr("invalid email");
      }
    }
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage.includes("auth/invalid-email")) {
            setEmailErr("Invalid Email")
          }
          
          // ..
        });
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-[#e9e7e7] rounded-2xl">
          <div className="font-poppins text-loginPrimary font-semibold text-[28px] py-[20px] pl-[20px]">
            Find Your Account
          </div>
          <span className="w-[100%] h-[1px] bg-white block"></span>
          <div>
            <div className="font-poppins text-loginPrimary py-[20px] pl-[20px] pr-4">
              Please enter your email address to search for your account.
            </div>
            <div className="relative pl-[20px] pr-4">
              <input
                onChange={handleEmail}
                value={email}
                type="email"
                id="floating_outlinded"
                className="w-full  block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_outlinded"
                className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 left-10 z-10 origin-[0] bg-[#e9e7e7] px-[15px] peer-focus:px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
              >
                Email Address
              </label>
            </div>
            <p className="text-red-500 font-poppins mb-[25px] ml-[20px]">
              {emailerr}
            </p>
            <span className="w-[100%] h-[1px] bg-white block"></span>
          </div>
          <div className="py-5 flex justify-end pr-[20px]">
            <Link
              to="/"
              className="font-nunito font-semibold text-[16.64px] text-white py-[5px] px-[10px] bg-[#1E1E1E] rounded-[10px] cursor-pointer inline-block hover:bg-green-500 duration-500"
            >
              Sign UP
            </Link>
            <Link
              to="/login"
              className="font-nunito font-semibold text-[16.64px] text-white py-[5px] px-[10px] bg-[#1E1E1E] rounded-[10px] cursor-pointer inline-block hover:bg-green-500 duration-500 mx-3"
            >
              Log in
            </Link>
            <Link
              onClick={resetHandle}
              className="font-nunito font-semibold text-[16.64px] text-white py-[5px] px-[10px] bg-[#1E1E1E] rounded-[10px] cursor-pointer inline-block hover:bg-green-500 duration-500"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
