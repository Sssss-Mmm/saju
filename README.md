# 🔮 천기누설 (天機漏洩)
### 사주(四柱) & 자미두수(紫微斗數) 프리미엄 운세 AI 분석 서비스

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-orange)

**천기누설**은 전통 동양 점성술인 **명리학(사주)**과 **자미두수**를 현대적 감각으로 재해석한 프리미엄 운세 분석 플랫폼입니다. 정교한 계산 엔진과 최첨단 AI 기술을 결합하여, 단순한 운세를 넘어 당신의 인생을 관통하는 통찰력을 제공합니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 🎯 정밀한 명반(Chart) 생성
- **사주팔자(Bazi)**: `lunar-javascript`를 활용하여 절기 기반의 정확한 사주 데이터를 추출합니다.
- **자미두수(Zi Wei Dou Shu)**: `iztro` 엔진을 통해 출생 분 단위까지 반영된 세밀한 전택궁, 부처궁 등 12궁 명반을 구성합니다.

### 2. 🤖 AI 심층 라이프 컨설팅
- **종합 분석**: 성격, 기질, 인생의 큰 흐름을 분석합니다.
- **테마별 분석**: 
  - 💘 **연애/결혼**: 인연의 흐름과 연애 성향 분석
  - 💼 **직업/성공**: 적성에 맞는 직업군과 사회적 발전 가능성
  - 💰 **재물/투자**: 자산 형성 과정과 투자 시기 제안
- **사용자 맞춤형 질문 (Q&A)**: 사용자가 직접 입력한 고민이나 질문을 반영하여 다각적이고 개인화된 분석 결과를 도출합니다.
- **직설적 통찰**: 모호한 답변이 아닌, 전문 상담가 수준의 명확하고 냉철한 조언을 제공합니다.

### 3. 🎨 프리미엄 UX/UI
- **모던 디자인**: 고품격 다크 모드와 세련된 카드 레이아웃.
- **반응형 인터페이스**: 데스크톱과 모바일 어디서나 최적화된 보기 환경을 제공합니다.
- **실시간 리포트**: 탭 기반의 직관적인 전환으로 원하는 분야의 분석 결과를 즉시 확인 가능합니다.

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 |
| :--- | :--- |
| **Frontend** | `Next.js 15 (App Router)`, `TypeScript`, `TailwindCSS` (or Vanilla CSS) |
| **Backend** | `FastAPI (Python)`, `Uvicorn`, `Pydantic` |
| **AI Engine** | `OpenAI GPT-4o API` |
| **Astrology** | `iztro (Zi Wei Dou Shu)`, `lunar-javascript (Bazi)` |

---

## 📂 프로젝트 구조 (Project Structure)

```text
saju/
├── frontend/             # Next.js 클라이언트 애플리케이션
│   ├── app/              # 메인 페이지 및 API 라우트
│   ├── components/       # 재사용 가능한 UI 컴포넌트 (Chart, Form 등)
│   └── styles/           # 디자인 시스템 및 CSS 설정
└── backend/              # FastAPI 서버 애플리케이션
    ├── api/              # API 엔드포인트 관리
    ├── services/         # 분석 로직 및 AI 통합 서비스 (Class-based)
    ├── models/           # 데이터 검증을 위한 Pydantic 모델
    └── main.py           # 애플리케이션 엔트리 포인트
```

---

## ⚙️ 시작하기 (Getting Started)

### Prerequisites
- Node.js 18.x 이상
- Python 3.9 이상
- OpenAI API Key

### 1. Backend 설정
```bash
cd backend
python -m venv venv
# Linux/Mac
source venv/bin/activate
# Windows
.\venv\Scripts\activate

pip install -r requirements.txt

# .env 파일 생성
echo "OPENAI_API_KEY=your_key_here" > .env

python main.py
```

### 2. Frontend 설정
```bash
cd frontend
npm install
npm run dev
```
브라우저에서 `http://localhost:3000` 접속 후 사용 가능합니다.

---

## 📜 라이선스 (License)
본 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

---
주변인의 삶을 더 가치 있게 만드는 데이터의 힘, **천기누설**입니다.
