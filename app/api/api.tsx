'use client';

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.baseURL,
  headers: {
    'Content-Type': 'application/json',
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

export interface SentenceKeywordRequest {
  keyword: string;
}

export interface CodeRequest {
  language: string;
  length: 'short' | 'middle' | 'long';
}

/* DB API */

// 사용자 랭킹 업로드
export const uploadRanking = async (data: RankingRequest): Promise<void> => {
  await api.post('/db/ranking', data);
};

// 상위 50명 랭킹 조회
export const getTop50 = async (): Promise<TopUser[]> => {
  const res = await api.get('/db/top50');
  return res.data;
};

// 백분위 조회
export const getPercentile = async (score: number): Promise<{ percentile: number }> => {
  const res = await api.get('/db/percentile', { params: { score } });
  return res.data;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string): Promise<{ exists: boolean }> => {
  const res = await api.get('/db/email', { params: { email } });
  return res.data;
};

/* GPT API */

// 단어 예제 생성 (언어 + 개수)
export const generateWords = async (
  data: WordGenerationRequest
): Promise<string[]> => {
  const res = await api.post('/gpt/words', data);
  console.log("📦 GPT 응답:", res.data); // 예: ["Int", "Char", ...]
  return res.data;
};

export const generateWordKeyword = async (
  data: KeywordRequest
): Promise<{ words: string[] }> => {
  const res = await api.post("/gpt/wordKeyword", data);
  return res.data;
};

export const generateSentenceKeyword = async (
  data: SentenceKeywordRequest
): Promise<{ sentences: string[] }> => {
  const res = await api.post("/gpt/sentenceKeyword", data);
  return res.data;
};


// 코드 예제 생성
export const generateCodeExample = async (
  data: CodeRequest
): Promise<{ code: string }> => {
  const res = await api.post('/gpt/code', data);
  return res.data;
};
