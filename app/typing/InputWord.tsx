// src/components/typing/InputWord.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import TypingWord from "./TypingWord";
import { useRouter } from "next/navigation";

interface TypingWordsInputProps {
  setGage: (value: number) => void;
}

export default function InputWord({ setGage }: TypingWordsInputProps) {
  const [words, setWords] = useState<string[]>([]);
  const [curIdx, setCurIdx] = useState(0);
  const [mode, setMode] = useState<"initial" | "fixed">("initial");
  const [pos, setPos] = useState(0);
  const [input, setInput] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [timeline, setTimeline] = useState<(0 | 1)[]>([]);

  const versionRef = useRef<string | null>(null);
  const router = useRouter();

  // 1) 단어 불러오기 + trim 처리 + 버전 감지
  useEffect(() => {
    const load = () => {
      const raw = localStorage.getItem("typingWords");
      if (raw) {
        try {
          const arr = JSON.parse(raw) as string[];
          const clean = arr.map((w) => w.trim().replace(/[`~]/g, ""));
          setWords(clean);
        } catch {
          setWords([]);
        }
      } else {
        setWords([]);
      }
    };
    load();

    const iv = setInterval(() => {
      const v = localStorage.getItem("wordsVersion");
      if (versionRef.current !== v) {
        versionRef.current = v;
        load();
        resetAll();
      }
    }, 300);

    return () => clearInterval(iv);
  }, []);

  const resetAll = () => {
    setInput("");
    setCurIdx(0);
    setMode("initial");
    setPos(0);
    setStart(null);
    setTimeline([]);
  };

  // 2) textarea 포커스
  const taRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    taRef.current?.focus();
  }, [words]);

  // 3) onChange 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target.value;
    const word = words[curIdx] || "";

    // 시작 시간 기록
    if (!start && val.length) setStart(Date.now());

    // 입력 길이 초과 방지
    if (val.length > word.length) {
      val = val.slice(0, word.length);
    }

    // 딱 단어 완성 시
    if (val.length === word.length && input.length < word.length) {
      // 정확/오타 기록 (1 또는 0)
      const lastChar = val[val.length - 1];
      setTimeline((t) => [
        ...t,
        lastChar === word[val.length - 1] ? 1 : 0,
      ]);

      // 게이지 업데이트
      const doneChars =
        words.slice(0, curIdx).join("").length + val.length;
      setGage((doneChars / words.join("").length) * 100);

      // 다음 단어로 넘기기
      setInput("");
      setCurIdx((i) => i + 1);

      // 모드 전환
      if (mode === "initial") {
        if (pos < 3) setPos((p) => p + 1);
        else setMode("fixed");
      }

      // 마지막 단어까지 완료했으면 결과 저장 & 이동
      if (curIdx + 1 >= words.length && start) {
        const durationSec = (Date.now() - start) / 1000;
        // accuracyTimeline 기반 통계 계산
        const correctChars = timeline.filter((v) => v === 1).length;
        const typoCount    = timeline.filter((v) => v === 0).length;
        const totalTyped   = timeline.length;
        const accuracyPct  = totalTyped
          ? Math.round((correctChars / totalTyped) * 100)
          : 0;
        const wpm          = Math.round((words.length / durationSec) * 60 * 5);

        localStorage.setItem(
          "typingResult",
          JSON.stringify({
            durationSec,
            wpm,
            accuracy: accuracyPct,
            typoCount,
            accuracyTimeline: timeline,
          })
        );
        router.push("/result");
      }
      return;
    }

    // 추가 입력
    if (val.length > input.length) {
      const ch = val[val.length - 1];
      setTimeline((t) => [
        ...t,
        ch === word[val.length - 1] ? 1 : 0,
      ]);
      const doneChars =
        words.slice(0, curIdx).join("").length + val.length;
      setGage((doneChars / words.join("").length) * 100);
    }
    // 삭제
    else if (val.length < input.length) {
      const rem = input.length - val.length;
      setTimeline((t) => t.slice(0, t.length - rem));
    }

    setInput(val);
  };

  // 4) 렌더링
  if (!words.length) {
    return <div className="text-white">단어가 없습니다.</div>;
  }

  return (
    <div className="relative w-full h-full">
      <TypingWord
        words={words}
        currentWordIndex={curIdx}
        currentInput={input}
        inputMode={mode}
        inputPosition={pos}
      />
      <textarea
        ref={taRef}
        className="absolute inset-0 w-full h-full opacity-0 resize-none"
        value={input}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}
