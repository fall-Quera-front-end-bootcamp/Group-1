import React, { useState } from "react";
import icons from "../../utils/icons/icons";
interface PriorityCardProps {
  handleClose2: () => void;
  onStateChange: (
    selectedColor: string,
    selectedBorderColor: string,
    priority: string
  ) => void;
}
const PriorityCard: React.FC<PriorityCardProps> = ({
  handleClose2,
  onStateChange,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("#C1C1C1");
  const [selectedBorderColor, setSelectedBorderColor] =
    useState<string>("#C1C1C1");

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      handleClose2();
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-60 backdrop-blur-[2px] z-10"
      onClick={handleOverlayClick}
    >
      <div onClick={handleOverlayClick}>
        <div className="w-[166px] h-[188px] rounded-md bg-white shadow-md space-x-1 pr-2 pt-2 flex flex-col justify-between mb-4 items-start">
          <button
            className="flex items-center justify-end gap-1"
            onClick={() => {
              onStateChange("red", "border-red-500", "10");
              setSelectedColor("red");
              setSelectedBorderColor("border-red-500");
            }}
          >
            {icons.flag("red", "16px")}
            <p>فوری</p>
          </button>
          <button
            className="flex items-center justify-end gap-1"
            onClick={() => {
              onStateChange("#FAB005", "border-orange-300", "20");

              setSelectedColor("#FAB005");
              setSelectedBorderColor("border-orange-300");
            }}
          >
            {icons.flag("#FAB005", "16px")}
            <p>بالا</p>
          </button>
          <button
            className="flex items-center justify-end gap-1"
            onClick={() => {
              onStateChange("#15AABF", "border-sky-400", "30");

              setSelectedColor("#15AABF");
              setSelectedBorderColor("border-sky-400");
            }}
          >
            {icons.flag("#15AABF", "16px")}
            <p>متوسط</p>
          </button>
          <button
            className="flex items-center justify-end gap-1"
            onClick={() => {
              onStateChange("#82C91E", "border-lime-400", "50");

              setSelectedColor("#82C91E");
              setSelectedBorderColor("border-lime-400");
            }}
          >
            {icons.flag("#82C91E", "16px")}
            <p>پایین</p>
          </button>
          <button
            className="flex items-center justify-end gap-1 mb-4"
            onClick={() => {
              onStateChange("#C1C1C1", "border-[#C1C1C1]", "1");

              setSelectedColor("#C1C1C1");
              setSelectedBorderColor("border-[#C1C1C1]");
            }}
          >
            {icons.close("#E45454", "16px")}
            <p className="text-gray-500">حذف اولویت</p>
          </button>
        </div>
        <div className="flex justify-start gap-x-2">
          <div
            className={`mx-1 border-2 border-dashed ${selectedBorderColor} p-1 rounded-full`}
          >
            {icons.flag(selectedColor, "30px")}
          </div>
          <div
            className={`mx-1 border-2 border-dashed ${selectedBorderColor} p-1 rounded-full`}
          >
            {icons.flag(selectedColor, "30px")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityCard;
