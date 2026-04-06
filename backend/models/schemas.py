from pydantic import BaseModel
from typing import Optional, Any, Dict

class AnalyzeRequest(BaseModel):
    name: Optional[str] = "이승민"
    bazi: Optional[Dict[str, Any]] = None
    ziwei: Optional[Dict[str, Any]] = None

class AnalyzeResponse(BaseModel):
    content: str
