"use client";

import React from "react";

export default function Header() {
  return (
    <header className="mt-[70px] w-[250px] h-[85px] flex items-center">
      <h1>
        <a href="/" className="flex items-center cursor-pointer">
          <img
            src="/images/Logo.png"
            alt="TYPONIC 로고"
            className="w-[75px] h-[75px] rotate-[8deg]"
          />
          <span className="mt-3 font-salad text-[35px]"> TYPONIC </span>
        </a>
      </h1>
    </header>
  );
}