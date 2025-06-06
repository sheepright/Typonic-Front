"use client";

import { useState } from "react";

interface RankingMenubarProps {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

export default function RankingMenubar({
  selectedMode,
  setSelectedMode,
}: RankingMenubarProps) {
  const menu = ["전체 랭킹", "Line", "문장 랭킹", "단어 랭킹"];
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

          const alwaysSelected = item === "전체 랭킹";
          const isMode = ["문장 랭킹", "단어 랭킹"].includes(item);
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
