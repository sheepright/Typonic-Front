"use client";

import { useState } from "react";

export default function Result() {
  const [selectedResult, setSelectedResult] = useState("등급 산정");

  const menu = [
    "결과",
    "Line",
    "등급 산정",
    "상세 정보",
    "그래프",
    "랭킹 등록",
  ];

  return (
    <div className="w-[600px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px]">
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

          const alwaysSelected = item === "결과";
          const isResult = [
            "등급 산정",
            "상세 정보",
            "그래프",
            "랭킹 등록",
          ].includes(item);
          const isSelected =
            alwaysSelected || (isResult && selectedResult === item);

          const handleClick = () => {
            if (isResult) {
              setSelectedResult(item);
            }
          };

          return (
            <button
              key={item}
              onClick={handleClick}
              className={`text-base border-0 bg-transparent font-dung transition-opacity duration-200 text-[white] text-[15px] ${
                isSelected ? "opacity-100" : "opacity-20"
              }`}
              style={isSelected ? { WebkitTextStroke: "0.2px white" } : {}}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
