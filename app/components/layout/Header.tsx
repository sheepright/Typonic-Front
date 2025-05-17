"use client";

export default function Header() {
  return (
    <header className="mt-[145px] w-[250px] h-[85px]">
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
