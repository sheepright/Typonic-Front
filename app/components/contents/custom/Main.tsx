"use client";

import { useState } from "react";
import MacOs from "../../layout/MacOs";
import { generateWordKeyword, generateSentenceKeyword } from "@/app/api/api";

export default function CustomMain() {
  const mainOptions = ["문장", "단어"] as const;
  const subOptions = ["10개", "25개", "50개"];

  const [selectedOption, setSelectedOption] = useState<typeof mainOptions[number]>(
    "문장"
  );
  const [subOption, setSubOption] = useState(subOptions[0]);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const isWordMode = selectedOption === "단어";
  const getCount = (label: string) => parseInt(label.replace("개", ""), 10);

  const handleFetch = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      if (isWordMode) {
        const res = await generateWordKeyword({
          keyword,
          count: getCount(subOption),
        });
        console.log("🟢 word API 응답:", res);
        // 단어 모드: 문자열 혹은 배열 방어
        if (typeof res === "string") {
          setResults([res]);
        } else if (Array.isArray(res)) {
          setResults(res);
        } else if (Array.isArray((res as any).words)) {
          setResults((res as any).words);
        } else if (Array.isArray((res as any).data)) {
          setResults((res as any).data);
        } else {
          setResults([]);
        }
      } else {
        const res = await generateSentenceKeyword({ keyword });
        console.log("🟢 sentence API 응답:", res);
        // 문장 모드: 문자열 혹은 배열 방어
        if (typeof res === "string") {
          setResults([res]);
        } else if (Array.isArray(res)) {
          setResults(res);
        } else if (Array.isArray((res as any).sentences)) {
          setResults((res as any).sentences);
        } else if (Array.isArray((res as any).data)) {
          setResults((res as any).data);
        } else {
          setResults([]);
        }
      }
    } catch (err) {
      console.error("❌ API 호출 실패", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MacOs styleType="type2" />

      <div className="w-[850px] h-[200px] bg-cdark flex flex-col justify-center items-center rounded-[5px] shadow-lg space-y-4 p-4">
        <div className="font-salad text-[25px] text-center">
          키워드 종류와 생성될 갯수(단어 모드일 때)를 선택해주세요.
        </div>

        <div className="flex items-center space-x-4">
          {/* 모드 선택 */}
          <select
            className="w-[120px] h-[35px] rounded-[5px] bg-ccdark text-white text-[18px] text-center"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value as any)}
          >
            {mainOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          {/* 단어 모드일 때만 개수 선택 */}
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

          {/* 키워드 입력 + 실행 버튼 */}
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
              <img
                src="/images/Icon/searchIcon.png"
                alt="search"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* 결과 표시 */}
        <div className="w-full max-h-[200px] overflow-auto text-white">
          {loading && <p>불러오는 중...</p>}

          {!loading && results.length > 0 && (
            <ul className="list-disc ml-5 space-y-1">
              {results.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {!loading && results.length === 0 && (
            <p className="text-center">결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}
