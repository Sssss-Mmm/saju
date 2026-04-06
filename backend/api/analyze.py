from fastapi import APIRouter
from models.schemas import AnalyzeRequest, AnalyzeResponse
from services.analyze_service import get_analysis_result

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_saju(request: AnalyzeRequest):
    content = await get_analysis_result(request)
    return AnalyzeResponse(content=content)
