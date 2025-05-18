import { useState } from "react";
import MacOs from "../../layout/MacOs";

export default function FileUploadSection() {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setSelectedFileName(e.target.files[0].name);
  };

  return (
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
              className="w-[800px] h-[35px] rounded-[5px] text-[20px] font-corn text-center bg-ccdark pt-[4px] pr-10 relative pointer-events-none"
              style={{
                boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.25)",
              }}
            >
              {selectedFileName}
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
  );
}
