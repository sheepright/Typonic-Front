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
  const getCount = (label: string) => parseInt(label.replace("개", ""), 10);

  const handleFetch = async () => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      console.warn("⚠️ 키워드가 비어있습니다.");
      return;
    }

    setLoading(true);
    try {
      let results: string[] = [];

      if (isWordMode) {
        const payload = { keyword: trimmedKeyword, count: getCount(subOption) };
        console.log("📤 단어 요청 데이터:", payload);

        const res = await generateWordKeyword(payload);
        console.log("🟢 단어 응답:", res);

        if (Array.isArray(res)) {
          results = res;
        } else if (res?.words && Array.isArray(res.words)) {
          results = res.words;
        } else if (typeof res === "string") {
          results = [res];
        }
      } else {
        console.log("📤 문장 요청 데이터:", { keyword: trimmedKeyword });

        const res = await generateSentenceKeyword({ keyword: trimmedKeyword });
        console.log("🟢 문장 응답:", res);

        if (Array.isArray(res)) {
          results = res;
        } else if (res?.sentences && Array.isArray(res.sentences)) {
          results = res.sentences;
        } else if (typeof res === "string") {
          results = [res];
        }
      }

      onFetch(results, selectedOption);
    } catch (err) {
      console.error("❌ API 호출 실패:", err);
      onFetch([], selectedOption);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <select
          className="w-[120px] h-[35px] rounded-[5px] bg-ccdark text-white text-[18px] text-center"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value as "문장" | "단어")}
        >
          {mainOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {isWordMode && (
          <select
            className="w-[100px] h-[35px] rounded-[5px] bg-ccdark text-white text-[18px] text-center"
            value={subOption}
            onChange={(e) => setSubOption(e.target.value)}
          >
            {subOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        <div className="relative">
          <input
            className="w-[300px] h-[35px] rounded-[5px] bg-ccdark text-white text-[18px] pl-3"
            placeholder="예) 음악, 과일 등"
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

      {loading && <p className="text-white">불러오는 중...</p>}
    </div>
  );
}
