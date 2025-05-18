"use client";

import { useState } from "react";

export default function CodeMenubar() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [selectedLength, setSelectedLength] = useState("Short");

  const menu = [
    "코드 연습",
    "Line",
    "C++",
    "C#",
    "Java",
    "Python",
    "Html",
    "JavaScript",
    "TypeScript",
    "Line",
    "Short",
    "Middle",
    "Long",
  ];

  return (
    <div className="w-[900px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-lg">
      <div className="flex items-center space-x-6">
        {menu.map((item) => {
          if (item === "Line") {
            return (
              <div
                key={Math.random()} // Line은 중복되므로 key 보완
                className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
              />
            );
          }

          // 항상 선택된 상태로 보일 메뉴
          const alwaysSelected = item === "코드 연습";

          // 언어 선택 영역
          const isLanguage = [
            "C++",
            "C#",
            "Java",
            "Python",
            "Html",
            "JavaScript",
            "TypeScript",
          ].includes(item);

          // 길이 선택 영역
          const isLength = ["Short", "Middle", "Long"].includes(item);

          // 선택 여부 판별
          const isSelected =
            alwaysSelected ||
            (isLanguage && selectedLanguage === item) ||
            (isLength && selectedLength === item);

          // 클릭 시 동작
          const handleClick = () => {
            if (isLanguage) {
              setSelectedLanguage(item);
            } else if (isLength) {
              setSelectedLength(item);
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
