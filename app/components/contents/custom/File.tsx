"use client";

import { useState } from "react";
import MacOs from "../../layout/MacOs";
import InputArea from "@/app/typing/InputCode";
import Gagebar from "../../layout/Gagebar";
import { generateFile } from "@/app/api/api";

interface FileUploadSectionProps {
  setGage: (value: number) => void;
  gage: number;
}

export default function FileUploadSection({
  setGage,
  gage,
}: FileUploadSectionProps) {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [fullText, setFullText] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setSelectedFileName(file.name);

    try {
      alert("잠시만 기다려주세요, 최대 1분까지 소요될 수 있습니다.");
      const formData = new FormData();
      formData.append("file", file);

      const generatedText = await generateFile(formData);

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
      alert("문장 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
                연습하고 싶은 PDF 또는 Docx 파일을 첨부하여 주세요.
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div
                  className="w-[800px] h-[35px] rounded-[5px] text-[20px] font-corn text-center bg-root pt-[4px] pr-10 relative pointer-events-none"
                  style={{
                    boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {selectedFileName || "파일을 선택해주세요"}
                  <img
                    src="/images/Icon/uploadIcon.png"
                    alt="upload icon"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  />
                </div>
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
