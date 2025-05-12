"use client";

import { useState } from "react";

export default function Menubar() {
    const [selected, setSelected] = useState("코드 연습");

    const menus = ["코드 연습", "코드 단어 연습", "커스텀 연습", "전체 랭킹", "설정"];

    return (
        <div className="mt-[10px] flex justify-center">
            <div className="w-[640px] h-[40px] flex items-center rounded-xl bg-cdark font-dung">
                코드연습
            </div>
        </div>
    );
}
