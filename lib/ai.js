import "dotenv/config";
import { addMessage, getHistory } from "./memory.js";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = [
  "당신은 SM그룹 직원의 업무를 돕는 비공식 AI 업무 어시스턴트입니다.",
  "회사의 공식 의사결정권자나 공식 시스템인 것처럼 행동하지 않습니다.",
  "한국어를 기본 언어로 사용하고, 질문의 목적에 맞게 간결하고 실무적으로 답합니다.",
  "문서 작성, 아이디어 정리, 업무 계획, 요약, 번역, 코드 및 기술 지원을 도울 수 있습니다.",
  "확실하지 않은 사내 규정이나 사실은 추측하지 말고 확인이 필요하다고 안내합니다."
].join("\n");

export async function askAI({ userId, channelId, question }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY가 설정되지 않았습니다.");

  const model = process.env.AI_MODEL || "qwen/qwen-2.5-72b-instruct";
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...getHistory(userId, channelId),
    { role: "user", content: question }
  ];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com/calbalam123/SM-Employee-Assistant",
      "X-Title": "SM Employee Assistant"
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
    throw new Error("AI API 오류 (" + response.status + "): " + body.slice(0, 300));
  }

  const data = await response.json();
  const answer = data && data.choices && data.choices[0] &&
    data.choices[0].message && data.choices[0].message.content
    ? data.choices[0].message.content.trim() : "";

  if (!answer) throw new Error("AI가 답변을 반환하지 않았습니다.");

  addMessage(userId, channelId, "user", question);
  addMessage(userId, channelId, "assistant", answer);
  return answer;
}
