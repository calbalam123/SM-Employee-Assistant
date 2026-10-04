# 🤖 SM Employee Assistant

Discord에서 사용하는 Alibaba Cloud Model Studio Qwen 전용 한국어 AI 직원 업무 어시스턴트입니다.

## Qwen 설정

이 프로젝트는 OpenRouter를 사용하지 않고 Alibaba Cloud Model Studio의 Qwen OpenAI-compatible API를 직접 사용합니다.

### 🇰🇷 한국에서 권장

기본 리전은 Singapore (ap-southeast-1) 입니다.

.env:
```env
DISCORD_TOKEN=디스코드_봇_토큰
CLIENT_ID=디스코드_애플리케이션_ID
GUILD_ID=테스트할_서버_ID

QWEN_API_KEY=Singapore_리전에서_발급한_Alibaba_Cloud_Qwen_API_Key
QWEN_REGION=singapore
QWEN_API_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions
QWEN_MODEL=qwen-plus
```

Alibaba Cloud에서는 리전별 API Key와 엔드포인트가 서로 묶여 있습니다. 다른 리전에서 만든 키를 Singapore 엔드포인트에 사용하면 401 invalid_api_key가 발생할 수 있습니다.

Singapore의 기존 DashScope 엔드포인트는 dashscope-intl.aliyuncs.com이며, Alibaba Cloud는 Workspace 전용 엔드포인트도 제공합니다.

## API Key 발급

Alibaba Cloud Model Studio에서 Singapore 리전을 선택한 뒤 API Key를 생성하세요.

https://bailian.console.aliyun.com/

API Key는 .env에만 넣고 GitHub에 올리지 마세요.

## 설치 및 실행

Node.js 18.17 이상:

```bash
npm install
npm run deploy
npm start
```

Discord에서 일반 채팅을 읽으려면 Developer Portal → Bot → Privileged Gateway Intents → Message Content Intent를 켜야 합니다.

## 명령어

- /ask — Qwen에게 질문
- /help — 도움말
- /reset — 대화 문맥 초기화
- /status — 봇/Qwen 상태 확인

일반 채팅에도 답변합니다.

## 401 오류가 계속될 때

1. QWEN_API_KEY가 Alibaba Cloud Model Studio에서 발급한 키인지 확인
2. 키를 Singapore 리전에서 발급했는지 확인
3. .env의 QWEN_REGION=singapore 확인
4. QWEN_API_URL이 https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions인지 확인

키와 엔드포인트의 리전이 다르면 키 자체가 정상이어도 401이 발생합니다.

## 보안

.env, Discord 토큰, Alibaba Cloud Qwen API Key를 GitHub에 커밋하지 마세요.
