from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    query: str
    conversation_history: Optional[List[dict]] = None

class SelectedTextRequest(BaseModel):
    query: str
    selected_text: str
    conversation_history: Optional[List[dict]] = None

class ChatResponse(BaseModel):
    response: str