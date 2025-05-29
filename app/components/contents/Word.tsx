"use client";

import { useEffect, useRef, useState } from "react";
import InputWord from "@/app/typing/InputWord";

interface WordProps {
  setGage: (value: number) => void;
}

export default function Word({ setGage }: WordProps) {
  const [words, setWords] = useState<string[]>([]);
  const versionRef = useRef<string | null>(null);

  // 로컬스토리지에서 단어 목록 불러오기
  const loadWords = () => {
    const stored = localStorage.getItem("typingWords");

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];

        // 불필요한 특수문자 제거 및 양 끝 공백 제거
        const cleaned = parsed.map((word) => word.trim().replace(/[`~]/g, ""));
        setWords(cleaned);
      } catch {
        setWords([]);
      }
    } else {
      setWords([]);
    }
  };

  useEffect(() => {
    // 첫 로딩
    loadWords();

    // 버전 변경 감지 (폴링 방식)
    const interval = setInterval(() => {
      const ver = localStorage.getItem("wordsVersion");
      if (versionRef.current !== ver) {
        versionRef.current = ver;
        loadWords();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[900px] h-auto bg-cdark rounded-br-[5px] rounded-bl-[5px] pb-[10px] shadow-lg">
      <InputWord setGage={setGage} words={words} />
    </div>
  );
}
