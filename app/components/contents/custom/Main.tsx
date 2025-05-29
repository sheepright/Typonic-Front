"use client";

import { useEffect, useState } from "react";
import MacOs from "../../layout/MacOs";
import KeywordSelector from "@/app/components/contents/custom/KeywordSelector";
import InputWord from "@/app/typing/InputWord";
import InputCode from "@/app/typing/InputCode";

export default function CustomMain() {
  const [results, setResults] = useState<string[]>([]);
  const [mode, setMode] = useState<"문장" | "단어">("문장");
  const [gage, setGage] = useState(0);
  const [ready, setReady] = useState(false); // ✅ 렌더링 여부를 제어할 상태

  // KeywordSelector에서 데이터를 받는 콜백
  const handleFetch = (res: string[], selectedMode: "문장" | "단어") => {
    setResults(res);
    setMode(selectedMode);
    setReady(true); // ✅ 데이터 수신 완료
  };

  // 디버깅 로그 및 조건부 효과
  useEffect(() => {
    if (ready && results.length > 0) {
      console.log("✅ 데이터 준비 완료:", results);
    }
  }, [ready, results]);

  return (
    <>
      <MacOs styleType="type2" />

      <div className="w-[850px] bg-cdark flex flex-col justify-center items-center rounded-[5px] shadow-lg space-y-4 p-4">
        <div className="font-salad text-[25px] text-center">
          키워드 종류와 생성될 갯수(단어 모드일 때)를 선택해주세요.
        </div>

        <KeywordSelector onFetch={handleFetch} />

        {/* ✅ 준비가 되었을 때만 렌더링 */}
        {ready && results.length > 0 && (
          <div className="w-full bg-cdark rounded-b-[5px] shadow-md p-3">
            {mode === "문장" ? (
              <InputCode fullText={results.join("\n")} setGage={setGage} />
            ) : (
              <InputWord words={results} setGage={setGage} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
