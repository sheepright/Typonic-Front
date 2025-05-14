"use client";

import { useState, JSX } from "react";

// UI Component
import Code from "../components/Code";
import Footer from "../components/Footer";
import Gagebar from "../components/Gagebar";
import Header from "../components/Header";

// MenuBar Component
import Menubar from "../components/menubars/Main";
import CodeMenubar from "../components/menubars/Code";
import WordMenubar from "../components/menubars/Word";
import CustomMenubar from "../components/menubars/Custom";

// page Component
import Guide from "./Guide";
import Raking from "./Ranking";

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
  setGage,
}: {
  selected: string | null;
  setGage: (val: number) => void;
}) => {
  if (selected === "가이드") {
    return (
      <div className="mt-[200px]">
        <Guide />
      </div>
    );
  }
  if (selected === "전체 랭킹") {
    return (
      <div className="mt-[50px]">
        <Raking />
      </div>
    );
  }

  return (
    <>
      <div className="mt-[90px]">
        <Gagebar gage={0} />
      </div>
      <div className="mt-[15px]">
        <Code setGage={setGage} />
      </div>
    </>
  );
};

// 전체 페이지
export default function Main() {
  const [selected, setSelected] = useState<string | null>(null);
  const [gage, setGage] = useState(0);

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-[1440px] min-h-[1024px] flex flex-col items-center">
        <Header />
        <div className="mt-[10px]">
          <DynamicMenubar selected={selected} onSelect={setSelected} />
        </div>
        <MainContent selected={selected} setGage={setGage} />
        <div className="flex-grow" />
        <Footer />
      </div>
    </div>
  );
}
