import { useState } from "react";
import regImg from "../../assets/regImg.png";
export default function Registration() {
  const [email, setEmail] = useState("")
  const handleEmail = (e) => {
    setEmail(e.target.value);
    
  }
  const handleRegistration = () =>{
    console.log(email);
    
  }
  return (
    <>
      <div className="flex">
        <div className="w-[60%] pl-[350px] pt-[150px]">
          <div>
            <h1 className="font-nunito font-bold text-[34.4px] text-registrationPrimary">
              Get started with easily register
            </h1>
            <p className="font-nunito font-normal text-[20.64px] text-[rgba(0,0,0,0.5)] mt-[13px]">
              Free register and you can enjoy it
            </p>
          </div>
          <div className="mt-[40px]">
            <div className="relative">
              <input
                onChange={handleEmail}
                type="email"
                id="floating_outlinded"
                className="block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_outlinded"
                className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 left-6 z-10 origin-[0] bg-white px-[15px] peer-focus:px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
              >
                Email Address
              </label>
            </div>
            <div class="relative my-[34px]">
              <input
                type="text"
                id="floating_outlined"
                className="block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                placeholder=" "
              />
              <label
                for="floating_outlined"
                className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 left-6 z-10 origin-[0] bg-white px-[15px] peer-focus:px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
              >
                Full Name
              </label>
            </div>
            <div class="relative ">
              <input
                type="password"
                id="floating_outlined"
                className="block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                placeholder=" "
              />
              <label
                for="floating_outlined"
                className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 left-6 z-10 origin-[0] bg-white px-[15px] peer-focus:px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
              >
                Password
              </label>
            </div>
          </div>
          <div>
            <div className="mt-[51px]">
              <div className="bg-black rounded-[86px] w-[352px]">
                <button 
                 onClick={handleRegistration}
                  style={{
                    background: "#5B36F5",
                    background:
                      "radial-gradient(circle,rgba(91, 54, 245, 0.25) 0%, rgba(30, 30, 30, 1) 31%)",
                  }}
                  className="font-nunito font-semibold text-[20.64px] text-white py-[19px] px-[140px] bg-[#1E1E1E] rounded-[86px] "
                >
                  Sign up
                </button>
              </div>
            </div>
            <p className="ml-[75px] mt-[35px] font-openSans font-normal text-[13.34px] text-[#03014C]">
              Already have an account ?{" "}
              <span className="font-openSans font-bold text-[13.34px] text-[#EA6C00]">
                Sign In
              </span>
            </p>
          </div>
        </div>
        <div className="w-[40%]">
          <img
            className="object-cover w-full h-screen "
            src={regImg}
            alt="#regimg"
          />
        </div>
      </div>
    </>
  );
}
