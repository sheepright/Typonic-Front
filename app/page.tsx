"use client";

import { useState, JSX } from "react";

// UI Component
import Header from "./components/layout/Header";
import MacOs from "./components/layout/MacOs";
import Gagebar from "./components/layout/Gagebar";
import Footer from "./components/layout/Footer";

// MenuBars Component
import Menubar from "./components/menubars/Main";
import CodeMenubar from "./components/menubars/Code";
import WordMenubar from "./components/menubars/Word";
import CustomMenubar from "./components/menubars/Custom";

// Contents Component
import MainCode from "./components/contents/Main";
import Code from "./components/contents/Code";
import Word from "./components/contents/Word";
import Guide from "./components/contents/Guide";
import Raking from "./components/contents/Ranking";

//Custom Component
import Custom from "./components/contents/custom/Main";
import Copy from "./components/contents/custom/Copy";
import File from "./components/contents/custom/File";

// 동적 메뉴바
const DynamicMenubar = ({
  selected,
  onSelect,
  customMode,
  setCustomMode,
}: {
  selected: string | null;
  onSelect: (key: string) => void;
  customMode: string;
  setCustomMode: (val: string) => void;
}) => {
  const menuComponentMap: Record<string, JSX.Element> = {
    "코드 연습": <CodeMenubar />,
    "코드 단어 연습": <WordMenubar />,
    "커스텀 연습": (
      <CustomMenubar
        selectedMode={customMode}
        setSelectedMode={setCustomMode}
      />
    ),
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
  customMode,
}: {
  selected: string | null;
  gage: number;
  setGage: (val: number) => void;
  customMode: string;
}) => {
  if (selected === "코드 연습") {
    return (
      <>
        <div className="mt-[90px]">
          <Gagebar gage={gage} />
        </div>
        <div className="mt-[15px]">
          <MacOs styleType="type1" />
        </div>
        <Code setGage={setGage} />
      </>
    );
  }
  if (selected === "코드 단어 연습") {
    return (
      <>
        <div className="mt-[200px]">
          <Gagebar gage={gage} />
        </div>
        <div className="mt-[30px]">
          <Word setGage={setGage} />
        </div>
      </>
    );
  }
  if (selected === "커스텀 연습") {
    return (
      <div className="mt-[225px]">
        {customMode === "키워드" && <Custom />}
        {customMode === "복.붙" && <Copy />}
        {customMode === "파일 첨부" && <File />}
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
        <MacOs styleType="type1" />
      </div>
      <MainCode setGage={setGage} />
    </>
  );
};

// 전체 페이지
export default function Main() {
  const [selected, setSelected] = useState<string | null>(null);
  const [gage, setGage] = useState(0);
  const [customMode, setCustomMode] = useState<string>("키워드");

  return (
    <div className="w-full h-screen flex justify-center items-start">
      <div className="w-full max-w-[1440px] h-full max-h-[1024px] flex flex-col justify-between">
        <div className="flex flex-col flex-grow items-center">
          <Header onClick={() => setSelected(null)} />
          <div className="mt-[10px]">
            <DynamicMenubar
              selected={selected}
              onSelect={setSelected}
              customMode={customMode}
              setCustomMode={setCustomMode}
            />
          </div>
          <MainContent
            selected={selected}
            gage={gage}
            setGage={setGage}
            customMode={customMode}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
