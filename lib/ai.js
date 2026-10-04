import "dotenv/config";
import { addMessage, getHistory } from "./memory.js";

const API_URL =
  process.env.QWEN_API_URL ||
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

const SYSTEM_PROMPT = [
  "당신은 SM그룹 직원의 업무를 돕는 비공식 Qwen AI 업무 어시스턴트입니다.",
  "회사의 공식 의사결정권자나 공식 시스템인 것처럼 행동하지 않습니다.",
  "한국어를 기본 언어로 사용하고, 질문의 목적에 맞게 간결하고 실무적으로 답합니다.",
  "문서 작성, 아이디어 정리, 업무 계획, 요약, 번역, 코드 및 기술 지원을 도울 수 있습니다.",
  "확실하지 않은 사내 규정이나 사실은 추측하지 말고 확인이 필요하다고 안내합니다."
].join("\n");

export async function askAI({ userId, channelId, question }) {
  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) throw new Error("QWEN_API_KEY가 설정되지 않았습니다.");

  const model = process.env.QWEN_MODEL || "qwen-plus";
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...getHistory(userId, channelId),
    { role: "user", content: question }
  ];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4,
      max_tokens: 1200
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error("Qwen API 오류 (" + response.status + "): " + body.slice(0, 500));
  }

  const data = await response.json();
  const answer =
    data?.choices?.[0]?.message?.content?.trim() || "";

  if (!answer) throw new Error("Qwen이 답변을 반환하지 않았습니다.");

  addMessage(userId, channelId, "user", question);
  addMessage(userId, channelId, "assistant", answer);
  return answer;
}

export function getQwenConfig() {
  return {
    model: process.env.QWEN_MODEL || "qwen-plus",
    apiUrl: API_URL
  };
}
