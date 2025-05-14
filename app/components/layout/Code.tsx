"use client";

import InputArea from "@/app/typing/InputArea";

interface CodeProps {
  setGage: (value: number) => void;
}

export default function Code({ setGage }: CodeProps) {
  return (
    <div className="w-[900px] h-[400px] bg-cdark rounded-[5px] shadow-lg">
      <div className="flex gap-2 p-3">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      <InputArea setGage={setGage} />
    </div>
  );
}
