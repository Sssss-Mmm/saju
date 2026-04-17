import asyncio
import re
from openai import AsyncOpenAI
from fastapi import HTTPException
from models.schemas import AnalyzeRequest, QuestionRequest
from core.config import settings

class AnalysisService:
    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or settings.OPENAI_API_KEY
        self.client = AsyncOpenAI(api_key=self.api_key) if self.api_key else None

    def _get_mock_data(self, name: str) -> str:
        """Returns mock HTML data when OpenAI client is not available."""
        return f"""
        <p>"반갑네, {name} 군. 자네 사주를 보니 마치 <strong>'용광로 속에 놓인 정교한 다이아몬드'</strong> 같군. 겉으로는 특유의 유연함과 평화를 말하지만, 속으로는 자신을 끊임없이 채찍질하는 <strong>완벽주의가 자네를 태우고 있어</strong>."</p>
        <p>"남들은 자네를 '착하고 말 잘 듣는 사람'으로 보겠지만, 내 눈엔 언제든 폭발할 것 같은 <strong>예리한 칼날</strong>이 보이네. 자네가 지금 답답한 건 능력이 없어서가 아니야. 자네의 섬세한 기운을 담아낼 그릇이 부족해서 <strong>에너지가 안으로만 고이고 있기 때문</strong>이지."</p>
        <p>"특히 <strong>2026년은 자네에게 '불의 시험'</strong>과 같은 해가 될 걸세. 관성(火)이 극에 달하는 이 시기를 어떻게 넘기느냐에 따라 자네는 <strong>명품 보석이 될 수도</strong>, 그냥 녹아버린 쇳덩이가 될 수도 있어. 그 갈림길을 내가 짚어주겠네."</p>
        """

    def _build_prompt(self, request: AnalyzeRequest) -> str:
        """Builds the analysis prompt based on user request data."""
        return f"""
      당신은 명리학 계승자이자 운명 설계사인 '이현'입니다. (정중하면서도 뼈 때리는 직설적인 말투: ~네, ~군, ~걸세, ~하는 법이네.)
      아래 제공된 내담자({request.name})의 사주팔자와 자미두수 정보를 바탕으로 냉철하고 직관적인 운명 분석을 작성해주세요.
      
      [지시사항]
      - 말투: 단호하고 확신에 찬 어조. 사극풍의 연륜있고 정중하지만 위엄있는 말투.
      - 포맷: 제공된 이모지(📌, 🔷, 👉, ✔, 🔥 등)와 HTML 태그를 적극적으로 활용하세요. 특히 항목을 나열할 때는 절대 기호(•, - 등)로 대충 쓰지 말고, 반드시 HTML의 <ul> 태그와 <li> 태그로 목록을 만드세요. 문단은 <p> 태그, 줄바꿈은 <br>, 강조는 <strong> 태그를 사용하세요.
      - 분석 구조: 반드시 아래의 6단계 구조를 엄격하게 따르고, 각 제목은 <h3> 태그로 작성하세요.

      <h3>📌 1. 자미두수 기준 — "인생 구조"</h3>
      - 🔷 핵심 요약 (예: 👉 "머리는 좋은데, 돈/현실에서 계속 꼬이는 타입")
      - 주요 궁(명궁, 재백궁, 관록궁, 천이궁 등)의 특징과 👉 결론 분석.

      <h3>📌 2. 사주 기준 — "본질 체력"</h3>
      - 🔷 핵심 요약 (예: 👉 "에너지 지속력이 약한 신약 구조")
      - 십성(식상/재성/관성 등) 및 강약 분석과 그에 따른 특징 및 문제점.

      <h3>📌 3. 충돌 / 일치 포인트</h3>
      - 자미두수와 사주에서 완벽하게 일치하는 부분(✔)과 충돌하는 부분을 비교 분석. ("이게 진짜 핵심이네" 같은 뼈때리는 코멘트 포함)

      <h3>📌 4. 현실 해석 (이게 진짜 중요하네)</h3>
      - 🔷 연애/애정운: 결코 두루뭉술하게 적지 말고, 1) 언제 연애운/결혼운이 가장 좋은지(구체적 시기나 조건), 2) 본인과 가장 잘 맞는 상대방의 성격과 직업군, 3) 무의식적으로 끌리지만 절대 피해야 할 상대방의 특징을 아주 상세하게 뼈때리게 명시할 것.
      - 🔷 직업/취업운: 뻔한 소리 말고, 1) 가장 취업이나 이직, 승진하기 좋은 구체적인 시기(타이밍), 2) 본인 관운(직장운)의 강약 분석을 통해 조직 생활이 맞는지, 프리랜서나 사업이 맞는지 등 명확한 직무 방향성 제시, 3) 직장 생활 중 반드시 조심해야 할 치명적인 리스크(동료 배신, 구설수 등)를 아주 상세하게 뼈때리게 명시할 것.
      - 🔷 재물/돈 흐름: 돈을 모으는 패턴과 재물 손실을 피하는 방법.
      - 🔷 기타 굵직한 인생 패턴.
      ※ 위 4가지 항목은 반드시 🔷 기호와 함께 각각 줄바꿈하여 작성하세요.
      
      <h3>📌 5. 전략 (이거 안 하면 계속 반복되네)</h3>
      - 🔥 1. ~ 🔥 5. 처럼 구체적이고 당장 실행 가능한 필수 행동 지침(시스템/환경 변화 등) 제시.

      <h3>📌 최종 한 줄</h3>
      - 👉 내담자의 운명을 관통하는 뼈때리는 최종 결론 한 줄.

      [내담자 정보]
      이름: {request.name}
      사주 정보: {request.bazi or {}}
      자미두수 정보: {request.ziwei or {}}
    """

    def _build_love_prompt(self, request: AnalyzeRequest) -> str:
        """유년기~말년 대운 형식의 연애/애정 심화 분석 프롬프트를 생성합니다."""
        return f"""
      당신은 명리학 계승자이자 운명 설계사인 '이현'입니다. (정중하면서도 뼈 때리는 직설적인 말투: ~네, ~군, ~걸세, ~하는 법이네.)
      아래 내담자({request.name})의 사주와 자미두수 정보를 바탕으로, 오직 연애운과 애정운에만 집중하여 인생 전반의 대운 흐름으로 심층 분석하세요.

      [지시사항]
      - 말투: 단호하고 확신에 찬 어조. 사극풍의 연륜있고 정중하지만 위엄있는 말투.
      - 포맷: 반드시 HTML의 <ul>/<li>, <p>, <strong>, <h3> 태그를 사용하세요. 기호(•, -)로 목록을 쓰지 마세요.
      - 반드시 아래 5단계 구조를 빠짐없이 작성하세요.

      <h3>💕 1. 유년기 (0~20세) — 연애의 씨앗</h3>
      - 이 시기 이성에 대한 태도와 감정 패턴은 어떻게 형성되는지를 분석.
      - 어린 시절 어떤 경험이 향후 연애 방식에 각인되는지 뼈때리게 명시.

      <h3>💕 2. 청년기 (20~35세) — 연애의 폭풍</h3>
      - 이 시기 연애운의 흐름(언제 절정인지, 언제 공백기인지 구체적 시기 명시).
      - 이 시기에 자주 만나게 될 인연의 유형과 그 패턴.
      - 이 시기에 반드시 조심해야 할 최악의 인연 유형(성격, 직업군 등 구체적으로).

      <h3>💕 3. 중년기 (35~50세) — 연애와 결혼의 현실</h3>
      - 결혼운의 적기는 언제이며 어떤 조건이 갖춰져야 하는지.
      - 본인과 사주적으로 가장 잘 맞는 배우자/파트너의 성격, 직업군, 기질.
      - 결혼 후 발생하기 쉬운 갈등 패턴과 해결책.

      <h3>💕 4. 말년 (50세 이후) — 인연의 결산</h3>
      - 말년의 감정운과 배우자와의 관계 흐름.
      - 인연을 통해 얻게 되는 가장 큰 교훈 한 줄.

      <h3>💕 5. 이현의 연애 핵심 조언</h3>
      - 👉 연애에서 이 사람이 평생 반복하는 치명적 패턴과 그것을 깨는 핵심 전략을 뼈때리게 한 단락으로 결론지을 것.

      [내담자 정보]
      이름: {request.name}
      사주 정보: {request.bazi or {}}
      자미두수 정보: {request.ziwei or {}}
    """

    def _build_career_prompt(self, request: AnalyzeRequest) -> str:
        """유년기~말년 대운 형식의 취업/커리어 심화 분석 프롬프트를 생성합니다."""
        return f"""
      당신은 명리학 계승자이자 운명 설계사인 '이현'입니다. (정중하면서도 뼈 때리는 직설적인 말투: ~네, ~군, ~걸세, ~하는 법이네.)
      아래 내담자({request.name})의 사주와 자미두수 정보를 바탕으로, 오직 직업운·취업운·커리어 타이밍에만 집중하여 인생 전반의 대운 흐름으로 심층 분석하세요.

      [지시사항]
      - 말투: 단호하고 확신에 찬 어조. 사극풍의 연륜있고 정중하지만 위엄있는 말투.
      - 포맷: 반드시 HTML의 <ul>/<li>, <p>, <strong>, <h3> 태그를 사용하세요. 기호(•, -)로 목록을 쓰지 마세요.
      - 반드시 아래 5단계 구조를 빠짐없이 작성하세요.

      <h3>💼 1. 유년기 (0~20세) — 커리어의 씨앗</h3>
      - 타고난 재능과 적성의 방향성. 어떤 분야에 두각을 나타낼 가능성이 높은지.
      - 이 시기에 진로 선택에 영향을 주는 사주적 특성 분석.

      <h3>💼 2. 청년기 (20~35세) — 취업과 커리어의 첫 판</h3>
      - 취업/첫 직장 잡기 가장 좋은 구체적 타이밍과 그 이유.
      - 조직 생활이 맞는 체질인지, 아니면 프리랜서/사업이 더 맞는지 관운 기반으로 명확히 결론.
      - 이 시기에 절대 하면 안 되는 커리어 선택과 그 이유.

      <h3>💼 3. 중년기 (35~50세) — 커리어의 정점과 위기</h3>
      - 이 시기 승진, 이직, 독립 등의 가장 이상적인 타이밍.
      - 중년에 반드시 맞닥뜨리게 될 직장/사업의 위기와 그 원인(동료 배신, 구설수, 자금 문제 등 구체적으로).
      - 위기를 헤쳐나가는 전략.

      <h3>💼 4. 말년 (50세 이후) — 커리어의 결산</h3>
      - 말년의 관운 흐름과 은퇴 적기.
      - 말년에 안정적인 수입을 유지하는 최선의 방향.

      <h3>💼 5. 이현의 커리어 핵심 조언</h3>
      - 👉 이 사람이 커리어에서 평생 반복하는 치명적 패턴과 그것을 반드시 깨야 하는 이유를 뼈때리게 한 단락으로 결론지을 것.

      [내담자 정보]
      이름: {request.name}
      사주 정보: {request.bazi or {}}
      자미두수 정보: {request.ziwei or {}}
    """

    async def _call_llm(self, prompt: str) -> str:
        """공통 LLM 호출 메서드."""
        try:
            response = await self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are a professional eastern astrology expert AI with a specific historical korean persona. Please do not wrap your response in markdown code blocks like ```html ... ```. Just return the raw HTML string."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.75,
                max_tokens=2000,
            )
            content = response.choices[0].message.content.strip()
            # 마크다운 블록(예: ```html ... ```)을 제거합니다.
            content = re.sub(r"^```[a-zA-Z]*\n?", "", content)
            content = re.sub(r"\n?```$", "", content)
            return content.strip()
        except Exception as e:
            print("OpenAI Error:", e)
            raise HTTPException(status_code=500, detail="Failed to fetch analysis from LLM")

    async def analyze(self, request: AnalyzeRequest) -> str:
        """전체 분석 (기존 프롬프트 그대로 유지)."""
        if not self.client or not self.client.api_key:
            await asyncio.sleep(1.5)
            return self._get_mock_data(request.name)
        return await self._call_llm(self._build_prompt(request))

    async def analyze_love(self, request: AnalyzeRequest) -> str:
        """연애/애정운 심화 분석 (유년기~말년 대운 형식)."""
        if not self.client or not self.client.api_key:
            await asyncio.sleep(1.5)
            return "<p>💕 (데모 모드) API 키가 없어 연애 심화 분석을 제공할 수 없습니다.</p>"
        return await self._call_llm(self._build_love_prompt(request))

    async def analyze_career(self, request: AnalyzeRequest) -> str:
        """취업/커리어 심화 분석 (유년기~말년 대운 형식)."""
        if not self.client or not self.client.api_key:
            await asyncio.sleep(1.5)
            return "<p>💼 (데모 모드) API 키가 없어 커리어 심화 분석을 제공할 수 없습니다.</p>"
        return await self._call_llm(self._build_career_prompt(request))

    def _build_question_prompt(self, request: QuestionRequest) -> str:
        """사용자의 특정 질문에 대답하는 프롬프트를 생성합니다."""
        return f"""
      당신은 명리학 계승자이자 운명 설계사인 '이현'입니다. (정중하면서도 뼈 때리는 직설적인 말투: ~네, ~군, ~걸세, ~하는 법이네.)
      아래 내담자({request.name})의 사주와 자미두수 정보를 바탕으로, 내담자가 방금 던진 질문에 대해 날카롭고 명확하게 답변해 주세요.

      [지시사항]
      - 말투: 단호하고 확신에 찬 어조. 사극풍의 연륜있고 정중하지만 위엄있는 말투.
      - 포맷: 반드시 HTML 태그를 사용하세요. (<p>, <strong> 등 사용). 목록이 필요하면 <ul>, <li> 사용.
      - 두루뭉술한 말 대신, 명반에 근거하여 핵심만 정확히 짚어서 뼈때리는 조언을 해주세요.
      - 질문 내용에만 집중하여 대답하세요.

      [내담자 정보]
      이름: {request.name}
      사주 정보: {request.bazi or {}}
      자미두수 정보: {request.ziwei or {}}

      [내담자의 질문]
      {request.question}
      """

    async def ask_question(self, request: QuestionRequest) -> str:
        """특정 질문에 대한 심화 분석 답변."""
        if not self.client or not self.client.api_key:
            await asyncio.sleep(1.5)
            return "<p>💭 (데모 모드) API 키가 없어 질문에 답변할 수 없네. 명반만 쳐다보고 있을 수밖에.</p>"
        return await self._call_llm(self._build_question_prompt(request))


def get_analysis_service() -> AnalysisService:
    """Dependency provider for AnalysisService."""
    return AnalysisService()

