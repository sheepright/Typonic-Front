"use client";

export default function Header() {
  return (
    <header className="mt-[145px]">
      <div className="flex items-center">
        <img
          src="/images/Logo.png"
          alt="로고"
          className="w-[75px] h-[75px] rotate-[15deg]"
        />
        <div className="font-salad text-[35px]"> TYPONIC </div>
      </div>
    </header>
  );
}
