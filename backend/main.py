from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import analyze

app = FastAPI(title="Saju Analysis API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect Routers
app.include_router(analyze.router, prefix="/api", tags=["Analysis"])
