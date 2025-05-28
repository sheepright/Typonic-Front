// src/components/contents/Word.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import InputWord from "@/app/typing/InputWord";

interface WordProps {
  setGage: (value: number) => void;
}

export default function Word({ setGage }: WordProps) {
  const [words, setWords] = useState<string[]>([]);
  const versionRef = useRef<string | null>(null);

  // 로컬스토리지에서 단어 불러오기
  const loadWords = () => {
    const raw = localStorage.getItem("typingWords");
    if (raw) {
      try {
        const arr = JSON.parse(raw) as string[];
        const cleaned = arr.map((w) => w.trim().replace(/[`~]/g, ""));
        setWords(cleaned);
      } catch {
        setWords([]);
      }
    } else {
      setWords([]);
    }
  };

  useEffect(() => {
    // 초기 로딩
    loadWords();

    // wordsVersion 변경 감지 (polling)
    const interval = setInterval(() => {
      const ver = localStorage.getItem("wordsVersion");
      if (versionRef.current !== ver) {
        versionRef.current = ver;
        loadWords();
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[900px] bg-cdark rounded-b-[5px] shadow-lg pb-2">
      <InputWord setGage={setGage} words={words} />
    </div>
  );
}
