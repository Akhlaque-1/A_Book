from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from services.local_rag_service import LocalRAGService
from models.chat_models import ChatRequest, ChatResponse, SelectedTextRequest

router = APIRouter()

# Initialize the local RAG service
rag_service = LocalRAGService()

class HealthCheck(BaseModel):
    status: str = "OK"

@router.get("/health", response_model=HealthCheck)
async def health_check():
    return HealthCheck(status="OK")

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response = await rag_service.process_query(
            query=request.query,
            conversation_history=request.conversation_history,
            use_selected_text=False
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat-selected-text", response_model=ChatResponse)
async def chat_selected_text_endpoint(request: SelectedTextRequest):
    try:
        response = await rag_service.process_query(
            query=request.query,
            selected_text=request.selected_text,
            conversation_history=request.conversation_history,
            use_selected_text=True
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))