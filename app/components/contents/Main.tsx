"use client";

import InputArea from "@/app/typing/InputCode";

interface CodeProps {
  setGage: (value: number) => void;
}

export default function Main({ setGage }: CodeProps) {
  // ✅ 고정된 fullText 선언
  const fullText = `#include <studio.h>
int main() {
\tprintf("Hello, Typonic!\\n");
\treturn 0;
}`;

  return (
    <div className="w-[900px] h-auto bg-cdark rounded-br-[5px] rounded-bl-[5px] pb-[10px] shadow-lg">
      {/* fullText를 고정된 값으로 넘김 */}
      <InputArea setGage={setGage} fullText={fullText} />
    </div>
  );
}
