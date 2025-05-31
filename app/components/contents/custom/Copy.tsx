"use client";

import { useState } from "react";
import InputArea from "@/app/typing/InputCode";
import MacOs from "../../layout/MacOs";
import Gagebar from "../../layout/Gagebar";
import { generateCopy } from "@/app/api/api";

interface CopyProps {
  setGage: (value: number) => void;
  gage: number;
}

export default function Copy({ setGage, gage }: CopyProps) {
  const [fullText, setFullText] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const handleComplete = async () => {
    if (userInput.trim() !== "") {
      try {
        alert("잠시만 기다려주세요, 최대 1분까지 소요될 수 있습니다.");
        const generatedText = await generateCopy(userInput);

        let processedText = generatedText.trim();

        processedText = processedText.replace(/\r\n|\r/g, "\n");

        processedText = processedText.replace(/ +/g, " ");

        processedText = processedText
          .split("\n")
          .map((line) => line.trim())
          .join("\n");

        setFullText(processedText);
        setIsCompleted(true);
      } catch (error) {
        alert("오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <>
      {!isCompleted ? (
        <>
          <MacOs styleType="type2" />
          <div className="w-[850px] h-[155px] bg-cdark flex justify-center items-center rounded-[5px] shadow-lg">
            <div>
              <div className="flex justify-center items-center p-[11px] font-salad text-[25px]">
                연습하고 싶은 문장을 복사해서 붙여 넣어주세요.
              </div>
              <div className="relative flex items-center">
                <input
                  className="w-[800px] h-[35px] rounded-[5px] text-[25px] font-corn text-center bg-root pt-[4px] pr-10"
                  style={{
                    boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.25)",
                  }}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.nativeEvent.isComposing) return;
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleComplete();
                    }
                  }}
                />
                <img
                  src="/images/Icon/clipboardIcon.png"
                  alt="search icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={handleComplete}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center mt-[30px]">
            <Gagebar gage={gage} />
          </div>
          <div className="mt-[20px]">
            <MacOs styleType="type1" />
          </div>
          <div className="w-[900px] h-auto bg-cdark rounded-br-[5px] rounded-bl-[5px] pb-[10px] shadow-lg">
            <InputArea setGage={setGage} fullText={fullText} />
          </div>
        </>
      )}
    </>
  );
}
