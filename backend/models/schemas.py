from pydantic import BaseModel
from typing import Optional, Any, Dict

class AnalyzeRequest(BaseModel):
    name: Optional[str] = "이승민"
    bazi: Optional[Dict[str, Any]] = None
    ziwei: Optional[Dict[str, Any]] = None

class AnalyzeResponse(BaseModel):
    content: str

class QuestionRequest(AnalyzeRequest):
    question: str

class SoloMeeting(BaseModel):
    timing: str
    place: str
    situation: str
    probability: str

class SoloPerson(BaseModel):
    gender: str
    age_range: str
    appearance: str
    personality: str
    occupation: str
    image_prompt: str

class SoloScript(BaseModel):
    opening_line: str
    follow_up: str
    backup_line: str

class SoloEscapeResponse(BaseModel):
    meeting: SoloMeeting
    person: SoloPerson
    script: SoloScript
    motivation: str
    image_url: Optional[str] = None
