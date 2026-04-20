# 🔮 천기누설 (天機漏洩)
### 사주(四柱) & 자미두수(紫微斗數) 프리미엄 운세 AI 분석 서비스

<p align="center">
  <img src="https://img.shields.io/badge/version-1.1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js">
  <img src="https://img.shields.io/badge/FastAPI-0.100+-green" alt="FastAPI">
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o-orange" alt="OpenAI">
</p>

**천기누설**은 전통 동양 점성술인 **명리학(사주)**과 **자미두수**를 현대적 감각으로 재해석한 프리미엄 운세 분석 플랫폼입니다. 정교한 계산 엔진과 최첨단 AI 기술을 결합하여, 단순한 운세를 넘어 당신의 인생을 관통하는 통찰력을 제공합니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 🎯 정밀한 명반(Chart) 생성
- **사주팔자 (Bazi)**: `lunar-javascript`를 활용하여 만세력 기반의 정확한 사주(연월일시) 데이터를 추출합니다.
- **자미두수 (Zi Wei Dou Shu)**: `iztro` 엔진을 통해 출생 시간(분 단위)까지 반영된 세밀한 12궁 명반(전택궁, 부처궁 등)을 구성합니다.

### 2. 🤖 AI 심층 라이프 컨설팅
- **초개인화 종합 분석**: 타고난 성향, 기질, 그리고 인생의 전반적인 큰 흐름을 분석합니다.
- **테마별 집중 분석**: 
  - 💘 **연애/결혼**: 인연의 흐름, 연애 성향, 그리고 만남의 시기 분석
  - 💼 **직업/성공**: 적성에 맞는 직업군, 커리어 발전 방향, 재능 발휘 영역
  - 💰 **재물/투자**: 자산 형성 과정, 금전운의 흐름, 투자 적기 제안
- **🎯 솔로 탈출 (운명적 만남 예측)**:
  - **구체적인 만남 예측**: 만남의 시기, 구체적인 장소, 예상되는 상황 및 성공 확률을 제시합니다.
  - **상대방 페르소나**: 운명의 상대의 외모, 성격, 연령대, 직업군 등을 생생하게 묘사합니다.
  - **실전 스크립트 제공**: 자연스럽게 다가갈 수 있는 오프닝 대사와 대화 이어나가기 꿀팁을 제공합니다.
- **💬 사용자 맞춤형 질문 (Q&A)**: 사용자가 직접 입력한 고민이나 구체적인 질문을 문맥에 반영하여 다각적이고 개인화된 분석 결과를 도출합니다.
- **😎 전문가 수준의 직설적 통찰**: 모호하고 뻔한 답변을 피하고, 실제 전문 상담가 수준의 명확하고 냉철한 조언을 제공합니다.

### 3. 🎨 프리미엄 UX/UI
- **모던 디자인**: 고품격 다크 모드 기반의 세련된 카드 레이아웃과 미니멀 트렌드 반영.
- **반응형 인터페이스**: 데스크톱, 태블릿, 모바일 등 모든 기기에서 최적화된 유려한 환경 제공.
- **실시간 리포트**: 탭 기반의 직관적인 화면 전환으로 분야별 분석 결과를 한눈에 확인 가능.

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework**: `Next.js 15 (App Router)`
- **Language**: `TypeScript`
- **Styling**: `TailwindCSS` / Vanilla CSS
- **Library**: `iztro`, `lunar-javascript`

### Backend
- **Framework**: `FastAPI (Python)`
- **Server**: `Uvicorn`
- **Data Validation**: `Pydantic`
- **AI Integration**: `OpenAI GPT-4o API`

---

## 📂 프로젝트 구조 (Project Structure)

```text
saju/
├── frontend/             # Next.js 클라이언트 애플리케이션
│   ├── app/              # 웹 페이지 (App Router) 및 API 라우트
│   ├── components/       # 재사용 가능한 UI 컴포넌트 (Form, Chart Viewer 등)
│   └── styles/           # 글로벌 스타일 및 테마 정의
└── backend/              # FastAPI AI 서버 애플리케이션
    ├── api/              # 컨트롤러 및 라우터 (Endpoints)
    ├── services/         # 비즈니스 로직, 프롬프트 엔지니어링, AI 서비스 연동
    ├── models/           # DTO (Data Transfer Objects) 및 에러 처리 매퍼
    └── main.py           # 애플리케이션 실행 엔트리 포인트
```

---

## ⚙️ 시작하기 (Getting Started)

### Prerequisites (사전 준비)
- Node.js 18.x 이상
- Python 3.9 이상
- OpenAI API Key

### 1. Backend 환경 설정 및 실행
```bash
# 디렉토리 이동
cd backend

# 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Linux / Mac)
source venv/bin/activate
# 가상환경 활성화 (Windows)
.\venv\Scripts\activate

# 의존성 패키지 설치
pip install -r requirements.txt

# 환경 변수 설정 (.env 파일 생성)
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

# FastAPI 서버 실행 (http://localhost:8000)
python main.py
# 또는 uvicorn main:app --reload
```

### 2. Frontend 환경 설정 및 실행
```bash
# 디렉토리 이동
cd frontend

# 의존성 패키지 설치
npm install

# Next.js 개발 서버 실행 (http://localhost:3000)
npm run dev
```
브라우저에서 `http://localhost:3000` 로 접속하여 서비스를 이용할 수 있습니다.

---

## 🤝 기여 (Contributing)
이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다. 새로운 아이디어나 버그 사항이 있다면 PR 및 이슈를 등록해 주세요.

## 📜 라이선스 (License)
이 프로젝트는 개인 학습 및 포트폴리오 용도로 작성되었습니다.

---
> *주변인의 삶을 더 가치 있게 만드는 데이터의 힘, **천기누설**입니다.*
