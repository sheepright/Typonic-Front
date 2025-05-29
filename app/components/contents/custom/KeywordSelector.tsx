"use client";

import { useState } from "react";
import { generateWordKeyword, generateSentenceKeyword } from "@/app/api/api";

interface Props {
  onFetch: (results: string[], mode: "문장" | "단어") => void;
}

export default function KeywordSelector({ onFetch }: Props) {
  const mainOptions = ["문장", "단어"] as const;
  const subOptions = ["10개", "25개", "50개"];

  const [selectedOption, setSelectedOption] = useState<"문장" | "단어">("문장");
  const [subOption, setSubOption] = useState(subOptions[0]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const isWordMode = selectedOption === "단어";
  const getCount = (label: string): number => parseInt(label.replace("개", ""), 10);

  // ✅ 키워드로 단어 또는 문장 생성 요청
  const handleFetch = async () => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      console.warn("⚠️ 키워드를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      let results: string[] = [];

      if (isWordMode) {
        // 📤 단어 요청
        const payload = { keyword: trimmedKeyword, count: getCount(subOption) };
        const res = await generateWordKeyword(payload);
        results = Array.isArray(res) ? res : [res];
      } else {
        // 📤 문장 요청
        const res = await generateSentenceKeyword(trimmedKeyword);
        results = typeof res === "string" ? [res] : Array.isArray(res) ? res : [];
      }

      onFetch(results, selectedOption);
    } catch (err) {
      console.error("❌ 키워드 기반 생성 실패:", err);
      onFetch([], selectedOption);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        {/* ✅ 문장 / 단어 선택 */}
        <select
          className="w-[120px] h-[35px] rounded-[5px] bg-ccdark text-white text-[18px] text-center"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value as "문장" | "단어")}
        >
          {mainOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {/* ✅ 단어일 경우에만 개수 선택 */}
        {isWordMode && (
          <select
            className="w-[100px] h-[35px] rounded-[5px] bg-ccdark text-white text-[18px] text-center"
            value={subOption}
            onChange={(e) => setSubOption(e.target.value)}
          >
            {subOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}

        {/* ✅ 키워드 입력창 */}
        <div className="relative">
          <input
            className="w-[300px] h-[35px] rounded-[5px] bg-ccdark text-white text-[18px] pl-3"
            placeholder="예) 음식, 동물, 프로그래밍 등"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={handleFetch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <img src="/images/Icon/searchIcon.png" alt="search" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ✅ 로딩 표시 */}
      {loading && <p className="text-white">불러오는 중...</p>}
    </div>
  );
}
