"use client";

interface Result {
  durationSec: number;
  wpm: number;
  accuracy: number;
  typoCount: number;
  savedAt: string;
}

interface DetailProps {
  result: Result;
}

export default function Detail({ result }: DetailProps) {
  const date = new Date(result.savedAt);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

  return (
    <div
      className="w-[900px] h-[297px] bg-[#2C2E31] text-[#FFFFFF] rounded p-4 flex flex-col items-center"
    >
      <h2 className="text-left w-full font-mono text-lg mb-2 tracking-wide">
        &gt;_Result
      </h2>
      <div className="w-[880px] h-[1px] bg-white mb-4"></div>
      <div className="w-full font-mono text-sm tracking-wider">
        <p>last login: {formattedDate}</p>
        <p>typonic@user result % </p>
        <p>typonic@user wpm % {result.wpm}</p>
        <p>typonic@user error % {result.typoCount}</p>
        <p>typonic@user time % {result.durationSec.toFixed(2)}’s</p>
        <p>typonic@user tier % 스포츠카</p>
        <p>typonic@user totalCharacters % 50</p>
        <p>typonic@user accuracy % {result.accuracy}%</p>
        <p>typonic@user % restart (y/n)</p>
      </div>
    </div>
  );
}
