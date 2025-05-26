"use client";

import { useState, useEffect } from "react";

interface RankingItem {
  username: string;
  vpm: number;
  time: string;
  accuracy: string;
  date: string;
}

export default function Ranking() {
  const [rankingList, setRankingList] = useState<RankingItem[]>([]);

  // 더미 데이터 생성 (50개) -> 나중에 랭킹 DB API로 대체
  useEffect(() => {
    const dummyData = Array.from({ length: 50 }, (_, i) => ({
      username: `User${i + 1}`,
      vpm: Math.floor(Math.random() * 400),
      time: `${Math.floor(Math.random() * 60)}s`,
      accuracy: `${(Math.random() * 100).toFixed(2)}%`,
      date: `2025-05-${String((i % 30) + 1).padStart(2, "0")}`,
    }));
    setRankingList(dummyData);
  }, []);

  return (
    <div className="w-[940px] h-[579px] rounded-[10px] overflow-hidden shadow-lg font-dung">
      {/* 헤더 */}
      <div className="flex h-[35px] bg-cdark text-[18px]">
        <div className="w-[50px] flex items-center justify-center">#</div>
        <div className="w-[340px] flex items-center pl-1">user . Name</div>
        <div className="w-[100px] flex items-center justify-center">wpm</div>
        <div className="w-[100px] flex items-center justify-center">Time</div>
        <div className="w-[160px] flex items-center justify-center">
          Accuracy
        </div>
        <div className="w-[190px] flex items-center justify-center">Date</div>
      </div>

      {/* 스크롤 */}
      <div className="overflow-y-auto h-[544px] scrollbar-hide">
        {rankingList.map((item, index) => {
          // 등수에 따라 텍스트 색상 결정
          const rankColor =
            index === 0
              ? "text-[#FFD700]" // 금
              : index === 1
              ? "text-[#C0C0C0]" // 은
              : index === 2
              ? "text-[#CD7F32]" // 동
              : "text-white"; // 나머진 흰색

          return (
            <div
              key={index}
              className={`flex h-[35px] ${
                index % 2 === 0 ? "bg-root" : "bg-cdark"
              } text-[18px] ${rankColor}`}
            >
              <div className="w-[50px] flex items-center justify-center">
                {index + 1}
              </div>
              <div className="w-[340px] flex items-center pl-8">
                {item.username}
              </div>
              <div className="w-[100px] flex items-center justify-center">
                {item.vpm}
              </div>
              <div className="w-[100px] flex items-center justify-center">
                {item.time}
              </div>
              <div className="w-[160px] flex items-center justify-center">
                {item.accuracy}
              </div>
              <div className="w-[190px] flex items-center justify-center">
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
