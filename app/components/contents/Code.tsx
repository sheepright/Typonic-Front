"use client";

import InputArea from "@/app/typing/InputCode";

interface CodeProps {
  setGage: (value: number) => void;
}

export default function Code({ setGage }: CodeProps) {
  return (
    <div className="w-[900px] h-auto bg-cdark rounded-br-[5px] rounded-bl-[5px] pb-[10px] shadow-lg">
      <InputArea setGage={setGage} />
    </div>
  );
}
