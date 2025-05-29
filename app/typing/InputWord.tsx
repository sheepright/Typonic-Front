"use client";

import { useEffect, useState, useRef } from "react";
import TypingWord from "./TypingWord";
import { useRouter } from "next/navigation";

interface TypingWordsInputProps {
  setGage: (value: number) => void;
  words: string[];
}

export default function InputWord({ setGage, words }: TypingWordsInputProps) {
  const [curIdx, setCurIdx] = useState(0);
  const [mode, setMode] = useState<"initial" | "fixed">("initial");
  const [pos, setPos] = useState(0);
  const [input, setInput] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [timeline, setTimeline] = useState<(0 | 1)[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  const router = useRouter();
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurIdx(0);
    setMode("initial");
    setPos(0);
    setInput("");
    setStart(null);
    setTimeline([]);
  }, [words]);

  useEffect(() => {
    taRef.current?.focus();
  }, []);

  const moveToNextWord = () => {
    const word = words[curIdx] || "";
    const updatedTimeline = [
      ...timeline,
      ...input.split("").map((c, i) => (c === word[i] ? 1 : 0)) as (0 | 1)[]
    ];
    setTimeline(updatedTimeline);

    const doneChars = words.slice(0, curIdx).join("").length + word.length;
    setGage((doneChars / words.join("").length) * 100);

    setInput("");
    setCurIdx((prev) => prev + 1);

    if (mode === "initial") {
      pos < 3 ? setPos((p) => p + 1) : setMode("fixed");
    }

    if (curIdx + 1 >= words.length && start) {
      const durationSec = (Date.now() - start) / 1000;
      const correctChars = updatedTimeline.filter((v) => v === 1).length;
      const typoCount = updatedTimeline.filter((v) => v === 0).length;
      const totalTyped = updatedTimeline.length;
      const accuracyPct = totalTyped ? Math.round((correctChars / totalTyped) * 100) : 0;
      const wpm = Math.round((words.length / durationSec) * 60 * 5);

      localStorage.setItem("typingResult", JSON.stringify({
        durationSec,
        wpm,
        accuracy: accuracyPct,
        typoCount,
        accuracyTimeline: updatedTimeline,
      }));

      router.push("/result");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isComposing) {
      setInput(e.target.value);
      return;
    }

    const val = e.target.value;
    const word = words[curIdx] || "";

    if (!start && val.length > 0) {
      setStart(Date.now());
    }

    setInput(val);

    // 입력이 정확하든 틀리든 글자 수가 맞으면 다음 단어로 이동
    if (val.length >= word.length) {
      moveToNextWord();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      moveToNextWord();
    }
  };

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
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="absolute inset-0 w-full h-full opacity-0 resize-none"
        autoFocus
      />
    </div>
  );
}
