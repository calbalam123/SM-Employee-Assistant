import "dotenv/config";
import { addMessage, getHistory } from "./memory.js";

const REGION = (process.env.QWEN_REGION || "singapore").toLowerCase();

const REGION_ENDPOINTS = {
  singapore: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
  beijing: "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
  hongkong: "https://cn-hongkong.dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
  virginia: "https://dashscope-us.aliyuncs.com/compatible-mode/v1/chat/completions"
};

const API_URL = process.env.QWEN_API_URL || REGION_ENDPOINTS[REGION] || REGION_ENDPOINTS.singapore;

const SYSTEM_PROMPT = [
  "당신은 SM그룹 직원의 업무를 돕는 비공식 Qwen AI 업무 어시스턴트입니다.",
  "회사의 공식 의사결정권자나 공식 시스템인 것처럼 행동하지 않습니다.",
  "한국어를 기본 언어로 사용하고, 질문의 목적에 맞게 간결하고 실무적으로 답합니다.",
  "문서 작성, 아이디어 정리, 업무 계획, 요약, 번역, 코드 및 기술 지원을 도울 수 있습니다.",
  "확실하지 않은 사내 규정이나 사실은 추측하지 말고 확인이 필요하다고 안내합니다."
].join("\n");

export async function askAI({ userId, channelId, question }) {
  const apiKey = process.env.QWEN_API_KEY?.trim();
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
      Authorization: "Bearer " + apiKey,
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

    if (response.status === 401) {
      throw new Error(
        "Alibaba Cloud Qwen API 키 인증 실패(401). " +
        "현재 리전: " + REGION + ". API 키를 만든 Model Studio 리전과 API URL 리전이 같은지 확인하세요. " +
        "한국에서 사용할 경우 Singapore 리전 API Key + dashscope-intl.aliyuncs.com 조합을 권장합니다. " +
        body.slice(0, 300)
      );
    }

    throw new Error("Qwen API 오류 (" + response.status + "): " + body.slice(0, 500));
  }

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content?.trim() || "";

  if (!answer) throw new Error("Qwen이 답변을 반환하지 않았습니다.");

  addMessage(userId, channelId, "user", question);
  addMessage(userId, channelId, "assistant", answer);
  return answer;
}

export function getQwenConfig() {
  return {
    model: process.env.QWEN_MODEL || "qwen-plus",
    region: REGION,
    apiUrl: API_URL
  };
}
