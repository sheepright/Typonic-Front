"use client";

import Code from "../components/layout/Code";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menubar from "../components/layout/Menubar";

export default function Main() {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-[1440px] min-h-[1024px] flex flex-col items-center">
        <Header />
        <Menubar />
        <Code />
        <div className="flex-grow"></div>
        <Footer />
      </div>
    </div>
  );
}
