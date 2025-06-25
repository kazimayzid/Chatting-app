import loginImg from "../../assets/loginImg.jpg"
export default function Login() {
  return <>
  <div className="flex">
    <div className="w-[60%] flex flex-col justify-center items-center">
        <h1 className="font-openSans font-bold text-[33.34px] text-loginPrimary">Login to your account!</h1>
    </div>
    <div className="w-[40%]">
        <img className="w-full h-screen object-cover" src={loginImg} alt="#img" />
    </div>
  </div>
  </>;
}
