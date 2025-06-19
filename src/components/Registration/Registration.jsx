import regImg from "../../assets/regImg.png";
export default function Registration() {
  return (
    <>
      <div className="flex">
        <div className="w-[60%] pl-[350px] pt-[100px]">
          <div>
            <h1 className="font-nunito font-bold text-[34.4px] text-registrationPrimary">
              Get started with easily register
            </h1>
            <p className="font-nunito font-normal text-[20.64px] text-[rgba(0,0,0,0.5)] mt-[13px]">
              Free register and you can enjoy it
            </p>
          </div>
          <div>
            <div className="relative">
              <input
                type="text"
                id="floating_outlinded"
                className="block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_outlinded"
                className="absolute z-10 start-1 top-[50%] translate-[-50%] left-[130px] px-[12px]  font-nunito font-semibold text-[20.64px] duration-300 transform -translate-y-4 scale-75 origin-[0]  peer-focus:font-nunito peer-focus:text-registrationPrimary/70 peer-placeholder-shown:-translate-y-[200px]  peer-focus:top-[0px] peer-focus:scale-[13.76px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto bg-white peer-placeholder-shown:scale-100 peer-placeholder-shown:top-[50%]"
              >
                Email Address
              </label>
            </div>
            <div class="relative mt-5">
              <input
                type="text"
                id="floating_outlined"
                className="block px-[52px] py-[26px] font-nunito font-semibold text-[20.64px] border-[2px] border-[rgba(17,23,93,0.3)] focus:outline-none  rounded-[8.6px] appearance-none peer"
                placeholder=" "
              />
              <label
                for="floating_outlined"
                className="absolute text-[20.64px] text-registrationPrimary duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-[50px] peer-focus:px-2 peer-focus:text-registrationPrimary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Floating outlined
              </label>
            </div>
          </div>
          <div></div>
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
