"use client";

import { useState } from "react";

interface MenubarProps {
  onSelect: (menu: string) => void;
  selected: string | null;
}

export default function Menubar({ onSelect, selected }: MenubarProps) {
  const menus = [
    "코드 연습",
    "코드 단어 연습",
    "커스텀 연습",
    "Line",
    "전체 랭킹",
    "가이드",
  ];

  return (
    <div className="w-[600px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-[0px_1px_1px_rgba(0,0,0,0.25)]">
      <div className="flex items-center space-x-6">
        {menus.map((menu) =>
          menu === "Line" ? (
            <div
              key="Line"
              className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
            />
          ) : (
            <button
              key={menu}
              onClick={() => onSelect(menu)}
              className={`text-base border-0 bg-transparent font-dung transition-opacity duration-200 text-[white] text-[15px] ${
                selected === menu ? "opacity-100" : "opacity-20"
              }`}
              style={
                selected === menu ? { WebkitTextStroke: "0.2px white" } : {}
              }
            >
              {menu}
            </button>
          )
        )}
      </div>
    </div>
  );
}
