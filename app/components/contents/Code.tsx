"use client";

import InputArea from "@/app/typing/InputArea";

interface CodeProps {
  setGage: (value: number) => void;
}

export default function Code({ setGage }: CodeProps) {
  return (
    <div className="w-[900px] h-[365px] bg-cdark rounded-br-[5px] rounded-bl-[5px] shadow-lg">
      <InputArea setGage={setGage} />
    </div>
  );
}
