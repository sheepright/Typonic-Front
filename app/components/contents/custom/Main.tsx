import { useState } from "react";
import MacOs from "../../layout/MacOs";

export default function Main() {
  const mainOptions = ["문장", "단어"];
  const subOptions = ["10개", "25개", "50개"];

  const [selectedOption, setSelectedOption] = useState(mainOptions[0]);
  const [subOption, setSubOption] = useState(subOptions[0]);

  // 스타일 조건 변수
  const isWordMode = selectedOption === "단어";

  // 공통 스타일 + 조건부 스타일
  const inputStyle = `h-[35px] rounded-[5px] text-[25px] font-corn text-center bg-root pt-[4px]
    ${isWordMode ? "w-[438px]" : "w-[589px]"} 
  `;

  const selectStyle = `w-[141px] h-[35px] rounded-[5px] text-[25px] font-corn text-center bg-root pt-[5px]
    ${isWordMode ? "mr-[28px]" : "mr-[37px]"} 
  `;

  return (
    <>
      <MacOs styleType="type2" />
      <div className="w-[850px] h-[155px] bg-cdark flex justify-center items-center rounded-[5px] shadow-lg">
        <div>
          <div className="flex justify-center items-center p-[11px] font-salad text-[25px]">
            키워드 종류, 생성될 갯수 등 카테고리를 입력 및 선택해주세요.
          </div>
          <div className="flex">
            {/* 첫 번째 select */}
            <select
              className={`${selectStyle} `}
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

            {/* 두 번째 select (단어일 때만 표시) */}
            {isWordMode && (
              <select
                className={`${selectStyle} `}
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

            {/* 입력창 */}
            <div className="relative">
              <input
                className={`${inputStyle} pr-10`}
                style={{
                  boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.25)",
                }}
              />
              <img
                src="/images/Icon/searchIcon.png"
                alt="search icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
