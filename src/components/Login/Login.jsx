import loginImg from "../../assets/loginImg.jpg";
import googleimg from "../../assets/Google.png";
import { FaEyeSlash, FaLeaf } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ScaleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { userLogInfo } from "../../features/slice/userSlice";

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loder, setLoder] = useState(false);

  const auth = getAuth();

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  function CustomToast({ isPaused, closeToast }) {
    return (
      <div className="text-white font-nunito">
        <p>✅your Log in successful! Let's Go to Home Page</p>
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

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
    setLoder(false);
  };

  const emailHandle = (e) => {
    setLoder(false);
    setEmail(e.target.value);
    setEmailErr("");
  };

  const loginHandler = () => {
    setPasswordErr("");
    setLoder(true);
    if (!email) {
      setTimeout(() => {
        setEmailErr("Plz enter Email");
        setLoder(false);
      }, 1000);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setTimeout(() => {
        setEmailErr("Email format is not right");
        setLoder(false);
      }, 1000);
    }
    if (!password) {
      setTimeout(() => {
        setPasswordErr("Plz enter password");
        setLoder(false);
      }, 1000);
    } else {
      setTimeout(() => {
        if (!strongPasswordRegex.test(password)) {
          setPasswordErr(
            `Password must be 8+ characters with or uppercase,
             lowercase, number, and special character.`
          );
        } else {
          if (email && password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setLoder(true);
            // console.log("ok");
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                console.log(userCredential);
                const user = userCredential.user;
                dispatch(userLogInfo(user))
                localStorage.setItem("userInfo", JSON.stringify(user));
                setLoder(false);
                if (user.emailVerified) {
                  toast((props) => <CustomToast {...props} />, {
                    autoClose: false,
                    closeButton: false,
                    hideProgressBar: true,
                    draggable: false,
                    pauseOnHover: true,
                  });

                  setTimeout(() => {
                    navigate("/", {replace: true});
                  }, 2000);
                  setEmail("");
                  setPassword("");
                  // setLoder(false);
                } else {
                  toast.error(
                    "Your email is not verified. Please verify and try again."
                  );
                  setEmailErr("");
                }
              })
              .catch((error) => {
                const errorCode = error.message;
                console.log(errorCode);

                if (errorCode.includes("auth/invalid-credential")) {
                  toast.error("Plz enter right email & password");
                  setLoder(false);
                }
              });
          }
        }
        setLoder(false);
      }, 1000);
      setEmailErr(false);
    }
  };
  return (
    <>
      <div className="flex">
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
          theme="dark"
          transition={Bounce}
        />
        <div className="w-[60%] flex flex-col justify-center items-center">
          <div>
            <h1 className="font-openSans font-bold text-[33.34px] text-loginPrimary">
              Login to your account!
            </h1>
            <img className="mt-[30px]" src={googleimg} alt="#google" />
            <div>
              <div className="relative mt-[32px]">
                <input
                  onChange={emailHandle}
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
              <p className="text-red-500 font-poppins">{emailErr}</p>
              <div className="relative mt-[60px]">
                <input
                  onChange={passwordHandler}
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
              <p className="text-red-500 font-poppins text-[10px]">
                {passwordErr && (
                  <>
                    <p className="text-red-500 font-poppins text-[10px]">
                      {passwordErr.split(" or ")[0]}{" "}
                    </p>
                    <p className="text-red-500 font-poppins text-[10px]">
                      {passwordErr.split(" or ")[1]}
                    </p>
                  </>
                )}
              </p>
            </div>
            <div>
              <div className="mt-[51px]">
                <div className="bg-[#1E1E1E] rounded-[86px] w-[352px]">
                  <button
                    onClick={loginHandler}
                    style={{
                      background: "#5B36F5",
                      background:
                        "radial-gradient(circle,rgba(91, 54, 245, 0.25) 0%, rgba(30, 30, 30, 1) 31%)",
                    }}
                    className="font-nunito w-full font-semibold text-[20.64px] text-white py-[19px] px-[92px] bg-[#1E1E1E] rounded-[86px] "
                  >
                    {loder ? (
                      <ScaleLoader color="#ffffff" height={18} />
                    ) : (
                      "Login to Continue"
                    )}
                  </button>
                </div>
              </div>
              <p className=" mt-[35px] font-openSans font-normal text-[13.34px] text-[#03014C]">
                Don’t have an account ?{" "}
                <Link
                  to="/registration"
                  className="font-openSans font-bold text-[13.34px] text-[#EA6C00]"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div className="mt-5">
              <Link to="/forgetPassword"
               className="font-poppins text-loginPrimary hover:text-red-400 duration-500">
                  Forgotten Password ?
            </Link>
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
