from fastapi import APIRouter, Depends
from models.schemas import AnalyzeRequest, AnalyzeResponse
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

