"use client";

interface Result {
  durationSec: number;
  wpm: number;
  accuracy: number;
  typoCount: number;
  accuracyTimeline: (number | null)[];
}

interface TierProps {
  result: Result;
}

export default function Tier({ result }: TierProps) {
  const { wpm } = result;

  // 티어 계산 -> 사진나오면 바꿀거임 (wpm에 따라 class 결정)
  let tier = "class1";
  let speedRange = "0Km/h ~ 10Km/h";
  let stars = 1;

  if (wpm >= 10 && wpm < 30) {
    tier = "class2";
    speedRange = "10Km/h ~ 30Km/h";
    stars = 2;
  } else if (wpm >= 30 && wpm < 50) {
    tier = "class3";
    speedRange = "30Km/h ~ 50Km/h";
    stars = 3;
  } else if (wpm >= 50 && wpm < 70) {
    tier = "class4";
    speedRange = "50Km/h ~ 70Km/h";
    stars = 4;
  } else if (wpm >= 70 && wpm < 90) {
    tier = "class5";
    speedRange = "70Km/h ~ 90Km/h";
    stars = 5;
  } else if (wpm >= 90 && wpm < 110) {
    tier = "class6";
    speedRange = "90Km/h ~ 110Km/h";
    stars = 6;
  } else if (wpm >= 110 && wpm < 130) {
    tier = "class7";
    speedRange = "110Km/h ~ 130Km/h";
    stars = 7;
  } else if (wpm >= 130 && wpm < 150) {
    tier = "class8";
    speedRange = "130Km/h ~ 150Km/h";
    stars = 8;
  } else if (wpm >= 150 && wpm < 170) {
    tier = "class9";
    speedRange = "150Km/h ~ 170Km/h";
    stars = 9;
  } else if (wpm >= 170) {
    tier = "class10";
    speedRange = "170Km/h ~";
    stars = 10;
  }

  return (
    <div className="w-[900px] bg-[#2C2E31] text-white rounded p-6">
      <h2 className="text-center text-2xl mb-4">당신의 타이핑 속도는?</h2>
      <h3 className="text-center text-4xl font-bold mb-6">{wpm} WPM</h3>

      <div className="flex gap-4">
        {/* 왼쪽 이미지 박스 */}
        <div className="w-[800px] h-[533px] bg-white rounded flex items-center justify-center">
          <span className="text-black">사진 나오면 여기에</span>
        </div>

        {/* 오른쪽 티어 정보 */}
        <div className="w-1/2 flex flex-col justify-center">
          <p className="text-xl mb-2">🏆 <span className="font-bold">{tier}</span></p>
          <p className="text-md mb-4">🚀 {speedRange}</p>
          <div className="flex">
            {Array.from({ length: stars }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-2xl">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
