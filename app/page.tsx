"use client";

import { useState, JSX } from "react";

// UI Component
import Header from "./components/layout/Header";
import Gagebar from "./components/layout/Gagebar";
import Footer from "./components/layout/Footer";

// MenuBars Component
import Menubar from "./components/menubars/Main";
import CodeMenubar from "./components/menubars/Code";
import WordMenubar from "./components/menubars/Word";
import CustomMenubar from "./components/menubars/Custom";

// Contents Component
import Word from "./components/contents/Word";
import Code from "./components/contents/Code";
import Guide from "./components/contents/Guide";
import Raking from "./components/contents/Ranking";
import MacOs from "./components/layout/MacOs";

// 동적 메뉴바
const DynamicMenubar = ({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (key: string) => void;
}) => {
  const menuComponentMap: Record<string, JSX.Element> = {
    "코드 연습": <CodeMenubar />,
    "코드 단어 연습": <WordMenubar />,
    "커스텀 연습": <CustomMenubar />,
  };

  return (
    menuComponentMap[selected!] ?? (
      <Menubar onSelect={onSelect} selected={selected} />
    )
  );
};

// 콘텐츠 렌더링 영역
const MainContent = ({
  selected,
  gage,
  setGage,
}: {
  selected: string | null;
  gage: number;
  setGage: (val: number) => void;
}) => {
  if (selected === "코드 단어 연습") {
    return (
      <>
        <div className="mt-[90px]">
          <Gagebar gage={gage} />
        </div>
        <div>
          <Word />
        </div>
      </>
    );
  }
  if (selected === "전체 랭킹") {
    return (
      <div className="mt-[50px]">
        <Raking />
      </div>
    );
  }
  if (selected === "가이드") {
    return (
      <div className="mt-[200px]">
        <Guide />
      </div>
    );
  }

  return (
    <>
      <div className="mt-[90px]">
        <Gagebar gage={gage} />
      </div>
      <div className="mt-[15px]">
        <MacOs />
      </div>
      <Code setGage={setGage} />
    </>
  );
};

// 전체 페이지
export default function Main() {
  const [selected, setSelected] = useState<string | null>(null);
  const [gage, setGage] = useState(0);

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full max-w-[1440px] h-full max-h-[1024px] flex flex-col justify-between">
        <div className="flex flex-col flex-grow items-center">
          <Header />
          <DynamicMenubar selected={selected} onSelect={setSelected} />
          <MainContent selected={selected} gage={gage} setGage={setGage} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
