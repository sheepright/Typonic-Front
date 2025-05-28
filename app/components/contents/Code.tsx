"use client";

import { useEffect, useState, useRef } from "react";
import InputArea from "@/app/typing/InputCode";

interface CodeProps {
  setGage: (value: number) => void;
}

export default function Code({ setGage }: CodeProps) {
  const [fullText, setFullText] = useState<string>("로딩 중...");
  const versionRef = useRef<string | null>(null);

  // 로컬스토리지에서 코드 불러오기
  const loadCode = () => {
    const stored = localStorage.getItem("typingCode");
    if (stored) {
      let decoded = stored.replace(/\\n/g, "\n");

      // 첫, 마지막 줄 제거
      let codeLines = decoded.split("\n");
      if (codeLines.length > 2) {
        codeLines = codeLines.slice(1, -1);
      }

      let code = codeLines.join("\n");

      // 4칸 공백을 탭으로 변환!
      code = code.replace(/ {4}/g, "\t");

      setFullText(code);
    } else {
      setFullText("코드 예제가 없습니다.");
    }
  };

  useEffect(() => {
    // 첫 로딩
    loadCode();

    // 버전 변경 감지 (폴링 방식)
    const interval = setInterval(() => {
      const ver = localStorage.getItem("codeVersion");
      if (versionRef.current !== ver) {
        versionRef.current = ver;
        loadCode();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[900px] h-auto bg-cdark rounded-br-[5px] rounded-bl-[5px] pb-[10px] shadow-lg ">
      <InputArea setGage={setGage} fullText={fullText} />
    </div>
  );
}
