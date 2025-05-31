"use client";

import { useEffect, useState } from "react";
import { generateCodeExample } from "@/app/api/api";

export default function CodeMenubar() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [selectedLength, setSelectedLength] = useState<
    "Short" | "Middle" | "Long"
  >("Short");

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

  useEffect(() => {
    const version = Date.now().toString();

    const fetch = async () => {
      try {
        alert("잠시만 기다려주세요, 최대 1분까지 소요될 수 있습니다.");
        const res = await generateCodeExample({
          language: selectedLanguage,
          length: selectedLength.toLowerCase() as "short" | "middle" | "long",
        });
        localStorage.setItem("typingCode", JSON.stringify(res));
        localStorage.setItem("codeVersion", version);
      } catch (err) {
        console.error("코드 예제 가져오기 실패:", err);
      }
    };

    fetch();
  }, [selectedLanguage, selectedLength]);

  return (
    <div className="w-[900px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-lg">
      <div className="flex items-center space-x-6">
        {menu.map((item) => {
          if (item === "Line") {
            return (
              <div
                key={item + Math.random()}
                className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
              />
            );
          }

          const alwaysSelected = item === "코드 연습";
          const isLanguage = [
            "C++",
            "C#",
            "Java",
            "Python",
            "Html",
            "JavaScript",
            "TypeScript",
          ].includes(item);
          const isLength = ["Short", "Middle", "Long"].includes(item);

          const isSelected =
            alwaysSelected ||
            (isLanguage && selectedLanguage === item) ||
            (isLength && selectedLength === item);

          const handleClick = () => {
            if (isLanguage) {
              setSelectedLanguage(item);
            } else if (isLength) {
              setSelectedLength(item as "Short" | "Middle" | "Long");
            }
          };

          return (
            <button
              key={item}
              onClick={handleClick}
              className={`text-base border-0 bg-transparent font-dung transition-opacity duration-200 text-white text-[15px] ${
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
