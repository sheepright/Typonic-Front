"use client";

import { useState } from "react";

interface CustomMenubarProps {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

export default function CustomMenubar({
  selectedMode,
  setSelectedMode,
}: CustomMenubarProps) {
  const menu = ["커스텀 연습", "Line", "키워드", "복.붙", "파일 첨부"];
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  return (
    <div className="w-[600px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-lg">
      <div className="flex items-center space-x-6">
        {menu.map((item) => {
          if (item === "Line") {
            return (
              <div
                key={Math.random()}
                className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
              />
            );
          }

          const alwaysSelected = item === "커스텀 연습";
          const isMode = ["키워드", "복.붙", "파일 첨부"].includes(item);
          const isActuallySelected = isMode && selectedMode === item;

          const isActive =
            alwaysSelected ||
            (isMode &&
              (hoveredMode === item || (!hoveredMode && isActuallySelected)));

          const handleClick = () => {
            if (isMode) {
              setSelectedMode(item);
            }
          };

          const hoverEvents = isMode
            ? {
                onMouseEnter: () => setHoveredMode(item),
                onMouseLeave: () => setHoveredMode(null),
              }
            : {};

          return (
            <button
              key={item}
              onClick={handleClick}
              {...hoverEvents}
              className={`text-base border-0 bg-transparent font-dung transition-opacity duration-200 text-[white] text-[15px] ${
                isActive ? "opacity-100" : "opacity-20"
              }`}
              style={isActive ? { WebkitTextStroke: "0.2px white" } : {}}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
