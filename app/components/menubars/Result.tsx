"use client";

interface ResultMenuProps {
  selectedResult: string;
  setSelectedResult: (item: string) => void;
}

export default function ResultMenubar({
  selectedResult,
  setSelectedResult,
}: ResultMenuProps) {
  const menu = [
    "결과", // 항상 선택된 라벨
    "Line",
    "등급 산정",
    "상세 정보",
    "그래프",
    "랭킹 등록",
  ];

  return (
    <div className="w-[600px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-lg">
      <div className="flex items-center space-x-6">
        {menu.map((item) => {
          if (item === "Line") {
            return (
              <div
                key={`line-${item}`}
                className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
              />
            );
          }

          const isAlwaysSelected = item === "결과";
          const isClickable = !isAlwaysSelected;
          const isSelected = isAlwaysSelected || selectedResult === item;

          const handleClick = () => {
            if (isClickable) {
              setSelectedResult(item);
            }
          };

          return (
            <button
              key={`menu-${item}`}
              onClick={handleClick}
              className={`text-base border-0 bg-transparent font-dung transition-opacity duration-200 text-[white] text-[15px] ${
                isSelected ? "opacity-100" : "opacity-20"
              } ${isAlwaysSelected ? "cursor-default" : "cursor-pointer"}`}
              style={isSelected ? { WebkitTextStroke: "0.2px white" } : {}}
              disabled={!isClickable}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
