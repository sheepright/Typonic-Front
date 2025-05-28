"use client";

import { useEffect, useState } from "react";
import MacOs from "../../layout/MacOs";
import {
  getPercentile,
  uploadRanking,
  checkEmailDuplicate,
} from "@/app/api/api";

interface AccuracyPoint {
  timeSec: number;
  wpm: number;
  accuracy: number;
}

interface PostRankProps {
  result: {
    durationSec: number;
    wpm: number;
    accuracy: number;
    typoCount: number;
    accuracyTimeline: AccuracyPoint[];
    savedAt: string;
  };
}

export default function PostRank({ result }: PostRankProps) {
  const [percentile, setPercentile] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchPercentile = async () => {
      try {
        const res = await getPercentile(result.wpm);
        setPercentile(res.percentile);
      } catch (error) {
        console.error("Percentile API error:", error);
      }
    };

    fetchPercentile();
  }, [result.wpm]);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      alert("이름과 이메일을 모두 입력해주세요.");
      return;
    }

    try {
      const { exists } = await checkEmailDuplicate(email);
      if (exists) {
        alert("이미 등록된 이메일입니다.");
        return;
      }

      const postData = {
        name,
        email,
        wpm: result.wpm,
        error: result.typoCount,
        time: result.durationSec,
        tier: "스포츠카",
        totalCharacters: result.wpm * result.durationSec,
        accuracy: result.accuracy,
      };

      await uploadRanking(postData);
      alert("등록 성공!");
    } catch (error) {
      console.error("등록 에러:", error);
      alert("등록 중 오류 발생!");
    }
  };

  return (
    <div>
      <div>
        <MacOs styleType="type1" />
      </div>
      <div className="pt-[15px] pl-[30px] w-[900px] h-[385px] flex flex-row bg-cdark rounded-br-[5px] rounded-bl-[5px] shadow-lg">
        <div className="w-[470px]">
          <div className="text-[35px] font-paper">타수 : {result.wpm}</div>
          <div className="mt-[5px] ml-[5px] text-[20px] font-paper">
            상위 : {percentile !== null ? `${percentile}%` : "로딩 중..."}
          </div>
          <div className="ml-[5px] text-[20px] font-paper">
            Rank. {/*result.tier*/}
          </div>
          <div>
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="w-full h-[250px]"
            />
          </div>
        </div>

        <div className="pl-[50px] w-[400px] pt-[60px] flex flex-col">
          <div className="text-[18px] font-paper">user.Name</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[300px] h-[25px] bg-root rounded-[5px] inset-shadow-sm font-paper text-[15px] px-2"
          />
          <div className="mt-[20px] text-[18px] font-paper">user.Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[300px] h-[25px] bg-root rounded-[5px] inset-shadow-sm font-paper text-[15px] px-2"
          />
          <button
            onClick={handleSubmit}
            className="mt-[20px] w-[300px] h-[25px] bg-root rounded-[5px] font-paper font-extrabold inset-shadow-sm"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
