# 🤖 SM Employee Assistant

Discord에서 사용할 수 있는 한국어 AI 직원 업무 어시스턴트입니다.

## 기능

- 일반 채팅으로 Qwen AI와 대화
- `/ask` AI 업무 질문
- `/help` 사용법
- `/reset` 대화 문맥 초기화
- `/status` 봇/AI 상태 확인
- 사용자별 채널 대화 문맥 유지
- OpenRouter를 통한 Qwen AI 연결

## 일반 채팅 사용

봇이 들어와 있는 서버의 채널에서 그냥 메시지를 보내면 Qwen이 답변합니다.

예:
```
오늘 할 일을 정리해줘
회의 내용을 요약하는 방법 알려줘
엑셀 업무 자동화 아이디어를 알려줘
```

봇의 메시지에는 다시 반응하지 않으며, 모든 대화는 사용자별/채널별로 분리됩니다.

## 설치

Node.js 18.17 이상을 권장합니다.

```bash
npm install
```

## 환경변수

`.env.example`을 복사해서 `.env`를 만들고 아래 값을 입력합니다.

```
DISCORD_TOKEN=디스코드_봇_토큰
CLIENT_ID=디스코드_애플리케이션_ID
GUILD_ID=테스트할_서버_ID
OPENROUTER_API_KEY=Qwen_API를 호출할_OpenRouter_API_키
AI_MODEL=qwen/qwen-2.5-72b-instruct
```

**중요:** `.env`와 봇 토큰/API 키를 GitHub에 올리지 마세요.

## Discord 설정

일반 채팅을 읽으려면 Discord Developer Portal에서 **Message Content Intent**를 켜야 합니다.

1. Discord Developer Portal에서 Application을 엽니다.
2. **Bot** 메뉴로 들어갑니다.
3. **Privileged Gateway Intents**에서 **Message Content Intent**를 ON으로 설정합니다.
4. 봇을 서버에 초대합니다.

## 명령어 등록

```bash
npm run deploy
```

## 실행

```bash
npm start
```

이제 Discord 채널에서 일반 메시지를 보내면 Qwen이 답변합니다.

## 주의

이 프로젝트는 비공식 업무 보조 AI입니다. 회사의 공식 시스템이나 공식 의사결정권자를 대체하지 않습니다.
