"use client";

interface MacOsProps {
  styleType?: "type1" | "type2";
}

export default function MacOs({ styleType = "type1" }: MacOsProps) {
  const containerWidth = styleType === "type1" ? "w-[900px]" : "w-[850px]";

  return (
    <div
      className={`${containerWidth} h-[35px] bg-cdark rounded-tr-[5px] rounded-tl-[5px] shadow-lg`}
    >
      <div className="flex gap-2 p-3">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
    </div>
  );
}
