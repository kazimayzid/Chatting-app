import loginImg from "../../assets/loginImg.jpg";
import googleimg from "../../assets/Google.png";
import { FaEyeSlash, FaLeaf } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
export default function Login() {
  const [show, setShow] = useState(false)
  return (
    <>
      <div className="flex">
        <div className="w-[60%] flex flex-col justify-center items-center">
          <div>
            <h1 className="font-openSans font-bold text-[33.34px] text-loginPrimary">
              Login to your account!
            </h1>
            <img className="mt-[30px]" src={googleimg} alt="#google" />
            <div>
              <div className="relative mt-[32px]">
                <input
                  type="email"
                  id="floating_outlinded"
                  className="block px-[52px] pt-[15px] text-loginPrimary font-openSans font-semibold text-[20.64px] border-b-[2px] border-b-[rgba(17,23,93,0.3)] focus:outline-none  appearance-none peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_outlinded"
                  className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-[60px]">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  className="block px-[52px] pt-[15px] text-loginPrimary font-openSans font-semibold text-[20.64px] border-b-[2px] border-b-[rgba(17,23,93,0.3)] focus:outline-none  appearance-none peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 z-10 origin-[0] bg-white px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
                >
                  Password
                </label>
                {show ? (
                <FaRegEye
                  onClick={() => setShow(!show)}
                  className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShow(!show)}
                  className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer"
                />
              )}
              </div>
            </div>
            <div>
            <div className="mt-[51px]">
              <div className="bg-[#1E1E1E] rounded-[86px] w-[352px]">
                <button
                  style={{
                    background: "#5B36F5",
                    background:
                      "radial-gradient(circle,rgba(91, 54, 245, 0.25) 0%, rgba(30, 30, 30, 1) 31%)",
                  }}
                  className="font-nunito w-full font-semibold text-[20.64px] text-white py-[19px] px-[92px] bg-[#1E1E1E] rounded-[86px] "
                >
                  Login to Continue
                </button>
              </div>
            </div>
            <p className=" mt-[35px] font-openSans font-normal text-[13.34px] text-[#03014C]">
              Don’t have an account ?{" "}
              <span className="font-openSans font-bold text-[13.34px] text-[#EA6C00]">
                Sign up
              </span>
            </p>
          </div>
          </div>
        </div>
        <div className="w-[40%]">
          <img
            className="w-full h-screen object-cover"
            src={loginImg}
            alt="#img"
          />
        </div>
      </div>
    </>
  );
}
