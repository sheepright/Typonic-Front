"use client";

import { useState, useEffect } from "react";
import { getTop50 } from "@/app/api/api";

interface RankingItem {
  name: string;
  wpm: number;
  time: string;
  accuracy: string;
  date: string;
}

export default function Ranking() {
  const [rankingList, setRankingList] = useState<RankingItem[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getTop50();
        const parsedData = data.map((item: any, i: number) => {
          // 날짜 데이터 가공
          const dateObj = new Date(item.date);
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const day = String(dateObj.getDate()).padStart(2, "0");
          const hours = String(dateObj.getHours()).padStart(2, "0");
          const minutes = String(dateObj.getMinutes()).padStart(2, "0");
          const formattedDate = `${month}/${day} ${hours}:${minutes}`;

          return {
            name: item.name,
            wpm: item.wpm,
            time: `${parseFloat(item.time).toFixed(1)}'s`,
            accuracy: `${item.accuracy.toFixed(1)} %`,
            date: formattedDate,
          };
        });

        setRankingList(parsedData);
      } catch (err) {
        console.error("랭킹 데이터 불러오기 실패:", err);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="w-[940px] h-[579px] rounded-[10px] overflow-hidden shadow-lg font-dung">
      {/* 헤더 */}
      <div className="flex h-[35px] bg-cdark text-[18px]">
        <div className="w-[50px] flex items-center justify-center">#</div>
        <div className="w-[340px] flex items-center pl-1">user.Name</div>
        <div className="w-[100px] flex items-center justify-center">wpm</div>
        <div className="w-[100px] flex items-center justify-center">Time</div>
        <div className="w-[160px] flex items-center justify-center">
          Accuracy
        </div>
        <div className="w-[160px] flex items-center justify-center">Date</div>
      </div>

      {/* 스크롤 */}
      <div className="overflow-y-auto h-[544px] scrollbar-hide">
        {rankingList.map((item, index) => {
          const rankColor =
            index === 0
              ? "text-[#FFD700]"
              : index === 1
              ? "text-[#C0C0C0]"
              : index === 2
              ? "text-[#CD7F32]"
              : "text-white";

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
              <div className="w-[340px] flex items-center pl-1">
                {item.name}
              </div>
              <div className="w-[100px] flex items-center justify-center">
                {item.wpm}
              </div>
              <div className="w-[100px] flex items-center justify-center pl-1">
                {item.time}
              </div>
              <div className="w-[160px] flex items-center justify-center">
                {item.accuracy}
              </div>
              <div className="w-[160px] flex items-center justify-center">
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
