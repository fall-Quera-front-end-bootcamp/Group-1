import React, { useState } from "react";
import icons from "../../../utils/icons/icons";
import { boardPost } from "../../../services/boardServices";
interface BoardModalProps {
  wid: string;
  pid: string;
  handleClose: () => void;
  modal?: boolean;
  handleChange: () => void;
}
const BoardModal: React.FC<BoardModalProps> = ({
  wid,
  pid,
  handleClose,
  handleChange,
}) => {
  const [name, setName] = useState("");
  const colors = [
    "#4C6EF5",
    "#228BE6",
    "#15AABF",
    "#12B886",
    "#208D8E",
    "#40C057",
    "#82C91E",
    "#FAB005",
    "#FD7E14",
    "#FA5252",
    "#E64980",
    "#BE4BDB",
    "#7950F2",
  ];

  const [selectedColor, setSelectedColor] = useState("");
  const [color, setColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setColor(color);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async () => {
    const userData = {
      name: name,
      color: color,
      order: "1",
      is_archive: true,
    };
    try {
      const result = await boardPost(userData, wid, pid);
      console.log(result);
      handleChange();
    } catch (e) {
      console.log("Error Occured!");
      console.log(e);
    }

    handleClose();
    console.log(userData);
  };
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-[2px] z-10"
      onClick={handleOverlayClick}
    >
      <div className="bg-white py-5 px-10 rounded-xl w-[501px]  flex flex-col justify-between items-stretch">
        <div className="flex items-center gap-x-[110px] mb-5">
          <button onClick={handleClose}>{icons.close("black", "20px")}</button>
          <div className="text-2xl font-bold">ساختن بُرد جدید</div>
        </div>
        <div>
          <h5 className="mb-1">نام برد</h5>
          <input
            type="text"
            onChange={handleInput}
            className="border border-gray-400 rounded-md px-3 py-2 mb-4 w-full"
          />
        </div>
        <div>
          <p className="text-sm font-normal mb-3">رنگ برد</p>
          <div className="flex flex-wrap items-center justify-center mb-8">
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`w-5 h-5 rounded-lg cursor-pointer ml-2 mt-2  ${
                  selectedColor === color ? `` : `border-white border-2`
                }`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
        <button className="button-nws py-[6px] w-full" onClick={handleSubmit}>
          ساختن برد
        </button>
      </div>
    </div>
  );
};
export default BoardModal;
