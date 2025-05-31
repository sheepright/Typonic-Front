"use client";

import { useState } from "react";
import MacOs from "../../layout/MacOs";
import InputArea from "@/app/typing/InputCode";
import InputWord from "@/app/typing/InputWord";
import Gagebar from "../../layout/Gagebar";
import { generateSentenceKeyword, generateWordKeyword } from "@/app/api/api";

export default function Main({
  setGage,
  gage,
}: {
  setGage: (val: number) => void;
  gage: number;
}) {
  const mainOptions = ["문장", "단어"];
  const subOptions = ["10개", "25개", "50개"];

  const [selectedOption, setSelectedOption] = useState(mainOptions[0]);
  const [subOption, setSubOption] = useState(subOptions[0]);

  const [fullText, setFullText] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const isWordMode = selectedOption === "단어";

  const inputStyle = `h-[35px] rounded-[5px] text-[25px] font-corn text-center bg-root pt-[4px]
    ${isWordMode ? "w-[438px]" : "w-[589px]"} 
  `;

  const selectStyle = `w-[141px] h-[35px] rounded-[5px] text-[25px] font-corn text-center bg-root pt-[5px]
    ${isWordMode ? "mr-[28px]" : "mr-[37px]"} 
  `;

  const handleComplete = async () => {
    if (userInput.trim() === "") return;

    try {
      alert("잠시만 기다려주세요, 최대 1분까지 소요될 수 있습니다.");

      if (isWordMode) {
        // 단어 모드
        const generatedWords = await generateWordKeyword({
          keyword: userInput,
          count: parseInt(subOption.replace("개", ""), 10),
        });
        setWords(generatedWords);
      } else {
        // 문장 모드
        const generatedText = await generateSentenceKeyword(userInput);

        let processedText = generatedText.trim();

        processedText = processedText.replace(/\r\n|\r/g, "\n");
        processedText = processedText.replace(/ +/g, " ");
        processedText = processedText
          .split("\n")
          .map((line) => line.trim())
          .join("\n");

        setFullText(processedText);
      }

      setIsCompleted(true);
    } catch (error) {
      alert("문장/단어 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
                키워드 종류, 생성될 갯수 등 카테고리를 입력 및 선택해주세요.
              </div>
              <div className="flex">
                <select
                  className={selectStyle}
                  style={{
                    boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.25)",
                  }}
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {mainOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {isWordMode && (
                  <select
                    className={selectStyle}
                    style={{
                      boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.25)",
                    }}
                    value={subOption}
                    onChange={(e) => setSubOption(e.target.value)}
                  >
                    {subOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                <div className="relative flex items-center">
                  <input
                    className={`${inputStyle} pr-10`}
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
                    src="/images/Icon/searchIcon.png"
                    alt="search icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleComplete}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {isWordMode ? (
            <>
              <div className="flex justify-center mt-[30px]">
                <Gagebar gage={gage} />
              </div>
              <div className="w-[900px] h-automt-[20px]">
                <InputWord setGage={setGage} words={words} />
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
              <div className="w-[900px] h-auto bg-cdark rounded-[5px] pb-[10px] shadow-lg">
                <InputArea setGage={setGage} fullText={fullText} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
