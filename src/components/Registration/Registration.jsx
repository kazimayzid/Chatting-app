import { useState } from "react";
import regImg from "../../assets/regImg.png";
import { FaEyeSlash, FaLeaf } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { getDatabase, ref, set } from "firebase/database";

export default function Registration() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  // const [emailExist, setEmailExist] = useState("");

  const [emailerr, setEmailerr] = useState("");
  const [fullNameErr, setFullNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loder, setLoder] = useState(false);
  const db = getDatabase();

  function CustomToast({ isPaused, closeToast }) {
    return (
      <div className="text-white font-nunito">
        <p>✅ Registration successful! Redirecting...</p>
        <div className="mt-2 h-[6px] w-full bg-gray-700 rounded-full overflow-hidden relative">
          <div
            className={`absolute top-0 left-0 h-full bg-green-500 animate-toastProgress ${
              isPaused ? "paused" : ""
            }`}
            onAnimationEnd={closeToast}
          ></div>
        </div>
      </div>
    );
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };

  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameErr("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };
  const handleRegistration = () => {
    console.log(email);
    if (!email) {
      setEmailerr("plz enter your email");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr("invalid email");
      }
    }
    if (!fullName) {
      setFullNameErr("plz enter your fullName");
    }
    if (!password) {
      setPasswordErr("plz enter your password");
    } else {
      if (!/(?=.{8,})/.test(password)) {
        setPasswordErr("Password must be eight characters or longer");
      } else if (!/(?=.*[a-z])/.test(password)) {
        setPasswordErr("give at least one small letter (a-z)");
      } else if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordErr("give at least one capital letter (A-Z)");
      } else if (!/(?=.*[0-9])/.test(password)) {
        setPasswordErr("give at least one numeric character (0-9)");
      } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordErr("give at least one  special character (!@#$%^&*)");
      } else {
        if (
          email &&
          fullName &&
          password &&
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
          setLoder(true);
          createUserWithEmailAndPassword(auth, email, password)
            .then((createdUser) => {
              updateProfile(auth.currentUser, {
                displayName: fullName,
              }).then(() => {
                sendEmailVerification(auth.currentUser);
                const currentUser = auth.currentUser;
                console.log(currentUser, "see");
                

                set(ref(db, "users/" + currentUser.uid), {
                  username: currentUser.displayName,
                  email: createdUser.user.email,
                  time: new Date().toLocaleString(),
                });

                setLoder(false);
                toast((props) => <CustomToast {...props} />, {
                  autoClose: false,
                  closeButton: false,
                  hideProgressBar: true,
                  draggable: false,
                  pauseOnHover: true,
                });

                setTimeout(() => {
                  navigate("/Login");
                }, 2000);

                setEmail("");
                setFullName("");
                setPassword("");
              });
            })
            .catch((error) => {
              console.log(error);
              if (error.message.includes("auth/email-already-in-use")) {
                setEmailerr("this email already exists");
                setLoder(false);
              }
            });
        }
      }
    }
  };
  return (
    <>
      <div className="flex">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
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
            <div className="relative w-[352px]">
              <input
                onChange={handleEmail}
                value={email}
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
            <p className="text-red-500 font-poppins">{emailerr}</p>
            <div class="my-[34px]">
              <div className="relative w-[352px]">
                <input
                  onChange={handleFullName}
                  value={fullName}
                  type="text"
                  id="fullName"
                  className="block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                  placeholder=" "
                />
                <label
                  for="fullName"
                  className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 left-6 z-10 origin-[0] bg-white px-[15px] peer-focus:px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
                >
                  Full Name
                </label>
              </div>
              <p className="text-red-500 font-poppins">{fullNameErr}</p>
            </div>

            <div class="relative w-[352px]">
              <input
                onChange={handlePassword}
                value={password}
                type={show ? "text" : "password"}
                id="password"
                className="block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                placeholder=" "
              />
              <label
                for="password"
                className="absolute text-[20.64px] text-registrationPrimary/70 duration-300 transform -translate-y-4 scale-75 top-0 left-6 z-10 origin-[0] bg-white px-[15px] peer-focus:px-[15px] peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
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
            <p className="text-red-500 font-poppins text-[10px]">
              {passwordErr}
            </p>
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
                  className="font-nunito font-semibold text-[20.64px] text-white py-[19px] px-[140px] bg-[#1E1E1E] rounded-[86px] cursor-pointer"
                >
                  {loder ? (
                    <ScaleLoader color="#ffffff" height={20} />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
            </div>
            <p className="ml-[75px] mt-[35px] font-openSans font-normal text-[13.34px] text-[#03014C]">
              Already have an account ?{" "}
              <Link
                to="/login"
                className="font-openSans font-bold text-[13.34px] text-[#EA6C00]"
              >
                Sign In
              </Link>
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
