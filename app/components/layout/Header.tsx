"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-[70px] w-[250px] h-[85px] flex items-center">
      <h1>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
          className="flex items-center cursor-pointer"
        >
          <Image
            src="/images/Logo.png"
            alt="TYPONIC 로고"
            width={75}
            height={75}
            priority
            className="rotate-[8deg]"
          />
          <span className="mt-3 font-salad text-[35px]"> TYPONIC </span>
        </Link>
      </h1>
    </header>
  );
}
