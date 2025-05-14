"use client";

interface GageProps {
  gage: number;
}

export default function Gagebar({ gage }: GageProps) {
  const clampedPercent = Math.min(100, Math.max(0, gage));

  const barWidthPx = 880;
  const shipWidth = 30;
  const shipHalfPx = shipWidth / 2;
  const shipStartThresholdPercent = (shipHalfPx / barWidthPx) * 100;

  const isBeforeStart = clampedPercent <= shipStartThresholdPercent;
  const isFixed = clampedPercent >= 98;

  const shipLeft = isBeforeStart
    ? `-5px`
    : isFixed
    ? `98%`
    : `${clampedPercent}%`;

  return (
    <div className="relative w-[880px] h-[35px]">
      <div
        className="absolute bottom-[3px] transition-all duration-300"
        style={{
          left: shipLeft,
          transform: isBeforeStart ? "none" : "translateX(-15px)",
          width: "30px",
          height: "30px",
        }}
      >
        <img
          src="/images/GageShip.png"
          alt="GageShip"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          className="scale-x-[-1] rotate-[-15deg] transition-all duration-300"
        />
      </div>

      <div className="absolute bottom-0 w-full h-[2px] bg-white rounded-xl">
        <div
          className="h-full bg-cblue transition-all duration-300"
          style={{ width: `${clampedPercent}%` }}
        ></div>
      </div>
    </div>
  );
}
