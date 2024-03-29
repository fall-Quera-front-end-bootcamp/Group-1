import React, { useState } from "react";
import icons from "../../utils/icons/icons";
import ProfilePicture from "../common/profilePicture/profilePicture";
import SharedSelector from "../common/sharedSelector/sharedSelector";
import ProjectSelector from "../common/projectSelector/projectSelector";

interface ShareWorkSpaceModalProps {
  sharedOpen?: boolean;
  handleClose(): void;
}
const ShareWorkSpaceModal: React.FC<ShareWorkSpaceModalProps> = ({
  sharedOpen,
  handleClose,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    console.log("ارسال ایمیل: ", email);
  };

  const copyToClipboard = () => {
    console.log("copied");
  };
  const handle = () => {
    console.log("option");
  };
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return sharedOpen ? (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-[2px] z-10"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-md w-[547px] flex flex-col justify-center">
        <div className="flex items-center gap-x-[105px]">
          <button onClick={handleClose}>{icons.close("black", "24px")}</button>
          <h2 className="text-2xl font-extrabold  text-center ">
            اشتراک‌گذاری ورک‌اسپیس‌
          </h2>
        </div>
        <div className="flex items-center justify-center mt-8 ">
          <input
            type="email"
            placeholder="دعوت با ایمیل"
            value={email}
            onChange={handleEmailChange}
            className=" rounded-r-lg px-3 py-2 w-4/5  bg-[#F0F1F3] text-sm"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#208D8E] text-white px-2 py-2 rounded-l-lg w-1/5 text-sm"
          >
            ارسال
          </button>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-x-1">
            {icons.link("#323232", "20")}
            <p className="text-sm font-normal">لینک خصوصی</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="border text-black px-3 rounded-md font-normal text-xs py-0.5"
          >
            کپی لینک
          </button>
        </div>
        <p className="text-gray-400 font-normal mt-6 mb-3">
          اشتراک گذاشته شده با
        </p>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <ProfilePicture
                firstName="mat"
                lastName="ch"
                imgWidth="34px"
                imgHeight="34px"
              />
              <p className="text-sm font-normal">من</p>
              <span className="bg-[#D0EBFF] text-[#228BE6] text-xs font-normal rounded-md py-1 px-2">
                Workspace Owner
              </span>
            </div>
            <span className="text-xs text-[#A6A7A7] border-[#A6A7A7] font-normal border rounded-md py-1.5 px-2">
              دسترسی کامل
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <ProfilePicture
                firstName="Sara"
                lastName="Rahimi"
                imgWidth="34px"
                imgHeight="34px"
              />
              <p className="text-sm font-normal">Sararahimi@gmail.com</p>
            </div>
            <div className="flex items-center gap-x-1">
              <SharedSelector onSelect={handle} />
              <ProjectSelector onSelect={handle} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <ProfilePicture
                firstName="Sara"
                lastName="Rahimi"
                imgWidth="34px"
                imgHeight="34px"
              />
              <p className="text-sm font-normal">Sararahimi@gmail.com</p>
            </div>
            <div className="flex items-center gap-x-1">
              <SharedSelector onSelect={handle} />
              <ProjectSelector onSelect={handle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ShareWorkSpaceModal;
