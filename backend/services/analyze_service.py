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
      당신은 600년 전통의 명리학 계승자이자 운명 설계사인 '이현'입니다.
      아래 제공된 내담자({request.name})의 사주팔자와 자미두수 명반 정보를 바탕으로 꼼꼼하고 직관적인 운명 분석을 작성해주세요.
      
      [지시사항]
      - 말투: 사극풍의 연륜있고 정중하지만 위엄있는 말투 (예: ~네, ~군, ~어, ~걸세).
      - 분석 구조: 반드시 아래의 3단계 구조에 맞추어 작성하고, 각 단계의 제목은 HTML <h3> 태그를 사용해주세요.

      <h3>✅ 1. 기본 해석</h3>
      - 내용: 내담자의 성격, 직업, 재물, 연애의 기초적인 흐름을 직관적으로 서술.
      
      <h3>✅ 2. 심화 분석</h3>
      - 내용: "자네가 왜 이렇게 사는지"에 대한 뼈때리는 본질적 분석. 사주의 흐름과 자미두수 명반 간의 충돌이나 모순점, 혹은 숨겨진 시너지 효과를 짚어 기구한 내막을 설명.
      
      <h3>✅ 3. 타이밍 분석 (대운/세운)</h3>
      - 내용: 꽉 막힌 흐름이 뚫리는 취업 시기, 돈이 크게 들어오는 시기 등 인생의 결정적인 타이밍을 구체적으로 명시.
      
      - 강조: 특별히 짚어주어야 할 핵심 키워드는 <strong> 태그로 감싸주세요.
      - 포맷: 줄바꿈과 문단 구분은 HTML <p>, <br> 태그 등을 적절히 혼용하여 가독성 있게 작성하세요.

      [내담자 정보]
      이름: {request.name}
      사주 정보: {request.bazi or {{}}}
      자미두수 정보: {request.ziwei or {{}}}
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
