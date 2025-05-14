"use client";

import { useState } from "react";
import Code from "../components/layout/Code";
import Footer from "../components/layout/Footer";
import Gagebar from "../components/layout/Gagebar";
import Header from "../components/layout/Header";
import Menubar from "../components/layout/Menubar";

export default function Main() {
  const [gage, setGage] = useState(0);

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-[1440px] min-h-[1024px] flex flex-col items-center">
        <Header />
        <div className="mt-[10px]">
          <Menubar />
        </div>
        <div className="mt-[90px]">
          <Gagebar gage={gage} />
        </div>
        <div className="mt-[15px]">
          <Code setGage={setGage} />
        </div>
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </div>
  );
}
