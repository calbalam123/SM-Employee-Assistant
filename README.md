# 🤖 SM Employee Assistant

Discord에서 사용할 수 있는 **Qwen 전용 한국어 AI 직원 업무 어시스턴트**입니다.

## 기능

- 💬 일반 채팅으로 Qwen AI와 대화
- 🤖 Qwen API 직접 연결
- `/ask` Qwen에게 질문
- `/help` 사용법
- `/reset` 대화 문맥 초기화
- `/status` Qwen 상태 확인
- 사용자별/채널별 대화 문맥 유지
- 30분 동안 대화 문맥 유지
- 봇 자신의 메시지는 자동 무시

## Qwen API

이 프로젝트는 OpenRouter를 사용하지 않습니다.

Alibaba Cloud Model Studio의 **Qwen OpenAI-compatible API**를 직접 사용합니다. Qwen은 OpenAI 호환 인터페이스를 제공하므로 Node.js의 기본 `fetch`로 직접 호출합니다. citeturn0search1turn0search4

기본 국제 엔드포인트:

```
https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions
```

리전별 API 키와 엔드포인트가 맞아야 합니다. 현재 Alibaba Cloud는 워크스페이스별 리전 엔드포인트도 제공하므로 필요하면 `QWEN_API_URL`을 자신의 Model Studio 설정에 맞춰 변경할 수 있습니다. citeturn0search1

## 환경변수

`.env.example`을 복사해서 `.env`를 만들고 입력합니다.

```
DISCORD_TOKEN=디스코드_봇_토큰
CLIENT_ID=디스코드_애플리케이션_ID
GUILD_ID=테스트할_서버_ID

QWEN_API_KEY=Qwen_API_키
QWEN_API_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions
QWEN_MODEL=qwen-plus
```

**중요:** `.env`와 Discord 토큰/Qwen API 키를 GitHub에 올리지 마세요.

## 설치

Node.js 18.17 이상을 권장합니다.

```bash
npm install
```

## Discord 설정

일반 채팅을 읽으려면 Discord Developer Portal에서:

**Bot → Privileged Gateway Intents → Message Content Intent → ON**

으로 설정해야 합니다.

## 실행

```bash
npm run deploy
npm start
```

## 사용

Discord 채널에서 그냥 메시지를 보내면 됩니다.

```
안녕하세요 Qwen
오늘 업무 계획을 짜줘
회의 내용을 정리해줘
엑셀 자동화 아이디어를 알려줘
```

그러면 봇이 Qwen을 통해 답변합니다.

## 주의

이 프로젝트는 비공식 업무 보조 AI입니다. 회사의 공식 시스템이나 공식 의사결정권자를 대체하지 않습니다.
