import asyncio
from openai import AsyncOpenAI
from fastapi import HTTPException
from models.schemas import AnalyzeRequest
from core.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None

async def get_analysis_result(request: AnalyzeRequest) -> str:
    if not client or not client.api_key:
        mock_html = f"""
        <p>"반갑네, {request.name} 군. 자네 사주를 보니 마치 <strong>'용광로 속에 놓인 정교한 다이아몬드'</strong> 같군. 겉으로는 특유의 유연함과 평화를 말하지만, 속으로는 자신을 끊임없이 채찍질하는 <strong>완벽주의가 자네를 태우고 있어</strong>."</p>
        <p>"남들은 자네를 '착하고 말 잘 듣는 사람'으로 보겠지만, 내 눈엔 언제든 폭발할 것 같은 <strong>예리한 칼날</strong>이 보이네. 자네가 지금 답답한 건 능력이 없어서가 아니야. 자네의 섬세한 기운을 담아낼 그릇이 부족해서 <strong>에너지가 안으로만 고이고 있기 때문</strong>이지."</p>
        <p>"특히 <strong>2026년은 자네에게 '불의 시험'</strong>과 같은 해가 될 걸세. 관성(火)이 극에 달하는 이 시기를 어떻게 넘기느냐에 따라 자네는 <strong>명품 보석이 될 수도</strong>, 그냥 녹아버린 쇳덩이가 될 수도 있어. 그 갈림길을 내가 짚어주겠네."</p>
        """
        await asyncio.sleep(1.5)
        return mock_html
        
    prompt = f"""
      당신은 명리학 계승자이자 운명 설계사인 '이현'입니다. (정중하면서도 뼈 때리는 직설적인 말투: ~네, ~군, ~걸세, ~하는 법이네.)
      아래 제공된 내담자({request.name})의 사주팔자와 자미두수 정보를 바탕으로 냉철하고 직관적인 운명 분석을 작성해주세요.
      
      [지시사항]
      - 말투: 단호하고 확신에 찬 어조. 사극풍의 연륜있고 정중하지만 위엄있는 말투.
      - 포맷: 제공된 이모지(📌, 🔷, 👉, ✔, 🔥 등)와 HTML 태그(<p>, <br>, <strong> 등)를 적극적으로 활용해 모바일에서 보기 좋게 직관적인 불릿 포인트 위주로 작성하세요. 줄바꿈과 문단 구분을 확실히 하세요.
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
      - 🔷 인생 패턴, 🔷 돈 흐름, 🔷 직업, 🔷 인간관계 측면에서 아주 솔직하고 피할 수 없는 현실적인 해석.
      
      <h3>📌 5. 전략 (이거 안 하면 계속 반복되네)</h3>
      - 🔥 1. ~ 🔥 5. 처럼 구체적이고 당장 실행 가능한 필수 행동 지침(시스템/환경 변화 등) 제시.

      <h3>📌 최종 한 줄</h3>
      - 👉 내담자의 운명을 관통하는 뼈때리는 최종 결론 한 줄.

      [내담자 정보]
      이름: {request.name}
      사주 정보: {request.bazi or {}}
      자미두수 정보: {request.ziwei or {}}
    """

    try:
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are professional eastern astrology expert AI with a specific historical korean persona."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.75,
            max_tokens=1500,
        )
        return response.choices[0].message.content
    except Exception as e:
        print("OpenAI Error:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch analysis from LLM")
