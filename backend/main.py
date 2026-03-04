from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
from datetime import datetime

# Import configuration and database
from config import settings
from database import supabase_client

# Initialize FastAPI app
app = FastAPI(
    title="Aneeq Hussain Portfolio API",
    description="Backend API for portfolio website",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Models =====

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str

# ===== Routes =====

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "Portfolio API is running",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "connected" if supabase_client else "disconnected"
    }

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact_form(form_data: ContactForm):
    """
    Submit contact form
    Stores submission in Supabase database
    """
    try:
        # Prepare data for database
        submission_data = {
            "name": form_data.name,
            "email": form_data.email,
            "subject": form_data.subject,
            "message": form_data.message,
            "created_at": datetime.utcnow().isoformat(),
            "status": "new"
        }
        
        # Insert into Supabase
        if supabase_client:
            result = supabase_client.table("contact_submissions").insert(submission_data).execute()
            
            if not result.data:
                raise HTTPException(status_code=500, detail="Failed to save submission")
        
        return ContactResponse(
            success=True,
            message="Thank you! Your message has been received."
        )
        
    except Exception as e:
        print(f"Error submitting contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to submit form. Please try again later."
        )

@app.get("/api/projects")
async def get_projects():
    """
    Get all projects
    Can be used to fetch projects from database instead of JSON file
    """
    try:
        if supabase_client:
            result = supabase_client.table("projects").select("*").order("display_order").execute()
            return {"projects": result.data}
        else:
            return {"projects": []}
    except Exception as e:
        print(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

# ===== Error Handlers =====

@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {
        "success": False,
        "message": "Endpoint not found"
    }

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return {
        "success": False,
        "message": "Internal server error"
    }

# For Vercel serverless deployment
handler = app
