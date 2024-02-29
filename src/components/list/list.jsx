import React from "react";
import icons from "../../../src/utils/icons/icons";
import ProfilePicture from "../common/profilePicture/profilePicture";

const ListComponent = () => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("Fa-Ir", { day: "numeric", month: "long" });

  return (
    <div dir="rtl" className="flex flex-col w-[986px]">
      <div className="flex items-center">
        {icons.chevron_down_circle("#323232","20px")}
        <button className="bg-pink-500 text-white border rounded-md py-1 px-3">pending</button>
      </div>
      <div className="flex items-center justify-between rounded-md bg-slate-100  h-[47px] mt-5 ">
        <div className="flex items-center w-[493px]">
          <span className="w-4 h-4 rounded bg-pink-500"></span>
          <p className="text-base leading-6 text-right">این یک تیتر برای این تسک است.</p>
        </div>
        <div className="flex items-center justify-between w-[493px]">
          <ProfilePicture className="w-[40px] h-[40px]">
          </ProfilePicture>
          {/* <ProfilePicture className="w-[40px] h-[40px]">
          </ProfilePicture> */}
          <p>{formattedDate}</p>
          <span>{icons.flag("red", "20px")}</span>
          <span className="ml-5">{icons.paragraph("#BDC0C6", "20px")}</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-md bg-slate-100  h-[47px] mt-10 ">
        <div className="flex items-center w-[493px]">
          <span className="w-4 h-4 rounded bg-pink-500"></span>
          <p className="text-base leading-6 text-right">این یک تیتر برای این تسک است.</p>
        </div>
        <div className="flex items-center justify-between w-[493px]">
          <ProfilePicture className="w-[40px] h-[40px]">
          </ProfilePicture>
          {/* <ProfilePicture className="w-[40px] h-[40px]">
          </ProfilePicture> */}
          <p>{formattedDate}</p>
          <span>{icons.flag("red", "20px")}</span>
          <span className="ml-5">{icons.paragraph("#BDC0C6", "20px")}</span>
        </div>
      </div>
      <div className="flex items-center mt-20">
          {icons.chevron_down_circle("#323232","20px")}
          <button className="bg-pink-500 text-white border rounded-md py-1 px-3">pending</button>
      </div>

    </div>
  );
};

export default ListComponent;


