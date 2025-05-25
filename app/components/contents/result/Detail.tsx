"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Result {
  durationSec: number;
  wpm: number;
  accuracy: number;
  typoCount: number;
  savedAt: string;
}

interface DetailProps {
  result: Result;
}

export default function Detail({ result }: DetailProps) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const date = new Date(result.savedAt);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "y" || e.key === "Y") {
        router.push("/");
      } else if (e.key === "n" || e.key === "N") {
        setInput("n");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="w-[900px] h-[340px] bg-[#2C2E31] text-[#FFFFFF] rounded p-4 flex flex-col items-center ">
      {/* 마우스 커서 깜빡이는거 CSS */}
      <style jsx>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 2s step-end infinite;
        }
      `}</style>
      <h2 className="text-left w-full font-mono font-semibold text-[18px] mb-2 tracking-wide font-d2">
        &gt;_Result
      </h2>
      <div className="w-[880px] h-[1px] bg-white mb-7"></div>
      <div className="w-full font-mono font-normal text-[18px] tracking-wider font-d2">
        <p>last login: {formattedDate}</p>
        <p>typonic@user result % </p>
        <p>typonic@user wpm % {result.wpm}</p>
        <p>typonic@user error % {result.typoCount}</p>
        <p>typonic@user time % {result.durationSec.toFixed(2)}’s</p>
        <p>typonic@user tier % 스포츠카</p>
        <p>typonic@user totalCharacters % 50</p>
        <p>typonic@user accuracy % {result.accuracy}%</p>
        <p>
            typonic@user % restart (y/n)
            <span className="blinking-cursor font-salad font-bold"> |</span> {input}
        </p>
      </div>
    </div>
  );
}
