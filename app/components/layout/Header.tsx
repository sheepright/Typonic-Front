"use client";
import React from "react";

export default function Header({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLElement>;
}) {
  return (
    <header
      className="mt-[145px] w-[250px] h-[85px] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src="/images/Logo.png"
          alt="로고"
          className="w-[75px] h-[75px] rotate-[8deg]"
        />
        <div className="mt-3 font-salad text-[35px]"> TYPONIC </div>
      </div>
    </header>
  );
}
