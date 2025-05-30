"use client";

import { useEffect, useState } from "react";
import { generateWords } from "@/app/api/api";

export default function WordMenubar() {
  // 현재 선택된 언어 상태 (기본값: C++)
  const [selectedLanguage, setSelectedLanguage] = useState("C++");

  // 현재 선택된 단어 개수 상태 (기본값: 10개)
  const [selectedCount, setSelectedCount] = useState("10개");

  // 메뉴에 표시할 항목들
  const menu = [
    "코드 단어 연습", // 항상 선택 상태 유지
    "Line", // 구분선
    "C++",
    "C#",
    "Java",
    "Python",
    "Html",
    "JavaScript",
    "TypeScript", // 언어들
    "Line", // 구분선
    "10개",
    "25개",
    "50개", // 단어 수
  ];

  // 문자열에서 숫자만 추출 (예: "25개" → 25)
  const getCount = (label: string): number => parseInt(label.replace("개", ""));

  // 언어 또는 단어 개수 선택 시 단어를 새로 생성
  useEffect(() => {
    const version = Date.now().toString(); // 고유 버전 키 생성

    const fetch = async () => {
      try {
        const res = await generateWords({
          language: selectedLanguage,
          count: getCount(selectedCount),
        });

        // localStorage에 결과 저장
        localStorage.setItem("typingWords", JSON.stringify(res));
        localStorage.setItem("wordsVersion", version);

        console.log("📦 저장된 단어:", res);
      } catch (err) {
        console.error("단어 가져오기 실패:", err);
      }
    };

    fetch(); // 초기 및 상태 변경 시 단어 생성 호출
  }, [selectedLanguage, selectedCount]);

  return (
    <div className="w-[900px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-lg">
      <div className="flex items-center space-x-6">
        {menu.map((item) => {
          // 구분선 렌더링
          if (item === "Line") {
            return (
              <div
                key={item + Math.random()}
                className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
              />
            );
          }

          // 항상 선택된 상태로 유지할 항목
          const alwaysSelected = item === "코드 단어 연습";

          // 언어 항목 여부
          const isLanguage = [
            "C++",
            "C#",
            "Java",
            "Python",
            "Html",
            "JavaScript",
            "TypeScript",
          ].includes(item);

          // 단어 수 항목 여부
          const isCount = ["10개", "25개", "50개"].includes(item);

          // 현재 선택된 항목인지 여부
          const isSelected =
            alwaysSelected ||
            (isLanguage && selectedLanguage === item) ||
            (isCount && selectedCount === item);

          // 버튼 클릭 핸들러
          const handleClick = () => {
            if (isLanguage) {
              setSelectedLanguage(item);
            } else if (isCount) {
              setSelectedCount(item);
            }
          };

          // 버튼 렌더링
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
