"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* 타입 정의 */
export interface RankingRequest {
  name: string;
  email: string;
  wpm: number;
  error: number;
  time: number;
  tier: string;
  totalCharacters: number;
  accuracy: number;
}

export interface TopUser {
  name: string;
  wpm: number;
  accuracy: number;
}

export interface WordGenerationRequest {
  language: string;
  count: number;
}

export interface KeywordRequest {
  keyword: string;
  count: number;
}

export interface CodeRequest {
  language: string;
  length: "short" | "middle" | "long";
}

/* DB API */

// 사용자 랭킹 업로드
export const uploadRanking = async (data: RankingRequest): Promise<void> => {
  await api.post("/db/ranking", data);
};

// 상위 50명 랭킹 조회
export const getTop50 = async (): Promise<string[]> => {
  const res = await api.get("/db/top50");
  return res.data;
};

// 백분위 조회
export const getPercentile = async (wpm: number): Promise<number> => {
  const res = await api.get("/db/percentile", { params: { wpm } });
  return res.data;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const res = await api.get("/db/email", { params: { email } });
  return res.data;
};

/* GPT API */

// 코드 예제 생성
export const generateCodeExample = async (
  data: CodeRequest
): Promise<string> => {
  const res = await api.post("/gpt/code", data);
  return res.data;
};

// 단어 예제 생성 (언어 + 개수)
export const generateWords = async (
  data: WordGenerationRequest
): Promise<string[]> => {
  const res = await api.post("/gpt/words", data);
  return res.data;
};

// 키워드 기반 문장 생성
export const generateSentenceKeyword = async (
  keyword: string
): Promise<string> => {
  const res = await api.post("/gpt/sentenceKeyword", keyword);
  return res.data;
};

// 키워드 기반 단어 생성
export const generateWordKeyword = async (
  data: KeywordRequest
): Promise<string[]> => {
  const res = await api.post("/gpt/wordKeyword", data);
  return res.data;
};

// 복.붙 문장 생성
export const generateCopy = async (copyData: string): Promise<string> => {
  const res = await api.post("/gpt/copy", copyData);
  return res.data;
};

//파일 첨부 문장 생성
export const generateFile = async (file: string): Promise<string> => {
  const res = await api.post("/gpt/extract", file);
  return res.data;
};