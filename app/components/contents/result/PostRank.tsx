// PostRank.tsx

"use client";

import { useState } from "react";
import MacOs from "../../layout/MacOs";
import { uploadRanking, checkEmailDuplicate } from "@/app/api/api";

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
    percentile: number;
    savedAt: string;
  };
}

export default function PostRank({ result }: PostRankProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      alert("이름과 이메일을 모두 입력해주세요.");
      return;
    }

    try {
      const res = await checkEmailDuplicate(email);

      // 이미 존재하면 사용자에게 업데이트 여부를 물어보는 알림창
      if (res == true) {
        const confirmed = confirm(
          "이미 등록된 이메일입니다. 기록을 업데이트하시겠습니까?"
        );
        if (!confirmed) {
          // 사용자가 취소를 누르면 업로드 중단
          return;
        }
        // 사용자가 확인을 누르면 계속 진행
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
      alert("잠시후 다시 시도해주세요.");
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
            상위 :{" "}
            {result.percentile !== null
              ? `${result.percentile}%`
              : "로딩 중..."}
          </div>
          <div className="ml-[5px] text-[20px] font-paper">
            Rank. {/* result.tier */}
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
