# 🤖 SM Employee Assistant

Discord에서 사용할 수 있는 한국어 AI 직원 업무 어시스턴트입니다.

## 기능

- `/ask` AI 업무 질문
- `/help` 사용법
- `/reset` 대화 문맥 초기화
- `/status` 봇/AI 상태 확인
- 사용자별 채널 대화 문맥 유지
- OpenRouter API를 통한 AI 연결

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
OPENROUTER_API_KEY=OpenRouter_API_키
AI_MODEL=qwen/qwen-2.5-72b-instruct
```

**중요:** `.env`와 봇 토큰/API 키를 GitHub에 올리지 마세요.

## Discord 설정

1. Discord Developer Portal에서 Application을 생성합니다.
2. Bot을 추가하고 Bot Token을 발급합니다.
3. OAuth2 > URL Generator에서 `bot`과 `applications.commands`를 선택합니다.
4. 봇을 테스트 서버에 초대합니다.
5. 서버 ID를 `GUILD_ID`에 입력합니다.

## 명령어 등록

```bash
npm run deploy
```

성공하면 해당 서버에 슬래시 명령어가 즉시 등록됩니다.

## 실행

```bash
npm start
```

Discord에서 `/help` 또는 `/ask`를 사용하면 됩니다.

## 주의

이 프로젝트는 비공식 업무 보조 AI입니다. 회사의 공식 시스템이나 공식 의사결정권자를 대체하지 않습니다.
