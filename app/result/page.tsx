"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chart from "./Chart";
import ResultMenubar from "../components/menubars/Result";
import Tier from "../components/contents/result/Tier";
import Detail from "../components/contents/result/Detail";
import PostRank from "../components/contents/result/PostRank";
import MacOs from "../components/layout/MacOs";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getPercentile } from "@/app/api/api";

interface AccuracyPoint {
  timeSec: number;
  wpm: number;
  accuracy: number;
  typoCount: number;
}

interface Result {
  durationSec: number;
  wpm: number;
  accuracy: number;
  typoCount: number;
  totalChars: number;
  accuracyTimeline: AccuracyPoint[];
  percentile: number;
  savedAt: string;
}

export default function ResultPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);
  const [selectedResult, setSelectedResult] = useState<string>("등급 산정");

  useEffect(() => {
    const data = localStorage.getItem("typingResult");
    if (!data) {
      router.replace("/");
      return;
    }

    try {
      const parsed: Result = JSON.parse(data);
      setResult(parsed);

      const fetchPercentile = async () => {
        try {
          const percentile = await getPercentile(parsed.wpm);
          const updated = { ...parsed, percentile };
          setResult(updated);

          localStorage.setItem("typingResult", JSON.stringify(updated));
        } catch (error) {
          console.error("Percentile API error:", error);
        }
      };

      fetchPercentile();
    } catch (e) {
      router.replace("/");
    }
  }, [router]);

  if (!result) return null;

  const renderContent = () => {
    switch (selectedResult) {
      case "등급 산정":
        return (
          <div className="mt-[50px]">
            <Tier result={result} />
          </div>
        );
      case "상세 정보":
        return (
          <div className="mt-[50px]">
            <Detail result={result} />
          </div>
        );
      case "그래프":
        return (
          <div className="mt-[15px]">
            <>
              <MacOs styleType="type1" />
              <div className="w-[900px] shadow-lg bg-cdark p-4">
                <div className="ml-[-50px] font-paper">
                  <Chart
                    timeline={result.accuracyTimeline.map((p) => ({
                      timeSec: p.timeSec,
                      wpm: p.wpm,
                      accuracy: p.accuracy,
                      typoCount: p.typoCount,
                    }))}
                    durationSec={result.durationSec}
                  />
                </div>
              </div>
            </>
          </div>
        );
      case "랭킹 등록":
        return (
          <div className="mt-[50px]">
            <PostRank result={result} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full max-w-[1440px] h-full max-h-[1024px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Header onClick={() => setSelected(null)} />
          <div className="mt-[10px]"></div>
          <ResultMenubar
            selectedResult={selectedResult}
            setSelectedResult={setSelectedResult}
          />
        </div>
        <div className="flex justify-center items-center flex-grow">
          {renderContent()}
        </div>
        <Footer />
      </div>
    </div>
  );
}
