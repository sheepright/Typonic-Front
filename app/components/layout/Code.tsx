"use client";

import InputArea from "@/app/typing/InputArea";

export default function Code() {
  return (
    <div>
      <div className="mt-[150px] w-[900px] h-[400px] bg-cdark rounded-xl shadow-lg overflow-hidden relative">
        {/* macOS 스타일 */}
        <div className="flex gap-2 p-3">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <div className="absolute top-[40px] left-0 w-full h-[360px]">
          <InputArea />
        </div>
      </div>
    </div>
  );
}
