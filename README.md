# 🇰🇷 HSC Korean Oral Practice

AI examiner for NSW HSC Korean Beginners & Continuers oral exam practice.

---

## 배포 방법 (Vercel 무료 배포)

### 1단계 — GitHub에 올리기

1. [github.com](https://github.com) 에 로그인
2. 오른쪽 상단 **+** → **New repository** 클릭
3. Repository name: `korean-oral-practice`
4. **Create repository** 클릭
5. 이 폴더 전체를 GitHub에 업로드:
   - **Upload files** 클릭 → 이 폴더 안의 모든 파일/폴더 드래그
   - **Commit changes** 클릭

### 2단계 — Vercel에 배포

1. [vercel.com](https://vercel.com) 에 가서 GitHub 계정으로 로그인
2. **Add New Project** 클릭
3. `korean-oral-practice` repository 선택 → **Import**
4. **Environment Variables** 섹션에서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: (Anthropic API 키 붙여넣기)
5. **Deploy** 클릭

> API 키는 [console.anthropic.com](https://console.anthropic.com) → API Keys에서 발급

### 3단계 — 완료!

배포 완료되면 `your-project.vercel.app` URL이 생성돼요.
핸드폰, 친구 모두 이 URL로 접속 가능!

---

## 로컬에서 테스트하는 방법

```bash
# 1. 패키지 설치
npm install

# 2. 환경변수 설정
cp .env.local.example .env.local
# .env.local 파일을 열어서 API 키 입력

# 3. 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:3000 열기
```

---

## 기능

- 🎙 **실시간 음성 인식** — 말하면 자동으로 인식, 멈추면 자동으로 다음 질문
- 🤖 **AI 시험관** — NESA 토픽별 질문 + 자연스러운 follow-up
- ⏱ **타이머** — KB 5분 / KC 10분
- 📊 **상세 피드백** — Band 채점 + 영어/한국어 피드백
- 📱 **모바일 지원** — 핸드폰에서도 작동

## 주의사항

- **Chrome 브라우저 권장** (Safari는 음성 인식이 불안정할 수 있음)
- 마이크 접근 허용 필요
