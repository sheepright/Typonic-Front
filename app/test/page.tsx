"use client";

import { useState } from "react";
import axios from "axios";

export default function TestPage() {
  const [language, setLanguage] = useState("Java");
  const [length, setLength] = useState("short");
  const [count, setCount] = useState(5);

  const [codeResult, setCodeResult] = useState("");
  const [wordResult, setWordResult] = useState<string[]>([]);

  // ✅ 키워드 기반
  const [keyword, setKeyword] = useState("");
  const [keywordType, setKeywordType] = useState<"sentence" | "word">("word");
  const [keywordCount, setKeywordCount] = useState(5);
  const [keywordResult, setKeywordResult] = useState<string[] | string>("");

  // ✅ 파일 업로드
  const [file, setFile] = useState<File | null>(null);
  const [fileResult, setFileResult] = useState("");

  const handleCodeSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/gpt/code", {
        language,
        length,
      });
      setCodeResult(res.data);
    } catch (err) {
      console.error("❌ 코드 예제 요청 실패", err);
    }
  };

  const handleWordSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/gpt/words", {
        language,
        count,
      });
      setWordResult(res.data);
    } catch (err) {
      console.error("❌ 단어 요청 실패", err);
    }
  };

  const handleKeywordSubmit = async () => {
    try {
      const url =
        keywordType === "word"
          ? "http://localhost:8080/gpt/wordKeyword"
          : "http://localhost:8080/gpt/sentenceKeyword";

      const payload =
        keywordType === "word" ? { keyword, count: keywordCount } : { keyword };

      const res = await axios.post(url, payload);
      setKeywordResult(res.data);
    } catch (err) {
      console.error("❌ 키워드 요청 실패", err);
    }
  };

  // ✅ 파일 업로드 후 전송
  const handleFileUpload = async () => {
    if (!file) {
      alert("먼저 파일을 선택해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/gpt/extract",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFileResult(res.data);
    } catch (err) {
      console.error("❌ 파일 업로드 요청 실패", err);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-xl font-bold">🔥 GPT 코드 생성 테스트</h1>

      {/* ✅ 언어 선택 */}
      <div className="space-x-2">
        {["Java", "C", "C#"].map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-4 py-2 border rounded ${
              language === lang ? "bg-purple-300" : ""
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* ✅ 코드 길이 선택 */}
      <div className="space-x-2">
        {["short", "middle", "long"].map((len) => (
          <button
            key={len}
            onClick={() => setLength(len)}
            className={`px-4 py-2 border rounded ${
              length === len ? "bg-purple-300" : ""
            }`}
          >
            {len}
          </button>
        ))}
      </div>

      {/* ✅ 단어 개수 선택 */}
      <div className="space-x-2">
        {[5, 10, 20].map((num) => (
          <button
            key={num}
            onClick={() => setCount(num)}
            className={`px-4 py-2 border rounded ${
              count === num ? "bg-purple-300" : ""
            }`}
          >
            {num}개
          </button>
        ))}
      </div>

      {/* ✅ 요청 버튼 */}
      <div className="space-x-4">
        <button
          onClick={handleCodeSubmit}
          className="px-6 py-2 border text-white rounded bg-blue-500"
        >
          코드 예제 요청
        </button>
        <button
          onClick={handleWordSubmit}
          className="px-6 py-2 border text-white rounded bg-green-500"
        >
          단어 요청
        </button>
      </div>

      {/* ✅ 결과 출력 */}
      <div>
        <h2 className="text-lg font-semibold">✅ 코드 예제 결과</h2>
        <pre className="p-4 whitespace-pre-wrap bg-black rounded">
          {codeResult}
        </pre>
      </div>

      <div>
        <h2 className="text-lg font-semibold">✅ 단어 리스트</h2>
        <ul className="list-disc ml-5">
          {wordResult.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>

      {/* --- 🔥 키워드 기반 요청 --- */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-bold mb-2">🎯 키워드 기반 요청</h2>

        <input
          type="text"
          placeholder="예: 음악"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded mr-2"
        />

        <select
          value={keywordType}
          onChange={(e) =>
            setKeywordType(e.target.value as "sentence" | "word")
          }
          className="border p-2 rounded mr-2"
        >
          <option value="word">단어</option>
          <option value="sentence">문장</option>
        </select>

        {keywordType === "word" && (
          <input
            type="number"
            value={keywordCount}
            onChange={(e) => setKeywordCount(parseInt(e.target.value))}
            className="border p-2 rounded mr-2 w-20"
            min={1}
          />
        )}

        <button
          onClick={handleKeywordSubmit}
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          요청하기
        </button>

        <div className="mt-4">
          <h3 className="font-semibold">✅ 키워드 응답 결과</h3>
          {typeof keywordResult === "string" ? (
            <p className="mt-2 whitespace-pre-wrap">{keywordResult}</p>
          ) : (
            <ul className="list-disc ml-5 mt-2">
              {keywordResult.map((word, i) => (
                <li key={i}>{word}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 🚀 파일 업로드 테스트 */}
      <div className="border-t pt-6">
        <h2 className="text-lg font-bold mb-2">📂 파일 업로드 테스트</h2>

        {/* 파일 선택 */}
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded mr-2"
        />

        {/* 전송 버튼 */}
        <button
          onClick={handleFileUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          업로드 및 전송
        </button>

        <div className="mt-4">
          <h3 className="font-semibold">✅ 업로드 결과</h3>
          <pre className="p-4 whitespace-pre-wrap bg-black rounded">
            {fileResult}
          </pre>
        </div>
      </div>
    </div>
  );
}