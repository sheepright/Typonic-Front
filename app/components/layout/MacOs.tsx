"use client";

import { IoCheckbox } from "react-icons/io5";
import { RiCheckboxBlankFill } from "react-icons/ri";

interface MacOsProps {
  styleType?: "type1" | "type2";
  codeType?: boolean;
  tabActive?: boolean;
  onToggle?: () => void;
}

export default function MacOs({
  styleType = "type1",
  codeType = false,
  tabActive,
  onToggle,
}: MacOsProps) {
  const containerWidth = styleType === "type1" ? "w-[900px]" : "w-[850px]";

  return (
    <div
      className={`${containerWidth} h-[35px] bg-cdark rounded-tr-[5px] rounded-tl-[5px] shadow-lg flex justify-between items-center`}
    >
      <div className="flex gap-2 p-3">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span className="w-3 h-3 bg-green-500 rounded-full" />
      </div>

      {codeType && (
        <div
          className={`gap-2 p-3 rounded-xl flex items-center font-dung text-[15px] cursor-pointer select-none transition-opacity duration-200 ${
            tabActive ? "opacity-80" : "opacity-20"
          }`}
          onClick={onToggle}
        >
          Auto Tab
          {tabActive ? <IoCheckbox /> : <RiCheckboxBlankFill />}
        </div>
      )}
    </div>
  );
}
