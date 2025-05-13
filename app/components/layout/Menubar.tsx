"use client";

import { useState } from "react";

export default function Menubar() {
  const [selected, setSelected] = useState("코드 연습");

  const menus = [
    "코드 연습",
    "코드 단어 연습",
    "커스텀 연습",
    "전체 랭킹",
    "설정",
  ];

  return (
    <div className="mt-[10px] w-[600px] h-[40px] flex justify-between items-center bg-cdark px-4 rounded-[5px]">
      {menus.map((menu) => (
        <button
          key={menu}
          onClick={() => setSelected(menu)}
          className={`text-base border-0 bg-transparent font-dung transition-opacity duration-200 text-[white] text-[15px] ${
            selected === menu ? "opacity-100" : "opacity-20"
          }`}
          style={selected === menu ? { WebkitTextStroke: "0.2px white" } : {}}
        >
          {menu}
        </button>
      ))}
    </div>
  );
}
