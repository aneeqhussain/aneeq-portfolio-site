from supabase import create_client, Client
from config import settings
from typing import Optional

# Initialize Supabase client
supabase_client: Optional[Client] = None

try:
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        supabase_client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )
        print("[OK] Supabase client initialized successfully")
    else:
        print("[WARNING] Supabase credentials not found. Database features will be disabled.")
except Exception as e:
    print(f"[ERROR] Error initializing Supabase client: {str(e)}")
    supabase_client = None

def get_supabase() -> Optional[Client]:
    """Get Supabase client instance"""
    return supabase_client
