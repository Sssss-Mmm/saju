# 천기누설 (天機漏洩) - 사주 & 자미두수 프리미엄 운세 분석

천기누설은 사주팔자(명리학)와 자미두수를 결합하여 심도 있는 운세 분석을 제공하는 프리미엄 웹 애플리케이션입니다. 사용자의 생년월일시를 바탕으로 개인의 명반을 구성하고, OpenAI의 강력한 AI 모델을 활용해 재물운, 연애운, 직업운 등 인생의 핵심 요소에 대한 전문적인 해석을 제공합니다.

## 🚀 주요 기능 (Key Features)

- **정밀한 명반 계산**: 출생 분 단위까지 입력받아 `iztro`, `lunar-javascript` 라이브러리를 활용해 한 치의 오차 없는 사주팔자 및 자미두수 명반(차트)을 생성합니다.
- **AI 심층 분석**: OpenAI 로직을 통해 명리학 및 자미두수 전문 상담가 수준의 직설적이고 통찰력 있는 맞춤형 조언(성향, 재물운, 직업운, 연애운 등)을 제공합니다.
- **프리미엄 UI/UX**: Next.js 기반으로 구축되어, 직관적이고 고품격 컨셉이 돋보이는 모던한 인터페이스를 자랑합니다.
- **프론트엔드/백엔드 분리 아키텍처**: 프론트엔드(Next.js)와 백엔드(FastAPI)가 명확히 분리 되어있어 시스템 유지보수와 안정성이 매우 우수합니다.

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 15, React 18
- **Language**: TypeScript
- **Libraries**:
  - `iztro` (자미두수 명반 계산)
  - `lunar-javascript` (사주/음력 변환)

### Backend
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **AI/LLM**: OpenAI API (`openai`)
- **Libraries**: `pydantic`, `python-dotenv`

## 📂 프로젝트 구조 (Project Structure)

```text
saju/
├── frontend/             # Next.js 클라이언트
│   ├── app/              # App Router 및 메인 페이지 구성
│   ├── components/       # 폼(Form), 차트 등 UI 컴포넌트
│   └── package.json      # 프론트엔드 의존성
└── backend/              # FastAPI 서버
    ├── api/              # 엔드포인트 라우터 관리
    ├── models/           # Pydantic 데이터 스키마
    ├── services/         # 비즈니스 로직 및 OpenAI 통합 서비스 담당
    ├── main.py           # FastAPI 메인 애플리케이션
    └── requirements.txt  # 백엔드 의존성 파이썬 패키지
```

## ⚙️ 로컬 개발 환경 설정 (Local Setup)

프로젝트를 실행하려면 프론트엔드와 백엔드 서버를 모두 가동해야 합니다.

### 1. 백엔드 (Backend) 환경 준비 및 실행

```bash
# 1. 백엔드 디렉토리로 이동
cd backend

# 2. (권장) 파이썬 가상환경 생성 및 활성화
python -m venv venv

# Mac/OSX/Linux
source venv/bin/activate
# Windows PowerShell
.\venv\Scripts\activate

# 3. 의존성 패키지 설치
pip install -r requirements.txt

# 4. 환경 변수 설정
# backend 폴더 안에 .env 파일을 생성하고 아래와 같이 발급받은 API 키를 입력합니다.
# OPENAI_API_KEY=your_openai_api_key_here

# 5. 서버 실행
uvicorn main:app --reload
```
API 서버 구동 확인 및 테스트는 `http://localhost:8000/docs` (Swagger UI) 에서 할 수 있습니다.

### 2. 프론트엔드 (Frontend) 환경 준비 및 실행

새로운 터미널(Terminal) 창을 엽니다.

```bash
# 1. 프론트엔드 디렉토리로 이동
cd frontend

# 2. Node.js 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```
웹 브라우저를 열고 `http://localhost:3000` 에 접속하여 애플리케이션을 이용해 보세요.
