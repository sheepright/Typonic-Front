"use client";

import { useState, useEffect } from "react";
import { getTop50 } from "@/app/api/api";

// API 원시 데이터 타입
interface RankingRawItem {
  name: string;
  wpm: number;
  time: number;
  accuracy: number;
  date: string; // ISO 형식 날짜
}

// 화면 표시용 데이터 타입
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
        const data = (await getTop50()) as unknown as RankingRawItem[];

        const parsedData: RankingItem[] = data.map((item) => {
          const dateObj = new Date(item.date);
          const formattedDate = `${(dateObj.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${dateObj
            .getDate()
            .toString()
            .padStart(2, "0")} ${dateObj
            .getHours()
            .toString()
            .padStart(2, "0")}:${dateObj
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

          return {
            name: item.name,
            wpm: item.wpm,
            time: `${Number(item.time).toFixed(1)}'s`,
            accuracy: `${item.accuracy.toFixed(1)} %`,
            date: formattedDate,
          };
        });

        setRankingList(parsedData);
      } catch {
        alert("잠시 후 다시 시도해 주세요.");
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="w-[940px] h-[579px] rounded-[10px] overflow-hidden shadow-lg font-dung">
      {/* 헤더 */}
      <div className="flex h-[35px] bg-cdark text-[18px] items-center">
        <div className="w-[50px] flex justify-center text-[23px] pb-1">#</div>
        <div className="w-[340px] flex pl-1">이름</div>
        <div className="w-[100px] flex justify-center">타수</div>
        <div className="w-[100px] flex justify-center">시간</div>
        <div className="w-[160px] flex justify-center">정확도</div>
        <div className="w-[160px] flex justify-center">날짜</div>
      </div>

      {/* 랭킹 리스트 */}
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
