export function getTierInfo(wpm: number) {
  if (wpm >= 110 && wpm < 130)
    return {
      tier: "군함",
      tierImg: "class7",
      speedRange: "110Km/h ~ 130Km/h",
      stars: 7,
    };
  if (wpm >= 90 && wpm < 110)
    return {
      tier: "화물선",
      tierImg: "class6",
      speedRange: "90Km/h ~ 110Km/h",
      stars: 6,
    };
  if (wpm >= 70 && wpm < 90)
    return {
      tier: "크루즈",
      tierImg: "class5",
      speedRange: "70Km/h ~ 90Km/h",
      stars: 5,
    };
  if (wpm >= 50 && wpm < 70)
    return {
      tier: "고속보트",
      tierImg: "class4",
      speedRange: "50Km/h ~ 70Km/h",
      stars: 4,
    };
  if (wpm >= 30 && wpm < 50)
    return {
      tier: "요트",
      tierImg: "class3",
      speedRange: "30Km/h ~ 50Km/h",
      stars: 3,
    };
  if (wpm >= 10 && wpm < 30)
    return {
      tier: "낚시배",
      tierImg: "class2",
      speedRange: "10Km/h ~ 30Km/h",
      stars: 2,
    };
  return {
    tier: "뗏목",
    tierImg: "class1",
    speedRange: "0Km/h ~ 10Km/h",
    stars: 1,
  };
}
