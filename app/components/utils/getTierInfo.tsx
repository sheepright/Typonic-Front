export function getTierInfo(wpm: number) {
  if (wpm >= 1000)
    return {
      tier: "군함",
      tierImg: "class7",
      speedRange: "수많은 글자들이 폭격합니다.",
      stars: 7,
    };
  if (wpm >= 650 && wpm < 1000)
    return {
      tier: "화물선",
      tierImg: "class6",
      speedRange: "대단합니다, 많은 글자를 싣고 출발합니다.",
      stars: 6,
    };
  if (wpm >= 400 && wpm < 650)
    return {
      tier: "크루즈",
      tierImg: "class5",
      speedRange: "당신은 부유한 속도의 타이핑 속도입니다.",
      stars: 5,
    };
  if (wpm >= 300 && wpm < 400)
    return {
      tier: "고속보트",
      tierImg: "class4",
      speedRange: "당신의 타이핑 속도는 고속입니다.",
      stars: 4,
    };
  if (wpm >= 200 && wpm < 300)
    return {
      tier: "요트",
      tierImg: "class3",
      speedRange: "적당한 속도의 타이핑을 느끼시는군요.",
      stars: 3,
    };
  if (wpm >= 100 && wpm < 200)
    return {
      tier: "낚시배",
      tierImg: "class2",
      speedRange: "세월의 글자를 낚는 중이시네요.",
      stars: 2,
    };
  return {
    tier: "뗏목",
    tierImg: "class1",
    speedRange: "당신의 타자는 매우 느립니다.",
    stars: 1,
  };
}
