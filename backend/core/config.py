import os
from dotenv import load_dotenv

# Try to load .env.local from the Next.js root
env_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env.local')
if os.path.exists(env_path):
    load_dotenv(env_path)
else:
    load_dotenv()

class Settings:
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

settings = Settings()
