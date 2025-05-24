"use client";
import InputWord from "@/app/typing/InputWord";

interface WordProps {
  setGage: (value: number) => void;
}

export default function Word({ setGage }: WordProps) {
  return (
    <div>
      <InputWord setGage={setGage} />
    </div>
  );
}
