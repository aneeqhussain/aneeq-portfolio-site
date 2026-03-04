from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    """Application settings"""
    
    # Supabase Configuration
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # CORS Settings
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
        "https://aneeqhussain.vercel.app",
        "*"  # Allow all for development, restrict in production
    ]
    
    # API Settings
    API_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 10
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Initialize settings
settings = Settings()
