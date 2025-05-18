import { useState } from "react";
import MacOs from "../../layout/MacOs";

export default () => {
  return (
    <>
      <MacOs styleType="type2" />
      <div className="w-[850px] h-[155px] bg-cdark flex justify-center items-center rounded-[5px] shadow-lg">
        <div>
          <div className="flex justify-center items-center p-[11px] font-salad text-[25px]">
            연습하고 싶은 문장을 복사해서 붙여 넣어주세요.
          </div>
          <div className="relative">
            <input
              className={`w-[800px] h-[35px] rounded-[5px] text-[25px] font-corn text-center bg-ccdark pt-[4px] pr-10`}
              style={{
                boxShadow: "inset 1px 1px 1px rgba(0, 0, 0, 0.25)",
              }}
            />
            <img
              src="/images/Icon/clipboardIcon.png"
              alt="search icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};
