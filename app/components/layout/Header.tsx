"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="mt-[145px]">
      <div className="flex items-center">
        <Image src="/images/Logo.png" alt="로고" width={75} height={75} />
        <div className="font-salad text-[35px]"> TYPONIC </div>
      </div>
    </header>
  );
}
