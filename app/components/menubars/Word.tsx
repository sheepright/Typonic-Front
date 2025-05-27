"use client";

import { useEffect, useState } from "react";
import { generateWords } from "@/app/api/api";

export default function Word() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [selectedCount, setSelectedCount] = useState("10개");

  const menu = [
    "코드 단어 연습", "Line",
    "C++", "C#", "Java", "Python", "Html", "JavaScript", "TypeScript",
    "Line", "10개", "25개", "50개"
  ];

  const getCount = (label: string): number => parseInt(label.replace("개", ""));

  useEffect(() => {
    const version = Date.now().toString();
    const fetch = async () => {
      try {
        const res = await generateWords({
          language: selectedLanguage,
          count: getCount(selectedCount)
        });
        localStorage.setItem("typingWords", JSON.stringify(res));
        localStorage.setItem("wordsVersion", version);
        console.log("📦 저장된 단어:", res);
      } catch (err) {
        console.error("단어 가져오기 실패:", err);
      }
    };
    fetch();
  }, [selectedLanguage, selectedCount]);

  return (
    <div className="w-[900px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-lg">
      <div className="flex items-center space-x-6">
        {menu.map((item) =>
          item === "Line" ? (
            <div
              key={item + Math.random()}
              className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
            />
          ) : (
            <button
              key={item}
              onClick={() => {
                if (["10개", "25개", "50개"].includes(item)) {
                  setSelectedCount(item);
                } else if (item !== "코드 단어 연습") {
                  setSelectedLanguage(item);
                }
              }}
              className={`text-[15px] text-white ${
                item === selectedLanguage || item === selectedCount ? "opacity-100" : "opacity-20"
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>
    </div>
  );
}
