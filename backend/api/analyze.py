from fastapi import APIRouter, Depends
from models.schemas import AnalyzeRequest, AnalyzeResponse, QuestionRequest, SoloEscapeResponse
from services.analyze_service import AnalysisService, get_analysis_service

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_saju(
    request: AnalyzeRequest, 
    service: AnalysisService = Depends(get_analysis_service)
):
    content = await service.analyze(request)
    return AnalyzeResponse(content=content)

@router.post("/analyze/love", response_model=AnalyzeResponse)
async def analyze_love(
    request: AnalyzeRequest,
    service: AnalysisService = Depends(get_analysis_service)
):
    """연애/애정운 심화 분석 (유년기~말년 대운 형식)"""
    content = await service.analyze_love(request)
    return AnalyzeResponse(content=content)

@router.post("/analyze/career", response_model=AnalyzeResponse)
async def analyze_career(
    request: AnalyzeRequest,
    service: AnalysisService = Depends(get_analysis_service)
):
    """취업/커리어 심화 분석 (유년기~말년 대운 형식)"""
    content = await service.analyze_career(request)
    return AnalyzeResponse(content=content)

@router.post("/analyze/question", response_model=AnalyzeResponse)
async def analyze_question(
    request: QuestionRequest,
    service: AnalysisService = Depends(get_analysis_service)
):
    """사용자의 개별 질문에 대한 심층 답변"""
    content = await service.ask_question(request)
    return AnalyzeResponse(content=content)

@router.post("/analyze/solo", response_model=SoloEscapeResponse)
async def analyze_solo_escape(
    request: AnalyzeRequest,
    service: AnalysisService = Depends(get_analysis_service)
):
    """솔로 탈출 & 운명 예측: 만남 시기/장소, 상대방 묘사, 실전 대사, 이미지 생성"""
    return await service.analyze_solo_escape(request)
