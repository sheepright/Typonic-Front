"use client";

interface Shortcut {
  keys: string[];
  label: string;
}

const shortcuts: Shortcut[] = [
  { keys: ["R", "ENTER"], label: "재시작" },
  { keys: ["ALT", "ENTER"], label: "랭킹 페이지 이동" },
  { keys: ["CTRL", "ALT", "ENTER"], label: "초기화" },
  { keys: ["CTAL", "DELETE"], label: "초기 화면" },
];

export default function Guide() {
  return (
    <div className="w-[406px] h-[189px] justify-center items-center">
      {shortcuts.map((shortcut, idx) => (
        <div key={idx} className="flex justify-center items-center mb-4">
          {shortcut.keys.map((key, kIdx) => (
            <div key={kIdx} className="flex items-center">
              <div className="flex justify-center items-center bg-cdark w-[50px] h-[30px] rounded-[5px] font-dung text-[15px] shadow-[0px_1px_1px_rgba(0,0,0,0.25)]">
                {key}
              </div>
              {kIdx !== shortcut.keys.length - 1 && (
                <div className="flex items-center font-dung text-[15px] px-4">
                  +
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center font-dung text-[15px] pl-4">
            : {shortcut.label}
          </div>
        </div>
      ))}
    </div>
  );
}
